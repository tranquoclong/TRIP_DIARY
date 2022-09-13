import React from "react";
import { FaUserCog, FaPlane } from "react-icons/fa";
import TripManagement from "../tripManagement";
import UserManagement from "../userManagement";
import Tabs from "./tab/tabs";

function Dashboard() {
  return (
    <Tabs>
      <div label="User Management" Icon={FaUserCog}>
        <UserManagement />
      </div>
      <div label="Trip Management" Icon={FaPlane}>
        <TripManagement />
      </div>
    </Tabs>
  );
}

export default Dashboard;
