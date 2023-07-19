import React from "react";
  

 const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAdd(evt.target.name.value, evt.target.email.value);
    evt.target.name.value = "";
    evt.target.email.value = "";
  };

  return (
    <div className="main">
      <h2 className="main-header">React Crud Application</h2>
      <form onSubmit={handleOnSubmit}>
       <label>First Name</label>
       <br/>
      <input placeholder="Name" name="name" className="name_feild" /><br/>
        <label>E-Mail</label>
        <br/>
      <input placeholder="Email" name="email" className="name_feild"/><br/>
     
      <button onSubmit={handleOnSubmit} className="add_button">Add</button>
      </form>
     </div>
  );
};
export default AddUser;