const PaymentService = require('../services/payment-service');

const paymentService = new PaymentService();

async function createOrder(req, res) {
  try {
    const { title, courseprice } = req.body; // ver nombre del campo coincida con frontend

    // utilizo el valor de coursePrice en la creación de la orden
    const order = await paymentService.createOrder(title, courseprice);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
}

module.exports = {
  createOrder,
};
