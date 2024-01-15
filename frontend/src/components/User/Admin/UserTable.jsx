import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set the number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dataString = localStorage.getItem('data');
        const data = JSON.parse(dataString);
        const token = data.token;

        const response = await axios.get('http://localhost:4000/api/auth/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
        } else {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const jsonData = response.data;
        setUsers(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const dataString = localStorage.getItem('data');
  const data = JSON.parse(dataString);
  const token = data.token;
  const navigate = useNavigate();

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      axios.delete(`http://localhost:4000/api/auth/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response.data);
          console.log(`Delete user with ID: ${userId}`);
          toast.error('Your profile has been deleted!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error(error); // Handle the error
        });
    }
  };

  return (
    <div>
      <table className="table table-dark mt-2">
        <thead>
          <tr>
            <th>Email</th>
            <th>isAdmin</th>
            <th>Cryptocurrencies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
  {user.crypto && user.crypto.length > 0 ? (
    user.crypto.map((id) => (
      <img
        key={id}
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
        width={25}
        alt={`Crypto ${id}`}
        className='me-2'
      />
    ))
  ) : ('-')}
</td>
              <td>
                <Link to={`/dashboard/edit-user/${user._id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
