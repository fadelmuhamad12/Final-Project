import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CategoriesAdmin from "./CategoriesAdmin";
import BannersAdmin from "./BannersAdmin";
import ActivityAdmin from "./ActivityAdmin";
import PromosAdmin from "./PromosAdmin";
import NavigationBar from "./NavigationBar";
import UserAdmin from "./UserAdmin";

const DashboardAdmin = () => {
  return (
    <>
      <div className="dashboardWrapper">
        <NavigationBar />
        <h3 className="JudulDashboard">DASHBOARD ADMIN, {name}</h3>
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
