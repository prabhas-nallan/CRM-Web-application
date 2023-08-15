import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const EditTask = () => {
  const navigate = useNavigate();
  const {id} = useParams();

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
    
    try {
      Swal.fire({
        title: 'Do you want to save changes?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      }).then(async (result)=>{
        if(result.isConfirmed){
          await axios.put(`http://localhost:8091/task/${id}`, formData);
           navigate("/tasks");
          Swal.fire(
            'Changes saved!',
            'Your changes has been saved.',
            'success'
          );
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    } 
  }

  useEffect(()=>{
    loadTask();
  } , [])

  const loadTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/task/${id}`);
      const data = response.data; 
  
      setFormData(data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    }
  };

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Edit Task</h2>
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
          <button className="add">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
