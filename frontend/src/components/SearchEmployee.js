import React, { useState } from 'react';
import axios from 'axios';

const SearchEmployee = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('department'); // Default search field
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/employees/search`, {
                params: { 
                    [searchField]: searchQuery 
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setEmployees(response.data);
            setError('');
        } catch (err) {
            setError('No employees found matching the criteria.');
            setEmployees([]);
        }
    };

    return (
        <div>
            <h2>Search Employees</h2>
            <form onSubmit={handleSearch}>
                <label htmlFor="searchField">Search By:</label>
                <select
                    id="searchField"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                >
                    <option value="department">Department</option>
                    <option value="position">Position</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchField}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>
                                <button onClick={() => (window.location.href = `/employees/${employee.id}`)}>
                                    Details
                                </button>
                                <button onClick={() => (window.location.href = `/employees/update/${employee.id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchEmployee;
