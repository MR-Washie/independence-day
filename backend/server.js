import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(morgan('dev'))

const ORIGIN = process.env.ORIGIN || '*'
app.use(cors({ origin: ORIGIN,
  credentials: true
 }))

// MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azaadi_mela'
mongoose.connect(MONGODB_URI).then(()=> console.log('MongoDB connected')).catch(err=> console.error(err))

// Mongoose Schemas
const ScoreSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  score: { type: Number, required: true }
}, { timestamps: true })

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true }
}, { timestamps: true })

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true }
}, { timestamps: true })

const Score = mongoose.model('Score', ScoreSchema)
const Message = mongoose.model('Message', MessageSchema)
const GalleryImage = mongoose.model('GalleryImage', ImageSchema)

// Static uploads
const uploadsDir = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsDir))

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9)
    const ext = path.extname(file.originalname || '')
    cb(null, unique + ext)
  }
})
const upload = multer({ storage })

// Routes
app.get('/', (req, res) => res.json({ ok: true, message: 'Azaadi Mela API' }))

// Quiz questions (simple demo)
const quiz = [
  {
    question: "Who is known as the Father of the Nation in India?",
    options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh", "Sardar Patel"],
    answer: "Mahatma Gandhi"
  },
  {
    question: "Which movement began in 1942 demanding an end to British rule?",
    options: ["Non-Cooperation", "Civil Disobedience", "Quit India", "Swadeshi"],
    answer: "Quit India"
  },
  {
    question: "When did India gain independence?",
    options: ["26 Jan 1950", "15 Aug 1947", "2 Oct 1947", "23 Mar 1931"],
    answer: "15 Aug 1947"
  },
  {
    question: "Who designed the Indian National Flag?",
    options: ["Bankim Chandra Chatterjee", "Pingali Venkayya", "Sarojini Naidu", "BR Ambedkar"],
    answer: "Pingali Venkayya"
  },
  {
    question: "What does the Ashoka Chakra have?",
    options: ["12 spokes", "24 spokes", "18 spokes", "32 spokes"],
    answer: "24 spokes"
  }
]

app.get('/api/quiz', (req, res) => res.json(quiz))

// Scores
app.get('/api/scores', async (req, res) => {
  const scores = await Score.find().sort({ score: -1, createdAt: 1 }).limit(50)
  res.json(scores)
})
app.post('/api/scores', async (req, res) => {
  const { name, score } = req.body
  if (!name || typeof score !== 'number') return res.status(400).json({ error: 'Invalid payload' })
  const item = await Score.create({ name, score })
  res.json(item)
})

// Messages
app.get('/api/messages', async (req, res) => {
  const items = await Message.find().sort({ createdAt: -1 }).limit(100)
  res.json(items)
})
app.post('/api/messages', async (req, res) => {
  const { name, text } = req.body
  if (!name || !text) return res.status(400).json({ error: 'Invalid payload' })
  const item = await Message.create({ name, text })
  res.json(item)
})

// Gallery
app.get('/api/gallery', async (req, res) => {
  const imgs = await GalleryImage.find().sort({ createdAt: -1 }).limit(60)
  res.json(imgs)
})
app.post('/api/gallery', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })
  const saved = await GalleryImage.create({ filename: req.file.filename })
  res.json(saved)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server running on port', PORT))
