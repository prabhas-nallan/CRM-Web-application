import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";
const EditOpportunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    value: "",
    closeDate: "",
    notes: "",
  });
  const {id} = useParams();

  function gotoOpportunityPage() {
    navigate("/opportunities");
  }

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
          await axios.put(
            `http://localhost:8091/opportunity/${id}`,
            formData);
          // console.log(response.data);
          navigate("/opportunities");
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
    loadOpportunity();
  }, []);

  const loadOpportunity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8091/opportunity/${id}`
      );
      const data = response.data;
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <h2>Edit Opportunity</h2>
        <Link to="/opportunity" className="close-btn">
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
                placeholder="Ex : Opportunity Name"
                onChange={onChangeData}
                required
              />
            </div>
           
            <div className="form-field select-field">
              <select type="text" value={formData.status} onChange={onChangeData}
              name="status"
              id="status" 
              required>
                <option value="">Status</option>
                <option value="Open">Open</option>
                <option value="Proposal">Proposal</option>
                <option value="Closed Win">Closed Win</option>
                <option value="Closed Loss">Closed Loss</option>  
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                placeholder="Ex : 5000"
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="closeDate">CloseDate</label>
              <input
                type="date"
                id="closeDate"
                name="closeDate"
                placeholder="Ex : 02/07/2023"
                value={formData.closeDate}
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
                placeholder="Ex : Describe about the opportunity here!"
                onChange={onChangeData}
                required
              />
            </div>
        <div className="action-btns">
          <button onClick={gotoOpportunityPage} className="cancel">
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

export default EditOpportunity;
