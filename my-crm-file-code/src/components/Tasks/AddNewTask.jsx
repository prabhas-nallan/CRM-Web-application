import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
const AddTask = () => {
  const navigate = useNavigate();

  function gotoTaskPage() {
    navigate("/tasks");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    assignedto: "",
    duedate:"",
    createdat:"",
    completedat:"",
    updatedat:""
  });

  function onChangeData(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8091/task",formData);
      // navigate("/tasks");
      toast.success('Task has been added successfully!🧾', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       // Navigate to 'tasks' page after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        window.location.href = '/tasks';
      }, 3000);
    }catch(error){
      Swal.fire(
        'Failed to create Task',
        'Check with the fields once.(Ex:CustomerId)',
        'warning'
      )
    }
     
  }

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Add Task</h2>
        <Link to="/tasks" className="close-btn">
          <RxCrossCircled fontSize="2rem" />
        </Link>
      </div>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Ex : Raju"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Ex : raj@gmail.com"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            placeholder="Ex : Describe about the kind of task here!"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="assignedto">Assigned To</label>
          <input
            type="text"
            id="assignedto"
            name="assignedto"
            value={formData.assignedto}
            placeholder="Ex : Sales Team"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="duedate">Due Date</label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={formData.duedate}
            placeholder="Ex : 12/07/2023"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="createdat">Created at</label>
          <input
            type="datetime-local"
            id="createdat"
            name="createdat"
            value={formData.createdat}
            placeholder="Ex : 02/07/2023"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="completedat">Completed at</label>
          <input
            type="datetime-local"
            id="completedat"
            name="completedat"
            value={formData.completedat}
            placeholder="Ex : 06/07/2023"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="updatedat">Updated at</label>
          <input
            type="datetime-local"
            id="updatedat"
            name="updatedat"
            value={formData.updatedat}
            placeholder="Ex : 10/07/2023"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="action-btns">
          <button onClick={gotoTaskPage} className="cancel">
            Cancel
          </button>
          <button className="add">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
