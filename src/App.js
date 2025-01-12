import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './Hook/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
