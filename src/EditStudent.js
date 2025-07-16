import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { studentid } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setphone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/students/" + studentid)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id)
        setName(data.name)
        setPlace(data.place)
        setphone(data.phone)
      })
      .catch((err) => console.log(err.message));
  }, [studentid]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, place, phone };

    fetch("http://localhost:8000/students/" + studentid, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
      .then((res) => {
        alert("Student Data Updated Successfully");
        navigate("/");
      })
      .catch((err) => (console.log(err))
      )

  }
  return (
    <>
      <div className='container'>
        <h2>Edit Student Detail</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='id'>ID:</label>
          <input type='text' id='id' name='id' value={id} onChange={e => setId(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <span className='errormsg'>Please enter your id</span>}

          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' value={name} onChange={e => setName(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {name.length === 0 && validation && <span className='errormsg'>Please enter yor name</span>}

          <label htmlFor='place'>Place:</label>
          <input type='text' id='place' name='place' value={place} onChange={e => setPlace(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {place.length === 0 && validation && <span className='errormsg'>Please enter yor place</span>}

          <label htmlFor='phone'>Phone:</label>
          <input type='text' id='phone' name='phone' value={phone} onChange={e => setphone(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {phone.length === 0 && validation && <span className='errormsg'>Please enter yor phone</span>}

          <div>
            <button className='btn btn-save'>Update</button>
            <Link to="/" className='btn btn-back'>Back</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditStudent