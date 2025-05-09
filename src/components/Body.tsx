import { type FC } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
// import Footer from "./Footer";

const Body: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Outlet></Outlet>
      </div>
      {/* Fixed Footer */}
      {/* <div className="mt-auto"> */}
      {/* <Footer />
      </div> */}
    </div>
  );
};

export default Body;
