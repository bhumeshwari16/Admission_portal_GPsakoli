// backend/routes/newAdmissionRoutes.js
const express = require('express');
const router = express.Router();
const newAdmissionController = require('../controllers/newAdmissionController');

router.post(
  '/new-admission-submit',
  newAdmissionController.upload.fields([
    { name: 'leavingCertificate', maxCount: 1 },
    { name: 'scMarksheet', maxCount: 1 },
    { name: 'hsscMarksheet', maxCount: 1 },
    { name: 'diplomaMarksheet', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'domicileCertificate', maxCount: 1 },
    { name: 'nonCreamyLayer', maxCount: 1 },
    { name: 'gapCertificate', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'amount', maxCount: 1 }, // Ensure amount is handled here if sent as file
    { name: 'ddNumber', maxCount: 1 }, // Ensure ddNumber is handled here if sent as file
    { name: 'paymentDate', maxCount: 1 }, // Ensure paymentDate is handled here if sent as file
    { name: 'receiptNumber', maxCount: 1 }, // Ensure receiptNumber is handled here if sent as file
    { name: 'utrNumber', maxCount: 1 }, // Ensure utrNumber is handled here if sent as file
    { name: 'senderUpild', maxCount: 1 }, // Ensure senderUpild is handled here if sent as file
    { name: 'receiverUpild', maxCount: 1 }, // Ensure receiverUpild is handled here if sent as file
    { name: 'utrPaymentSlip', maxCount: 1 },
  ]),
  newAdmissionController.submitNewAdmission
);

module.exports = router;