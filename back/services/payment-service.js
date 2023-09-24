const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN, // Reemplazar por access token real
});
class PaymentService {
  async createOrder() {
    // Creo un objeto de preferencia de MercadoPago
    const preference = {
      items: [
        {
          title: 'Producto de ejemplo',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 5000,
        },
      ],
      external_reference: 'TU_REFERENCIA', // Puedes usar una referencia única para identificar la orden
    };

    const response = await mercadopago.preferences.create(preference);
    return response.body.init_point;
  }
}

module.exports = PaymentService;
