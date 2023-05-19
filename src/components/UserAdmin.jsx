import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";
import { Card, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";

const UserAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [Datas, setDatas] = useState([]);
  const [modalRole, showModalRole] = useState(false);
  const [allUsersId, setAllUsersId] = useState(
    JSON.parse(localStorage.getItem("allUserId"))
  );
  const [role, setRole] = useState("");
  

  const fetchGetAllUser = async () => {
    try {
      const getAllUser = await axiosInstance.get("/all-user", {
        headers: {
          apiKey: apiKeys,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      });
      setDatas(getAllUser.data.data);
      const allUserId = getAllUser.data.data.map(({ id }) => id);
      localStorage.setItem("allUserId", JSON.stringify(allUserId));
      setAllUsersId(allUserId);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoleUser = (id) => {
    axiosInstance
      .post(
        `update-user-role/${id}`,
        { 
          role, 
        },
        {
          headers: {
            apiKey: apiKeys,
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
          },
        }
      )
      .then(() => {
        alert("Update Role Success");
        fetchGetAllUser();

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowModalRole = () => {
    showModalRole(true);
  };

  const handleCloseModalRole = () => {
    showModalRole(false);
  };

  useEffect(() => {
    fetchGetAllUser();
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
              <th>Action</th>
            </tr>
          </thead>
          {Datas.slice(35, 40).map((Data) => {
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
                    <button onClick={handleShowModalRole}>Update Role</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

      {/* MODAL EDIT ROLE */}
        {Datas.map((data) => {
          return (
            <div key={data.id}>
              <Formik
                initialValues={{
                  name: data.name,
                  role: data.role,
                }}
              >
                <Modal show={modalRole} onHide={handleCloseModalRole}>
                  <Modal.Body>
                    <div className="cardUpdateCategoriesAdmin">
                      <span className="title">Update Role</span>

                      <form className="form">
                        <div className="inputBox">
                          <Form.Select
                            id={`role${data.id}`}
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            type="text"
                            required="required"
                          >
                            <option select="true">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </Form.Select>
                        </div>
                        <button
                          type="submit"
                          onClick={() => updateRoleUser(data.id)}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalRole}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Formik>
            </div>
          );
        })}
    </>
  );
};

export default UserAdmin;
