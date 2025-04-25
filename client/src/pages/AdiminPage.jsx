import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";


const sideBaar = [
  {
    name: "Add Products",
    link: "/admin",
  },
  {
    name: "Add Slides",
    link: "/admin/addslides",
  },
  {
    name: "All Products",
    link: "/admin/allproducts",
  },
  {
    name: "All Orders",
    link:"/admin/allorders"
  },
  {
    name: "All Categories",
    link:"/admin/allcategories"
  },
  {
    name: "All Users",
    link:"/admin/AllUsers"
  },
];

const AdiminPage = () => {
  const {currentUser} = useSelector((state)=>state.auth)
  return (
    <div className="flex">
      <div className="w-48 list-none p-4 border-r-2">
        <h2 className="text-base text-gray-500 font-medium px-4 pb-2 border-b-2">Overview</h2>
        <div className="flex flex-col gap-2 mt-2">
        {sideBaar.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({isActive}) => isActive ? `text-base font-medium hover:bg-red-50 rounded-md text-red-600 px-4 py-2 ${(item.name == "All Users" && !currentUser?.host) && "hidden"}`: `text-base font-medium px-4 py-2 hover:bg-red-50 rounded-md text-gray-700 hover:text-gray-800 ${(item.name == "All Users" && !currentUser?.host) && "hidden"}`}
          >
            {item.name}
          </NavLink>
        ))}
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdiminPage;
