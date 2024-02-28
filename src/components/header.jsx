import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="appHeader">
      <nav className="mainNav">
        <div className="navSection">
          <a href="#" className="logoLink">
            <img
              className="logo"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
              alt=""
            />
            <span>Your Company</span>
          </a>
        </div>

        <button className="menuButton" onClick={toggleSidebar}>
          Menu
        </button>

        <div className="navLinks hideOnMobile">
          <a href="#" className="navItem">
            Features
          </a>
          <a href="#" className="navItem">
            Marketplace
          </a>
          <a href="#" className="navItem">
            Company
          </a>
        </div>

        <div className="loginSection hideOnMobile">
          <ConnectButton />
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="sidebarOverlay" onClick={toggleSidebar}>
          <div className="sidebar">
            {/* <button className="menuButton" onClick={toggleSidebar}>
              Close
            </button> */}
            <a href="#" className="sidebarItem">
              Features
            </a>
            <a href="#" className="sidebarItem">
              Marketplace
            </a>
            <a href="#" className="sidebarItem">
              Company
            </a>
            <a href="#" className="sidebarItem">
              Log in
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
