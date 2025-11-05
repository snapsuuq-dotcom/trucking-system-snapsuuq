const express = require('express');
const router = express.Router();
const Cargo = require('../models/Cargo');
const authMiddleware = require('../middleware/auth');

// Public: Search cargo (no authentication required)
// Users can only search by first 4 digits of phone numbers
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    // For users: Only search by first 4 digits of phone numbers
    // Extract first 4 digits from query
    const firstFourDigits = query.trim().substring(0, 4);
    
    // Build search query - only search phone numbers by first 4 digits
    const searchQuery = {
      phoneNumber: { $regex: `^${firstFourDigits}`, $options: 'i' }
    };

    const cargos = await Cargo.find(searchQuery).sort({ date: -1 });

    res.json({
      success: true,
      count: cargos.length,
      data: cargos
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error searching cargo' 
    });
  }
});

// Admin: Get all cargos with optional filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, search, sortBy = 'date', order = 'desc' } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Search filter (admin can search by all fields)
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { truckNumber: { $regex: search, $options: 'i' } },
        { 'truckNumbers.name': { $regex: search, $options: 'i' } },
        { 'truckNumbers.number': { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const cargos = await Cargo.find(query).sort({ [sortBy]: sortOrder });

    res.json({
      success: true,
      count: cargos.length,
      data: cargos
    });
  } catch (error) {
    console.error('Get cargos error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching cargos' 
    });
  }
});

// Admin: Get single cargo by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    
    if (!cargo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cargo not found' 
      });
    }

    res.json({
      success: true,
      data: cargo
    });
  } catch (error) {
    console.error('Get cargo error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching cargo' 
    });
  }
});

// Admin: Create new cargo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { customerName, phoneNumber, productName, category, truckNumber, truckNumbers, date, estimatedDate, status } = req.body;

    // Validate required fields
    if (!customerName || !phoneNumber || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields (customerName, phoneNumber, category)' 
      });
    }

    // Validate truck numbers (either old format or new array format)
    if (!truckNumbers || !Array.isArray(truckNumbers) || truckNumbers.length === 0) {
      if (!truckNumber) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide at least one truck number' 
        });
      }
    }

    const cargo = new Cargo({
      customerName,
      phoneNumber,
      productName: productName || '', // Keep for backward compatibility
      category,
      truckNumber: truckNumber || (truckNumbers && truckNumbers.length > 0 ? truckNumbers[0].number : ''),
      truckNumbers: truckNumbers || [],
      date: date || new Date(),
      estimatedDate: estimatedDate || null,
      status: status || 'China'
    });

    await cargo.save();

    res.status(201).json({
      success: true,
      message: 'Cargo created successfully',
      data: cargo
    });
  } catch (error) {
    console.error('Create cargo error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating cargo: ' + error.message
    });
  }
});

// Admin: Update cargo
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { customerName, phoneNumber, productName, category, truckNumber, truckNumbers, date, estimatedDate, status } = req.body;

    const cargo = await Cargo.findById(req.params.id);
    
    if (!cargo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cargo not found' 
      });
    }

    // Update fields
    if (customerName) cargo.customerName = customerName;
    if (phoneNumber) cargo.phoneNumber = phoneNumber;
    if (productName !== undefined) cargo.productName = productName;
    if (category) cargo.category = category;
    if (truckNumber) cargo.truckNumber = truckNumber;
    if (truckNumbers) {
      cargo.truckNumbers = truckNumbers;
      // Update old truckNumber field for backward compatibility
      if (truckNumbers.length > 0) {
        cargo.truckNumber = truckNumbers[0].number;
      }
    }
    if (date) cargo.date = date;
    if (estimatedDate !== undefined) cargo.estimatedDate = estimatedDate || null;
    if (status) cargo.status = status;

    await cargo.save();

    res.json({
      success: true,
      message: 'Cargo updated successfully',
      data: cargo
    });
  } catch (error) {
    console.error('Update cargo error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating cargo: ' + error.message
    });
  }
});

// Admin: Delete cargo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    
    if (!cargo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cargo not found' 
      });
    }

    await cargo.deleteOne();

    res.json({
      success: true,
      message: 'Cargo deleted successfully'
    });
  } catch (error) {
    console.error('Delete cargo error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting cargo' 
    });
  }
});

// Admin: Get dashboard statistics
router.get('/stats/dashboard', authMiddleware, async (req, res) => {
  try {
    const total = await Cargo.countDocuments();
    const china = await Cargo.countDocuments({ status: 'China' });
    const onAir = await Cargo.countDocuments({ status: 'On Air' });
    const onSea = await Cargo.countDocuments({ status: 'On Sea' });
    const arrived = await Cargo.countDocuments({ status: 'Arrived' });
    const delivered = await Cargo.countDocuments({ status: 'Delivered' });

    res.json({
      success: true,
      data: {
        total,
        china,
        onAir,
        onSea,
        arrived,
        delivered
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics' 
    });
  }
});

module.exports = router;

