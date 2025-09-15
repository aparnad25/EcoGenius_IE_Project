import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ========= Multer for form-data upload =========
const upload = multer({ dest: 'uploads/' });   // Temporary storage for uploaded files

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ========= Middleware =========
app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '10mb' })); // allow big file base64

// ========= Routes =========

// 1. Form-data upload, this is only for local testing
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'ecogenius',
    });
    
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// 2. Base64 upload (for debugging), this is for AWS Lambda
app.post('/api/upload', async (req, res) => {
  try {
    const { file } = req.body; // front end passing base64
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'ecogenius',
    });

    res.json({ secure_url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});


// ========= Start server =========
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});