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


app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ellenőrizd, hogy az email már létezik-e
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Új felhasználó mentése
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
