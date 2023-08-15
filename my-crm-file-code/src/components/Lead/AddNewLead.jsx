import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const AddLead = () => {
  const navigate = useNavigate();

  function gotoLeadPage() {
    navigate("/leads");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status:"",
    notes:""
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
      await axios.post("http://localhost:8091/lead", formData);
      // navigate("/leads");
      toast.success('Lead has been added successfully!🫅🏻', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       // Navigate to 'leads' page after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        window.location.href = '/leads';
      }, 3000);
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Failed to create Lead',
        'Check with the fields once.s',
        'warning'
      )
    } 
  }

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Add Lead</h2>
        <Link to="/leads" className="close-btn">
          <RxCrossCircled fontSize="2rem" />
        </Link>
      </div>
      <form className="customer-form" onSubmit={handleSubmit}>
        <ToastContainer/>
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
          <button className="add">Add Lead</button>
        </div>
      </form>
    </div>
  );
};

export default AddLead;
