import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SelectUserPref from '../../User/newsPreferences';
import CryptoSelect from '../../../templates/Accueil/CryptoSelect';

const AddUser = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
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
  const handleNewsParamsChange = (selectedOptions) => {
    const selectedNews = selectedOptions.map((option) => option.value);
    setValues({ ...values, articlesPrefs: selectedNews });
  };

  const handleNewsParamsChangeSelect = (selectedOptions) => {
    const selectedCryptos = selectedOptions.map((option) => option.value);
    setValues({ ...values, crypto: selectedCryptos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/api/auth/create', values,{
    
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Make sure to include your token
        }
    })
      .then(res => {
        toast.success('New user added successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate("/dashboard");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3 mt-5">
            <aside className="bg-dark p-4">
              <h5>Admin Actions</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/add-user">
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
          <div className="col-md-9 mt-3">
            {/* Form to add a new user */}
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
                onChange={(e) => setValues({ ...values, password: e.target.value })}
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

              <button type="submit">Add User</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
