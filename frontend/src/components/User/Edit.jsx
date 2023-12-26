import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import SelectUserPref from './newsPreferences';

const Edit = () => {

  const {id} = useParams() ;
  console.log(id)
  //const {data, loading, error, reFetch} = useFetch('http://localhost:5000/api/cryptodata')
  const dataString = localStorage.getItem('data');
  const data = JSON.parse(dataString);
  const token = data.token

  const [values , setValues] = useState({
    _id:id,
    email:'',
    password:'',
    news:''
  })
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/auth/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
          .then(res => {
            console.log(res)
            setValues(prevValues => ({
              ...prevValues,
              email: res.data.email,
              password: res.data.password,
              news: res.data.articlesPrefs,
            }));
            console.log('values updated')
            console.log(values)
          })
          .catch(err=>console.log(err))
  },[id, token])

  const navigate = useNavigate()

   const handleNewsParamsChange = (selectedOptions) => {
    const selectedNews = selectedOptions.map((option) => option.value);
    setValues({ ...values, news: selectedNews });
    console.log('prefs changed:')
    console.log(values)
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/auth/${id}`,{
      password:values.password,
      newsPref:values.news
    },
    { headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`} })
      .then(res=>{navigate("/") })
      .catch(err=>console.log(err))
  }

  return (
    <>
      <div className="login-container">

        <h1>Mettre à jour</h1>

        <form onSubmit={handelSubmit}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            readOnly
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

          <label htmlFor="preferences">Preferences:</label>
          <SelectUserPref onChange={handleNewsParamsChange} initialValues={values.news} />

          <label htmlFor="preferences">Preferences:</label>
          <SelectUserPref onChange={handleNewsParamsChange} initialValues={values.news} />

          <button type="submit">Modifier</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
