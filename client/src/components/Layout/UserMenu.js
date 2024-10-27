import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/user/all-product"
            className="list-group-item list-group-item-action"
          >
            All Products
          </NavLink>
          <div></div>
          <NavLink
            to="/user/all-category"
            className="list-group-item list-group-item-action"
          >
            Categories
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
