import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const StudentTable = () => {

    const [students, setStudents] = useState("");
    const navigate = useNavigate();
    const DisplayDetails = (id) => {
        navigate("/student/view/" + id);
    }
    const EditDetails = (id) => {
        navigate("/student/edit/" + id);
    }
    const removeDetails = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch("http://localhost:8000/students/" + id, {
                method: 'DELETE',
            })
                .then((res) => {
                    alert("Remove Student Data Successfully");
                   window.location.reload();
                })
                .catch((err) => (console.log(err))
                )
        }
    }
    useEffect(() => {
        fetch("http://localhost:8000/students")
            .then((res) => res.json())
            .then((data) =>
                setStudents(data)).catch((err) =>
                    console.log("error======>", err))
    }, []);
    return (
        <>
            <div className='container'>
                <h2>Student Records</h2>
                <div className='table-container'>
                    <Link to="/student/create" className='btn btn-add'>Add New Student</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>SR NO</th>
                                <th>Name</th>
                                <th>Place</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.map((item, index) => (
                                <tr key={item}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.place}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button onClick={() => DisplayDetails(item.id)} className='btn btn-info'>View</button>
                                        <button onClick={() => EditDetails(item.id)} className='btn btn-primary'>Edit</button>
                                        <button onClick={() => removeDetails(item.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StudentTable