import React, { useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";
import RowDetails from "../../components/RowDetails";
import axios from "axios";
import Alert from "../../components/Alert";


function ViewAssociates() {

window.open("http://localhost:3001")

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post('/api/users', form)
    .then(res=>{
      setMessage(res.data.message)
      /* hide form after save */
      setForm({})
      /* hide errors after save */
      setErrors({})
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  /* delete */
  const OnDelete = (id__)=>{
    if(window.confirm("are you sure to delete this user")){
 
     axios.delete(`/api/users/${id__}`)
     .then(res=>{
      setMessage(res.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
     })
    }
   }
  /* find all users */
  useEffect(async () => {
    await axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  });
  return (
    <div className="row p-4">
      <Alert message={message} show={show}/>
      <div className="mt-4">
        <h2> Add Associates</h2>
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
          />
          <InputGroup
            label="Name"
            type="text"
            name="Fullname"
            onChangeHandler={onChangeHandler}
            errors={errors.Fullname}
          />
          <InputGroup
            label="ICTAK_ID"
            type="text"
            name="Ictakid"
            onChangeHandler={onChangeHandler}
            errors={errors.Ictakid}
          />
          
          <InputGroup
            label="Mobile"
            type="number"
            name="Number"
            onChangeHandler={onChangeHandler}
            errors={errors.Number}
          />
           <InputGroup
            label="Password"
            type="text"
            name="Password"  
            onChangeHandler={onChangeHandler}
            errors={errors.Password}
          />
          <button className="btn btn-primary" type="submit">Add Associate</button>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">ICTAK_ID</th>
              <th scope="col">Mobile</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ Email,Fullname, Ictakid, Number,Password, _id }) => (
              <RowDetails
                Email={Email}
                Fullname={Fullname}
                Ictakid={Ictakid}
                Number={Number}
                Password={Password}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAssociates;
