import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const EditSale= () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    notes: "",
    customer_id:"",
    opportunity_id:""
  });
  const {id} = useParams(); 

  function gotoSalePage() {
    navigate("/sale");
  }

  const otherSaleNames = [
    "Furniture",
    "Electronics",
    "HealthProducts",
    "clothing"
  ];

  const updateSalesNames = [
    formData.name,
    ...otherSaleNames.filter((name)=> name !== formData.name)
  ]

  


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
          await axios.put(`http://localhost:8091/sale/${id}`, formData);
          navigate("/sales");
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
  };

  useEffect(() => {
    loadSale();
  }, []);

  const loadSale = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8091/sale/${id}`
      );
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
        <h2>Edit Sale</h2>
        <Link to="/sale" className="close-btn">
          <RxCrossCircled fontSize="2rem" />
        </Link>
      </div>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Select SaleName</label>
          <select value={formData.name}
          type="text"
          onChange={onChangeData}
          required
           >
            <option value="">choose your salename</option>
            {
              updateSalesNames.map((name)=>(
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            }
          </select>
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
          <button onClick={gotoSalePage} className="cancel">
            Cancel
          </button>
          <button type="submit" className="add">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSale;