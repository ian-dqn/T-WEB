import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SelectUserPref from '../../User/newsPreferences';
import CryptoSelect from '../../../templates/Accueil/CryptoSelect';
const EditeUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true); 
  const [values, setValues] = useState({
    _id: id,
    email: '',
    password: '',
    isAdmin: false,
    articlesPrefs: '',
    crypto: [],
  });
  const dataString = localStorage.getItem('data');
  const data = JSON.parse(dataString);
  const token = data.token;
  console.log('Token:', token);
  useEffect(() => {

    axios.get(`http://localhost:4000/api/auth/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => {
      setValues(prevValues => ({
        ...prevValues,
        email: res.data.email,
        password: res.data.password,
        isAdmin: res.data.isAdmin, // Update with your actual property name
       
        articlesPrefs: res.data.articlesPrefs, // Update with your actual property name
        crypto: res.data.crypto && res.data.crypto.length > 0 ? res.data.crypto : [],
      }));
    
      setLoading(false);
    })
    .catch(err => console.log(err));
    setLoading(false); 
  }, [id]);

  const handleNewsParamsChange = (selectedOptions) => {
    const selectedNews = selectedOptions.map((option) => option.value);
    setValues({ ...values, articlesPrefs: selectedNews });
    console.log('News prefs changed:');
    console.log(values);
  };

  const handleNewsParamsChangeSelect = (selectedOptions) => {
    const selectedCryptos = selectedOptions.map((option) => option.value);
    setValues((prevValues) => ({ ...prevValues, crypto: selectedCryptos }));
    console.log('Crypto changed!');
    console.log('Selected Cryptos: ', selectedCryptos);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('isAdmin value:', values.isAdmin);
    axios.put(`http://localhost:4000/api/auth/${id}`, {
      password: values.password,
      articlesPrefs: values.articlesPrefs,
      crypto: values.crypto,
      isAdmin: values.isAdmin,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Make sure to include your token
      },
    })
    .then(res => {
      toast.success('Votre profil a été mis à jour !', {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/dashboard");
    })
    .catch(err => console.log(err));
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="row  mt-5">
          <div className="col-md-3 mt-5">
            <aside className="bg-dark p-4">
              <h5>Admin Actions</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/edit-user">
                    Add User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Users
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="col-md-9 mt-5">
            {/* Form edit */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />

<label htmlFor="password">Password:</label>
<input
  type="password"
  id="password"
  name="password"
  value={values.password}
  onChange={(e) => setValues((prevValues) => ({ ...prevValues, password: e.target.value }))}
/>

              <label htmlFor="isAdmin">isAdmin:</label>
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={values.isAdmin}
                onChange={(e) => setValues({ ...values, isAdmin: e.target.checked })}
              />

              <label htmlFor="articlesPrefs">Articles Preferences:</label>
              <SelectUserPref onChange={handleNewsParamsChange} initialValues={values.articlesPrefs} />

              <label htmlFor="crypto">Crypto:</label>
              <CryptoSelect onChange={handleNewsParamsChangeSelect} initialValues={values.crypto} />

              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditeUser;
