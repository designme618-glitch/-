
/**
 * DYNAMIC NOVEL PUBLISHING PLATFORM - BACKEND BOILERPLATE
 * This code is provided as a complete reference for your production Node.js environment.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// --- CONFIGURATION ---
const JWT_SECRET = process.env.JWT_SECRET || 'abdullah_secret_key_123';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/novel_platform';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// --- SCHEMAS / MODELS ---
const NovelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'عبدالله عقدين' },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChapterSchema = new mongoose.Schema({
  novelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // Rich text HTML stored as string
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Novel = mongoose.model('Novel', NovelSchema);
const Chapter = mongoose.model('Chapter', ChapterSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// --- AUTH MIDDLEWARE ---
const authenticateAdmin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// --- ROUTES ---

// 1. PUBLIC ROUTES (For Readers)
app.get('/api/novels', async (req, res) => {
  try {
    const novels = await Novel.find().sort({ createdAt: -1 });
    res.json(novels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/novels/:id', async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id);
    const chapters = await Chapter.find({ novelId: req.params.id }).sort({ order: 1 });
    res.json({ novel, chapters });
  } catch (err) {
    res.status(404).json({ message: 'Novel not found' });
  }
});

// 2. ADMIN ROUTES (Protected)

// Login
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Novel
app.post('/api/novels', authenticateAdmin, async (req, res) => {
  try {
    const newNovel = new Novel(req.body);
    const saved = await newNovel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Chapter
app.post('/api/chapters', authenticateAdmin, async (req, res) => {
  try {
    const newChapter = new Chapter(req.body);
    const saved = await newChapter.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Novel
app.delete('/api/novels/:id', authenticateAdmin, async (req, res) => {
  try {
    await Novel.findByIdAndDelete(req.params.id);
    await Chapter.deleteMany({ novelId: req.params.id });
    res.json({ message: 'Novel and its chapters deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
