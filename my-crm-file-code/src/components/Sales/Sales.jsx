import React, { useEffect, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import "../../styles/Customers.css";
import axios from "axios";
import Footer from "../Footer/Footer";

const Sales = ({ sales }) => {
  const [allsales, setAllsales] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  


  useEffect(() => {
    loadSale();
  }, []);

  const loadSale = async () => {
    try {
      const response = await axios.get("http://localhost:8091/sale");
      const data = response.data; 
  
      setAllsales(data);
      console.log(allsales);
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    }
  };


  const moveToAddNewSalePage = () => {
    navigate("/add-new-sale");
  };

  const handleEdit = (id) => {
    navigate(`/editsale/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8091/sale/${id}`);
          setAllsales((prevSales) =>
            prevSales.filter((sale) => sale.id !== id)
          );
  
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
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

  return (
    <div className="customers-page">
      <div className="header-section">
        <div className="search-bar">
          <CgSearch fontSize="1.6rem" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <button className="add-customer-btn" onClick={moveToAddNewSalePage}>
          <AiOutlineUserAdd fontSize="1.6rem" />
          <p>Add a new Sales</p>
        </button>
      </div>
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Customer ID</th>
              <th>Opportunity ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allsales
            .filter((sale) => {
              return (
                sale.name.toLowerCase().includes(searchQuery) ||
                sale.id.toString().includes(searchQuery)
              );
            })
            .map((eachSale, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{eachSale.id}</td>
                <td>{eachSale.name}</td>
                <td>{eachSale.customer_id}</td>
                <td>{eachSale.opportunity_id}</td>
                <td>{eachSale.amount}</td>
                <td>{eachSale.date}</td>
                <td>{eachSale.notes}</td>
                <td className="action-btns">
                  <div className="action-btn">
                    <LuEdit
                      className="action-btn-component1"
                      fontSize="1.6rem"
                      onClick={() => handleEdit(eachSale.id)}
                    />
                    <RiDeleteBin2Fill
                      className="action-btn-component1"
                      fontSize="1.6rem"
                      onClick={() => handleDelete(eachSale.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {/* <Footer/> */}
    </div>
  );
};

export default Sales;
