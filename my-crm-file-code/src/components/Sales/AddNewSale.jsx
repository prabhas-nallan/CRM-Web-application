import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import './SelectCategory.css';
const AddSales = () => {
  const navigate = useNavigate();

  function gotoSalesPage() {
    navigate("/Sales");
  }

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    notes: "",
    customer_id:"",
    opportunity_id:""
  });

  

  function onChangeData(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      await axios.post(`http://localhost:8091/customer/${formData.customer_id}/opportunity/${formData.opportunity_id}/sale`,
      formData);
      // navigate("/sales");
      toast.success('Sale has been added successfully!📈', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       // Navigate to 'tickets' page after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        window.location.href = '/sales';
      }, 3000);
    }catch(error){
      Swal.fire(
        'Failed to create Sale',
        'Check with the fields once.(Ex:CustomerId/OpportunityId)',
        'warning'
      )
    } 
  };

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Add a new sales</h2>
        <Link to="/sales" className="close-btn">
          <RxCrossCircled fontSize="2rem" />
        </Link>
      </div>
      <form className="customer-form" onSubmit={handleSubmit}>
        <ToastContainer/>
        <div className="form-field select-field">
          <select type="text" value={formData.name} onChange={onChangeData}
          name="name"
          id="name" 
          required>
            <option value="">Choose Sale category</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="HealthProducts">HealthProducts</option>
            <option value="clothing">clothing</option>  
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="customer_id">Customer ID</label>
          <input
            type="number"
            id="customer_id"
            name="customer_id"
            placeholder="Ex : 1,2,3...etc;"
            value={formData.customer_id}
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="opportunity_id">Opportunity ID</label>
          <input
            type="number"
            id="opportunity_id"
            name="opportunity_id"
            value={formData.opportunity_id}
            placeholder="Ex : 1,2,3...etc;"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            placeholder="Ex : 10000"
            onChange={onChangeData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            placeholder="Ex : 10/07/2023"
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
            placeholder="Ex : Describe about your sale here!"
            onChange={onChangeData}
            required
          />
        </div>

        <div className="action-btns">
          <button onClick={gotoSalesPage} className="cancel">
            Cancel
          </button>
          <button className="add">Add Sales</button>
        </div>
      </form>
    </div>
  );
};

export default AddSales;
