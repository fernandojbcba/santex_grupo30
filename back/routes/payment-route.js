const express = require('express');

const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const authenticateToken = require('../middleware/authenticate.token');

router.post('/create-order', authenticateToken, paymentController.createOrder);// se crea la orden
// router.post('/create-order', (req, res)=> res.send('orden creada'))//se crea la orden
router.get('/success', (req, res) => res.send('pagado'));// pagado pero no procesado
router.get('/webhook', (req, res) => res.send('pago exitoso'));// pago exitoso

module.exports = router;
