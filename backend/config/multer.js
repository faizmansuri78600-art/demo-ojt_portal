const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================================
// RESUME UPLOAD
// ======================================================

const uploadPath = path.join(__dirname, "..", "uploads", "resumes");

// Create resume folder automatically
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ======================================================
// DOCUMENT UPLOAD
// ======================================================

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const documentPath = path.join(
      __dirname,
      "..",
      "uploads",
      "documents"
    );

    // Create document folder automatically
    if (!fs.existsSync(documentPath)) {
      fs.mkdirSync(documentPath, { recursive: true });
    }

    cb(null, documentPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const documentUpload = multer({
  storage: documentStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ======================================================
// COMPANY LOGO UPLOAD
// ======================================================

const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const logoPath = path.join(
      __dirname,
      "..",
      "uploads",
      "company-logos"
    );

    // Create company logo folder automatically
    if (!fs.existsSync(logoPath)) {
      fs.mkdirSync(logoPath, { recursive: true });
    }

    cb(null, logoPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Allow only image files for company logo
const logoFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG and WEBP images are allowed."),
      false
    );
  }
};

const logoUpload = multer({
  storage: logoStorage,
  fileFilter: logoFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  upload,
  documentUpload,
  logoUpload,
};