const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN, // Reemplazar por access token real
});
class PaymentService {
  async createOrder(title, courseprice) {
    try {
      // coursePrice en la creación de la orden
      const preference = {
        items: [
          {
            title, // titulo del curso
            quantity: 1,
            currency_id: 'ARS',
            unit_price: courseprice, //  valor del curso
          },
        ],
        external_reference: 'TU_REFERENCIA',
      };
      const response = await mercadopago.preferences.create(preference);
      return response.body.init_point;
    } catch (error) {
      // Maneja los errores como lo hacías antes
      throw new Error('An error occurred while creating the order.');
    }
  }
}

module.exports = PaymentService;