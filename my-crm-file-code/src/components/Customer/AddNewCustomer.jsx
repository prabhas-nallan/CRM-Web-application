import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const AddCustomer = () => {
  const navigate = useNavigate();

  function gotoCustomerPage() {
    navigate("/customers");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    communicationHistory:"",
    purchaseHistory: ""
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
      await axios.post("http://localhost:8091/customer", formData);
      toast.success('Customer has been added successfully!🤸🏻', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Navigate to 'customers' page after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        // navigate("/customers");
        window.location.href = '/customers';
      }, 3000);
    } catch(error){
      Swal.fire(
        'Failed to create Customer',
        'Check with the input fields once.',
        'warning'
      )
    } 
    // console.log(data);

    // navigate("/customers"); 
  }

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Add Customer</h2>
        <Link to="/customers" className="close-btn">
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
            placeholder="Ex : Jake Gyllenhaal"
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
            onChange={onChangeData}
            placeholder="Ex : jakeg20@gmail.com"
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
            placeholder="Ex : 9949012048"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            placeholder="Ex : H.no.:4-8-12/5-1, Hyderabad, Telanagana."
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="communication">Communication History</label>
          <input
            type="text"
            id="communication"
            name="communicationHistory"
            value={formData.communicationHistory}
            placeholder="Ex : Chennai,TamilNadu."
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="purchase">Purchase History</label>
          <input
            type="text"
            id="purchase"
            name="purchaseHistory"
            value={formData.purchaseHistory}
            placeholder="Ex : Pune,Mumbai."
            onChange={onChangeData}
            required
          />
        </div>
        <div className="action-btns">
          <button onClick={gotoCustomerPage} className="cancel">
            Cancel
          </button>
          <button className="add">Add Customer</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
