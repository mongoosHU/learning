import React from 'react';

const Profile = () => {
  // Például az autentikációból származó felhasználói adatokat jelenítheted meg
  const user = { name: 'John Doe', email: 'john.doe@example.com', completedCourses: ['React', 'JavaScript'] };

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Completed Courses:</h2>
      <ul>
        {user.completedCourses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
