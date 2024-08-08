import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteEmployee = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                EmployeeService.deleteEmployee(id).then((res) => {
                    if (employees) {
                        setEmployees((prevElement) => {
                            return prevElement.filter((employee) => employee.id!== id);
                        })
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    }

    return (
        <div className="container mx-auto my-8">
            <div className="h-12">
                <button
                    onClick={() => navigate("/addEmployee")}
                    className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
                >
                    Add Employee
                </button>
            </div>
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider px-3 py-6">
                                First Name
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider px-3 py-6">
                                Last Name
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider px-3 py-6">
                                Email
                            </th>
                            <th className="text-right font-medium text-gray-500 uppercase tracking-wider px-3 py-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {!loading && employees && (
                        <tbody className="bg-white">
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{employee.firstName}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{employee.lastName}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{employee.emailId}</div>
                                    </td>
                                    <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                                        <a onClick={(e, id) => editEmployee(e, employee.id)} className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">Edit</a>
                                        <a onClick={(e, id) => deleteEmployee(e, employee.id)} className="text-red-600 hover:text-red-800 hover:cursor-pointer">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
