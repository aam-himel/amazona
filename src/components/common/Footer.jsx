import { footerLinks } from "constants/footer-links";
import * as Route from "constants/routes";
import logo from "images/logo-full.png";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const d = new Date();
  const currentYear = d.getFullYear();

  // var d = new Date(); page.currentYear = d.getFullYear();
  const visibleOnlyPath = [Route.HOME, Route.SHOP];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer ">
      <div className="footer-center">
        <h3>AMAZONA </h3>
        <small>&copy; Copyright {currentYear}, Amazona</small>
      </div>
    </footer>
  );
};

export default Footer;
