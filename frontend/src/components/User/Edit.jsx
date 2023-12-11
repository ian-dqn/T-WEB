import React from 'react';

const Edit = ({ editMode, setEditMode, newPassword, setNewPassword, handleSaveEdit, handleCancelEdit }) => {
  return (
    <>
      {editMode && (
        <li>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </li>
      )}
      {editMode ? (
        <li>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </li>
      ) : (
        <>
          <li>
            <a className="dropdown-item" href="#" onClick={() => setEditMode(true)}>
              Edit
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Portefeuille
            </a>
          </li>
        </>
      )}
    </>
  );
};

export default Edit;
