const Express = require('express');
// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

// importo rutas
const loginRoute = require('./login-route');
const courseRoute = require('./course-route');
const userRoute = require('./user-route');
const teacherRoute = require('./teacher-route');
const attendanceRoute = require('./attendance-route');
const paymentRoute = require('./payment-route'); // Importa las rutas de payment

const router = Express();

// Rutas
router.use('/login', loginRoute);
router.use('/courses', courseRoute);
router.use('/user', userRoute);
router.use('/teacher', teacherRoute);
router.use('/attendance', attendanceRoute);
router.use('/payments', paymentRoute);
// use
router.use('/', rootPath.handler);
router.use(rootPath.setHeaders);
router.use(errors.handler);

module.exports = router;
