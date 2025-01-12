// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

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
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ellenőrizd, hogy létezik-e a felhasználó az adatbázisban
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Ellenőrizd a jelszót
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generálj egy token-t a felhasználó számára
    const token = jwt.sign(
      { id: user._id, email: user.email },
      'dc03f14be7603647b14279848eeb7d6405e5c4a04ac5e261a1efd7eb44face7fe8f2281ba6440d2edc972f49b508a49520190bd6b15420ad073e06387104835ae16cf337e2eed5d96bcc5e8cb9f483124d3a9cfefcd19dee353754e82c2eb2b3c95252ec84f80edfca23645ad2c4c620b477272eaa756643018ccd90404e7f4a', // A tokenhez tartozó titkos kulcs
      { expiresIn: '1h' } // Token érvényessége: 1 óra
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/api/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid token', error });
  }
});


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
