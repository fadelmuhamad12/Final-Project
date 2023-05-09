import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";

const UserAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [Datas, setDatas] = useState([]);
  const [loggedUsers, setLoggedUsers] = useState([]);

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
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
          apiKey: apiKeys,
        },
      });
      console.log(loggedUser);
      setLoggedUsers(loggedUser.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetAllUser();
    fetchLoggedUser();
  }, []);

  return (
    <>
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
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

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
          {loggedUsers.map((loggedUser) => {
            return (
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </>
  );
};

export default UserAdmin;
