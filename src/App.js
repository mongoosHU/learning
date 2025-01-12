import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/addcourse" element={<AddCourse />} />
       
      </Routes>
    </Router>
  );
}

export default App;
