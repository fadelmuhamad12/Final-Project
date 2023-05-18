import React, {useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CategoriesAdmin from "./CategoriesAdmin";
import BannersAdmin from "./BannersAdmin";
import ActivityAdmin from "./ActivityAdmin";
import PromosAdmin from "./PromosAdmin";
import NavigationBar from "./NavigationBar";
import UserAdmin from "./UserAdmin";

const DashboardAdmin = () => {

  // const [email, setEmail] = useState("a");

  // // input select
  // const [option, setOption] = useState([]);
  // const [select, setSelect] = useState("");

  // useEffect(()=> {
  //   // panggil api call datanya
  //   // kalo udah dapet responsenya: setEmail(dari responsenya)

  //   const ceritanyaOpsiDariApi = [
  //     {
  //         "id": "441d523f-7e5c-42f4-9919-6deec1720cb2",
  //         "name": "Temple",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683908078897-borobudur.jpg",
  //         "createdAt": "2023-05-12T16:14:42.260Z",
  //         "updatedAt": "2023-05-12T16:14:42.260Z"
  //     },
  //     {
  //         "id": "ce89600c-5972-41d8-a34f-62a2f98576bc",
  //         "name": "Snorkeling",
  //         "imageUrl": "https://img.freepik.com/free-photo/water-two-women-pacific-male_1232-4584.jpg?w=740&t=st=1683944184~exp=1683944784~hmac=86d8dae1f35939ec4bd4eb3c5cdeb47458b9b2d32c8256e144122536cdc8aa91",
  //         "createdAt": "2023-05-13T02:16:43.455Z",
  //         "updatedAt": "2023-05-13T02:16:43.455Z"
  //     },
  //     {
  //         "id": "15be7843-5d36-4d3b-a740-f7e46addd8e5",
  //         "name": "Zoo",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683971156354-zoo.jpg",
  //         "createdAt": "2023-05-13T09:45:57.625Z",
  //         "updatedAt": "2023-05-13T09:45:57.625Z"
  //     },
  //     {
  //         "id": "dc52eafa-40fe-48a6-b913-3926ddf32b56",
  //         "name": "Gunung Es",
  //         "imageUrl": "https://fruitylogic.com/blog/wp-content/uploads/2020/08/fenomena-branding-gunung-es.jpg",
  //         "createdAt": "2023-05-09T15:41:42.803Z",
  //         "updatedAt": "2023-05-09T15:41:42.803Z"
  //     },
  //     {
  //         "id": "d1cabbb2-b304-47c0-9b1e-3837bba53818",
  //         "name": "Mountain (Nanda)",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683647748431-alin-andersen-f0SgAs27BYI-unsplash (1)-min_11zon.jpg",
  //         "createdAt": "2023-05-09T06:11:46.889Z",
  //         "updatedAt": "2023-05-09T15:55:48.493Z"
  //     },
  //     {
  //         "id": "fbd3dcc4-e508-4eeb-909b-8b45855dfbf5",
  //         "name": "Beach (Nanda)",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683648047210-beach.jpg",
  //         "createdAt": "2023-05-09T16:00:47.279Z",
  //         "updatedAt": "2023-05-09T16:00:57.006Z"
  //     },
  //     {
  //         "id": "bd92f4fd-3a5b-4e0a-8da2-58ad6ef16f9d",
  //         "name": "Jalan Jalan",
  //         "imageUrl": "https://img.freepik.com/free-photo/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.jpg?size=626&ext=jpg&ga=GA1.1.2114018627.1683622945&semt=sph",
  //         "createdAt": "2023-05-11T10:03:25.909Z",
  //         "updatedAt": "2023-05-11T10:03:25.909Z"
  //     },
  //     {
  //         "id": "d7cf22e4-aa2f-42ab-af32-f9a111697abe",
  //         "name": "Theme Park",
  //         "imageUrl": "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/12/08/9c6ae660-1799-4276-b81d-f8b0b85669d6-1638949473006-1e6c55a1b1edca6bf250012af2cc79e2.jpg",
  //         "createdAt": "2023-05-08T16:34:04.376Z",
  //         "updatedAt": "2023-05-11T12:57:27.233Z"
  //     },
  //     {
  //         "id": "d58577a7-8e11-4572-9f5a-c800c87b77f3",
  //         "name": "Food & Beverage (Nanda)",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683737523213-food-and-beverages.jpg",
  //         "createdAt": "2023-05-10T16:52:03.283Z",
  //         "updatedAt": "2023-05-11T14:06:05.737Z"
  //     },
  //     {
  //         "id": "457b1316-8169-4451-80e7-03fb350a01b5",
  //         "name": "Museum",
  //         "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1683974792637-museum.jpeg",
  //         "createdAt": "2023-05-13T10:46:34.009Z",
  //         "updatedAt": "2023-05-13T10:46:48.347Z"
  //     }
  //   ]
  //   setOption(ceritanyaOpsiDariApi);

  //   setSelect("d7cf22e4-aa2f-42ab-af32-f9a111697abe");

  // },[])

  // const testSubmit = async () => {
  //   console.log(email, select);
  //   // nextnya disubmit ke BE
  // }

  return (
    <>
       <NavigationBar/>

      {/* <div id="test" style={{height: "100px", backgroundColor: "grey"}}>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

        <select value={select} onChange={(e)=>{setSelect(e.target.value)}} >
          {option.map((val, idx)=> {
            return (
              <option key={idx} value={val.id}>{val.name}</option>
            )
          })}
        </select>

        <button onClick={testSubmit}>Submit dong</button>
      </div> */}
      {/* next yang versi select */}

      <div className="dashboardWrapper">
     
        <h3 className="JudulDashboard">DASHBOARD ADMIN</h3>
        <div>
          <Tabs id="fill-tab-example" className="mb-3" fill>
            <Tab eventKey="Activity" title="Activity">
              <ActivityAdmin />
            </Tab>
            <Tab eventKey="Banners" title="Banners">
              <BannersAdmin />
            </Tab>
            <Tab eventKey="Categories" title="Categories">
              <CategoriesAdmin />
            </Tab>
            <Tab eventKey="Promos" title="Promos">
              <PromosAdmin />
            </Tab>
            <Tab eventKey="User" title="User">
              <UserAdmin />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
