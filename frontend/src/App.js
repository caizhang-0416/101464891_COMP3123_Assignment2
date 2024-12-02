import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Navbar from './components/Navbar';
import ViewEmployee from './components/ViewEmployee';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
