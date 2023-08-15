import React, { useEffect, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../styles/Customers.css";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import axios from "axios";
// import Footer from "../Footer/Footer";
import "./Delete.css";

const Customers = () => {

  const [allcustomers, setAllcustomers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:8091/customer");
      const data = response.data;

      setAllcustomers(data);
      console.log(allcustomers);
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    }
   
  };

  const moveToAddNewCustomerPage = () => {
    navigate("/add-new-customer");
  };

  const handleEdit = (id) => {
    navigate(`/editcustomer/${id}`);
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
          await axios.delete(`http://localhost:8091/customer/${id}`);
          setAllcustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.id !== id)
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
        <button className="add-customer-btn" onClick={moveToAddNewCustomerPage}>
          <AiOutlineUserAdd fontSize="1.6rem" />
          <p>Add a new Customer</p>
        </button>
      </div>
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Communication History</th>
              <th>Purchase History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allcustomers
              .filter((customer) => {
                return (
                  customer.name.toLowerCase().includes(searchQuery) ||
                  customer.email.toLowerCase().includes(searchQuery)
                );
              })
              .map((eachCustomer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{eachCustomer.id}</td>
                  <td>{eachCustomer.name}</td>
                  <td>{eachCustomer.email}</td>
                  <td>{eachCustomer.phone}</td>
                  <td>{eachCustomer.address}</td>
                  <td>{eachCustomer.communicationHistory}</td>
                  <td>{eachCustomer.purchaseHistory}</td>
                  <td className="action-btns">
                    <div className="action-btn">
                      <LuEdit
                        className="action-btn-component"
                        fontSize="1.6rem"
                        onClick={() => handleEdit(eachCustomer.id)}
                      />

                      <RiDeleteBin2Fill
                        className="action-btn-component"
                        fontSize="1.6rem"
                        onClick={() => handleDelete(eachCustomer.id)}

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

export default Customers;
