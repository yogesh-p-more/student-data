import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CreateStudent = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setphone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, phone, place };
    console.log(studentData);

    fetch("http://localhost:8000/students", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
      .then((res) => {
        alert("Student added");
        navigate("/");
      })
      .catch((err) => (console.log(err))
      )

  }
  return (
    <>
      <div className='container'>
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='id'>ID:</label>
          <input type='text' id='id' name='id' value={id} onChange={e => setId(e.target.value)} onMouseDown={()=>setValidation(true)} required />
          {id.length === 0 && validation && <span className='errormsg'>Please enter your id</span>}

          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' onChange={e => setName(e.target.value)} onMouseDown={()=>setValidation(true)} required />
          {name.length === 0 && validation && <span className='errormsg'>Please enter yor name</span>}

          <label htmlFor='place'>Place:</label>
          <input type='text' id='place' name='place' onChange={e => setPlace(e.target.value)} onMouseDown={()=>setValidation(true)} required />
          {place.length === 0 && validation && <span className='errormsg'>Please enter yor place</span>}

          <label htmlFor='phone'>Phone:</label>
          <input type='text' id='phone' name='phone' onChange={e => setphone(e.target.value)} onMouseDown={()=>setValidation(true)} required />
          {phone.length === 0 && validation && <span className='errormsg'>Please enter yor phone</span>}

          <div>
            <button className='btn btn-save'>Save</button>
            <Link to="/" className='btn btn-back'>Back</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateStudent