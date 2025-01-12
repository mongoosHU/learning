import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {courses.map(course => (
        <Card key={course._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{course.title}</Typography>
            <Typography>{course.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseList;
