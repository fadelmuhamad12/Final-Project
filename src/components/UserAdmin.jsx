import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";
import { Card, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";


const UserAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [Datas, setDatas] = useState([]);
  const [loggedUsers, setLoggedUsers] = useState([]);
  const [modal, showModal] = useState(false);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState ("");
  const [phoneNumber, setPhoneNumber] = useState("")

  const fetchGetAllUser = async () => {
    try {
      const getAllUser = await axiosInstance.get("/all-user", {
        headers: {
          apiKey: apiKeys,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      });
      //   console.log(getAllUser.data.data);
      setDatas(getAllUser.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLoggedUser = async () => {
    try {
      const setLoggedUsers = await axiosInstance.get("/user", {
        headers: {
          apiKey: apiKeys,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };



  const updateProfile = (e) => {
    e.preventDefault();
        axiosInstance.post('/upddate-profile', {
      headers: {
        apiKey: apiKeys,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
      }
    }).then(()=>{ 
      alert("Profile Updated");
      window.location.reload();
      fetchGetAllUser();
      handleShowModal();
    })
  }

  const handleShowModal = () => {
    showModal(true);
  };

  const handleCloseModal = () => {
    showModal(false);
  };

  useEffect(() => {
    fetchGetAllUser();
    fetchLoggedUser();
  }, []);

  return (
    <>
      {/* ALL USER */}
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Profile Picture</th>
              <th>Phone Number</th>
              <th colSpan={2}>Manage</th>
            </tr>
          </thead>
          {Datas.slice(0, 5).map((Data) => {
            return (
              <tbody key={Data.id}>
                <tr>
                  <td>{Data.id}</td>
                  <td>{Data.name}</td>
                  <td>{Data.email}</td>
                  <td>{Data.role}</td>
                  <td>
                    <img
                      src={Data.profilePictureUrl}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{Data.phoneNumber}</td>
                  <td>
                    <button onClick={()=> updateProfile()}>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

      {/* LOGGED USER */}
      <div>
        <h3>Logged User</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Profile Picture</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* MODAL EDIT */}
      <Modal
        show={modal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="cardUpdateCategoriesAdmin">
            <span className="title">Update Kategori</span>

            <form className="form" >
              <div className="group">
                <input
                  placeholder=""
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label htmlFor="name">Nama</label>
              </div>
              <div className="group">
                <input
                  placeholder=""
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={name}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="group">
                <input
                  placeholder=""
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={(e) => setprofilePicture(e.target.value)}
                  value={profilePicture}
                />
                <label htmlFor="profilePicture">profilePicture</label>
              </div>

              <div className="group">
                <input
                  placeholder=""
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) => setphoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <label htmlFor="phoneNumber">phoneNumber</label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserAdmin;
