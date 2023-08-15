import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const EditLead = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  function gotoLeadPage() {
    navigate("/leads");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status:"",
    notes: ""
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
          await axios.put(`http://localhost:8091/lead/${id}`, formData);
    navigate("/leads");

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
    loadLead();
  } , [])

  const loadLead = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/lead/${id}`);
      const data = response.data; 
  
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Edit Lead</h2>
        <Link to="/leads" className="close-btn">
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
            placeholder="Ex : Greesham Choudary"
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
            placeholder="Ex : greeshamchoudary@gmail.com"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder="Ex : 9848350340"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            placeholder="Ex : Client"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            placeholder="Ex : Done/Pending"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            placeholder="Ex : Hello there!, Welcome to CRM portal"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="action-btns">
          <button onClick={gotoLeadPage} className="cancel">
            Cancel
          </button>
          <button className="add">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditLead;
