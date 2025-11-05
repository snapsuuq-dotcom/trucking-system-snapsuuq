const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: false,
    trim: true
  },
  // Support both old single truckNumber and new array format for backward compatibility
  truckNumber: {
    type: String,
    trim: true
  },
  truckNumbers: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    number: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }
  }],
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  estimatedDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: ['China', 'On Air', 'On Sea', 'Arrived', 'Delivered'],
    default: 'China'
  }
}, {
  timestamps: true
});

// Indexes for faster searching
cargoSchema.index({ customerName: 1 });
cargoSchema.index({ phoneNumber: 1 });
cargoSchema.index({ 'truckNumbers.number': 1 });

module.exports = mongoose.model('Cargo', cargoSchema);

