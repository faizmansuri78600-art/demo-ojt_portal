const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "..", "uploads", "resumes");

// Create folder automatically if it doesn't exist
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

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const documentPath = path.join(__dirname, "..", "uploads", "documents");

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

module.exports = {
  upload,
  documentUpload,
};