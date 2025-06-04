import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData')) || {};
    setUserData(data);
  }, []);

  const dummyStats = {
    teamMembers: 5,
    activeProjects: 3,
    notifications: 2
  };

  const chartData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 5 },
    { name: 'Wed', tasks: 2 },
    { name: 'Thu', tasks: 6 },
    { name: 'Fri', tasks: 3 },
    { name: 'Sat', tasks: 1 },
    { name: 'Sun', tasks: 0 }
  ];

  return (
    <div className="dashboard">
      <h1>Welcome, {userData.name || 'User'} 👋</h1>
      <p>Email: {userData.email}</p>
      <p>Company: {userData.companyName}</p>
      <p>Theme: {userData.theme}</p>
      <p>Dashboard Layout: {userData.layout}</p>

      <div className="card-container">
        <div className="card">
          <h3>👥 Team Members</h3>
          <p>{dummyStats.teamMembers}</p>
        </div>
        <div className="card">
          <h3>📁 Active Projects</h3>
          <p>{dummyStats.activeProjects}</p>
        </div>
        <div className="card">
          <h3>🔔 Notifications</h3>
          <p>{dummyStats.notifications}</p>
        </div>
      </div>

      <h2>📊 Weekly Task Progress</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
