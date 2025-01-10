import React from "react";
import Dashboard from "@/Components/user/dashboard/Dashboard";
import { UserProvider } from "@/Context/userContext";
const page = () => {
  return (
    <div>
      <UserProvider>
      <Dashboard />
      </UserProvider>
    </div>
  );
};

export default page;
