const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const { protect, restrictTo } = require('../../middlewares/auth.middleware');

router.use(protect, restrictTo('admin'));

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/audit-logs', adminController.getAuditLogs);
router.get('/dashboard-stats', adminController.getDashboardStats);
router.post('/sync-usgs', adminController.syncUsgs);

// Earthquake Management for Admin
router.get('/earthquakes', (req, res) => res.redirect('/api/v1/earthquakes'));
router.options('/earthquakes', (req, res) => {
  res.header('Allow', 'GET, OPTIONS');
  res.status(200).send();
});
router.get('/analytics', (req, res) => res.redirect('/api/v1/analytics/earthquakes/highest-magnitude'));
router.get('/reports', (req, res) => res.status(200).json({ success: true, message: 'Admin Reports' }));
router.get('/dashboard', (req, res) => res.status(200).json({ success: true, message: 'Admin Dashboard Data' }));

module.exports = router;
