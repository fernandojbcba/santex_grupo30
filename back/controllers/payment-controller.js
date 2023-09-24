const PaymentService = require('../services/payment-service');

const paymentService = new PaymentService();

async function createOrder(req, res) {
  try {
    const order = await paymentService.createOrder();
    res.status(201).json({ order });
  } catch (error) {
    // console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
}

module.exports = {
  createOrder,
};
