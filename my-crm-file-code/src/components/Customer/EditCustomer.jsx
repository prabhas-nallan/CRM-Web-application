import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const EditCustomer = () => {
  const navigate = useNavigate();
  const {id} = useParams();

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
          await axios.put(`http://localhost:8091/customer/${id}`, formData);   
           navigate("/customers");

          Swal.fire(
            'Changes saved!',
            'Your changes has been saved.',
            'success'
          );
        }
      });
    } catch (error) {
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
      console.error(error);    
    }
  };

  useEffect(()=>{
    loadCustomer();
  } , [])

  const loadCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/customer/${id}`);
      const data = response.data; 
  
      setFormData(data);
    } catch (error) {
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
      console.error(error);
    }
  };

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Edit Customer</h2>
        <Link to="/customers" className="close-btn">
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
          <button className="add">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
