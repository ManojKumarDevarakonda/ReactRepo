import React, { useState } from "react";
 const User = ({ name, email, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(id, evt.target.name.value, evt.target.email.value);
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <div className="edit_form">
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Name" name="name" className="edit_name_feild" defaultValue={name} /><br/>
          <input placeholder="Email" name="email" className="edit_name_feild" defaultValue={email} /><br/>
          <button onSubmit={handleOnEditSubmit} className="save_button">Save</button>
        </form>
        </div>
      ) : (
        <div className="user">  
          <span className="user-name">{name}</span>
          <span className="user-email">{email}</span>
          <div>
            <button onClick={handleEdit} className="edit_button">Edit</button>
            <button onClick={handleDelete} className="delete_button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;