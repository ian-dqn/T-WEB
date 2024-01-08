import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import SelectUserPref from './newsPreferences';
import CryptoSelect from '../../templates/Accueil/CryptoSelect';
import Sidebar from '../../templates/Header/Sidebar';
import { toast } from 'react-toastify';

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
    news:'',
    crypto:[],
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
            crypto: res.data.crypto && res.data.crypto.length > 0 ? res.data.crypto : [],
          }));
          console.log("res frontend :",res.data)
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
  const handleNewsParamsChangeSelect = (selectedOptions) => {
    const selectedCryptos = selectedOptions.map((option) => option.value);
    setValues((prevValues) => ({ ...prevValues, crypto: selectedCryptos }));
    console.log('crypto changed !');
    console.log('selectedCryptos: ',selectedCryptos); // Log the updated state
  };


  const handelSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/auth/${id}`,{
          password:values.password,
          newsPref:values.news,
          crypto:values.crypto
        },
        { headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`} })
        .then(res=>{
          toast.success('Votre profil a été mis à jour !', {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/")
        })
        .catch(err=>console.log(err))
    console.log(values)
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
                  readOnly
                  required
              />

              <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={e=>setValues({...values,password:e.target.value})}/>

              <label htmlFor="preferences">Preferences:</label>
              <SelectUserPref onChange={handleNewsParamsChange} initialValues={values.news} />

              <label htmlFor="crypto">Crypto:</label>
              <CryptoSelect onChange={handleNewsParamsChangeSelect} initialValues={values.crypto} />


              <button type="submit">Modifier</button>
            </form>
          </div>
        </div>

      </>
  );
};

export default Edit;