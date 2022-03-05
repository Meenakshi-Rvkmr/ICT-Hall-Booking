import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputGroup from '../../components/InputGroup'

function AddAssociate() {
 
  const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`/api/users/${id}`, form)
    .then(res=>{
      navigate('/')
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  useEffect(async () => {
    await axios.get(`/api/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
            value={form.Email}
          />
            <InputGroup
            label="Name"
            type="text"
            name="Fullname"
            onChangeHandler={onChangeHandler}
            errors={errors.Fullname}
            value={form.Fullname}
          />
          <InputGroup
            label="ICTAK_ID"
            type="text"
            name="Ictakid"
            onChangeHandler={onChangeHandler}
            errors={errors.Ictakid}
            value={form.Ictakid}
          />
      
          <InputGroup
            label="Mobile"
            type="number"
            name="Number"
            onChangeHandler={onChangeHandler}
            errors={errors.Number}
            value={form.Number}
          />
              <InputGroup
            label="Password"
            type="text"
            name="Password"
            onChangeHandler={onChangeHandler}
            errors={errors.Password}
            value={form.Password}
          />
          <button className="btn btn-primary" type="submit">Add Associate</button>
        </form>
      </div>
  )
}

export default AddAssociate