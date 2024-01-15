import React from 'react';
import { Link } from 'react-router-dom';
import UserTable from './UserTable';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mt-5" >
          {/* Aside for Admin Actions */}
          <aside className="bg-dark p-4 mt-5">
            <h5>Admin Actions</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashboard/add-user"
                >
                  Add  User
                </Link>
              </li>
          
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashboard"
                >
                  Users
                </Link>
              </li>
            </ul>
          </aside>
        </div>
        <div className="col-md-9 mt-5">
          {/* Main Content */}
          <div>
         
           <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
