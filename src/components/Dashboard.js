import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Felhasználói adatok lekérése
        const userResponse = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        // Kurzusok lekérése
        const coursesResponse = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
      {user && (
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
      )}
      <Typography variant="h5" gutterBottom>
        Your Courses:
      </Typography>
      <List>
        {courses.length > 0 ? (
          courses.map((course) => (
            <ListItem key={course._id}>
              <ListItemText primary={course.title} secondary={course.description} />
            </ListItem>
          ))
        ) : (
          <Typography>No courses found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default Dashboard;
