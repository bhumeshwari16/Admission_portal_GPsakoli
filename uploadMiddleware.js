const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: "leavingCertificate", maxCount: 1 },
    { name: "scMarksheet", maxCount: 1 },
    { name: "hsscMarksheet", maxCount: 1 },
    { name: "diplomaMarksheet", maxCount: 1 },
    { name: "casteCertificate", maxCount: 1 },
    { name: "domicileCertificate", maxCount: 1 },
    { name: "nonCreamyLayer", maxCount: 1 },
    { name: "gapCertificate", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "utrPaymentSlip", maxCount: 1 }
]);

module.exports = upload;
