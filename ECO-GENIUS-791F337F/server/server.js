import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());

// Upload endpoint
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});