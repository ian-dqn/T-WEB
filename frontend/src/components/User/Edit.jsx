import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../templates/Header/Sidebar';
import { toast } from 'react-toastify';

const Edit = () => {

  const {id} = useParams() ;
  console.log(id)
  const dataString = localStorage.getItem('data');
  const data = JSON.parse(dataString);
  const token = data.token

  const [values , setValues] = useState({
    _id:id,
    email:'',
    password:''

  })
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/auth/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
          .then(res=>{
            setValues({...values,email:res.data.email,password:res.data.password})
          })
          .catch(err=>console.log(err))
  },[])

  const navigate = useNavigate()
  const handelSubmit = (e)=>{
    e.preventDefault();
    axios.put(`http://localhost:4000/api/auth/${id}`,{
      password:values.password
    },{ headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`} })
      .then(res=>{
        toast.success('Your Profil has been updated !', {
          position: toast.POSITION.TOP_RIGHT
  
        });
        navigate(`/edit/${id}`)
       }).catch(err=>console.log(err))     
  }
  return (
    <>
      <div className="container">
      <div className='aside-profile'>
      <Sidebar />

<form onSubmit={handelSubmit} className='aside-profile-form'>
    <label htmlFor="email">E-mail:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={values.email}
      readonly
      required
    />

    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      value={values.password}
      required
      onChange={e=>setValues({...values,password:e.target.value})}
    />

    <button type="submit">Modifier</button>
  </form>
      </div>
      </div>
    </>
  );
};

export default Edit;
