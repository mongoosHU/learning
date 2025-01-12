// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB kapcsolat
mongoose.connect('mongodb://localhost:27017/e-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Modell példák
const User = mongoose.model('User', { name: String, email: String, password: String });
const Course = mongoose.model('Course', { title: String, description: String, lessons: Array });

// Egyszerű API végpontok
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/api/courses', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json(newCourse);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
