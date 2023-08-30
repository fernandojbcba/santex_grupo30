const Express = require('express');
// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

// importo rutas
const loginRoute = require('./login-route');
const courseRoute = require('./course-route');
const userRoute = require('./user-route');
const teacherRoute = require('./teacher-route');

const router = Express();

// Rutas
router.use('/login', loginRoute);
router.use('/courses', courseRoute);
router.use('/user', userRoute);
router.use('/teacher', teacherRoute);
// use=
router.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
router.use('/', rootPath.handler);
router.use(rootPath.setHeaders);
router.use(errors.handler);

module.exports = router;
