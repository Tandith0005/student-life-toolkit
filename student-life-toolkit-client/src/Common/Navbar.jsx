import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { CircleLoader } from "react-spinners";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const menuItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `custom-nav-link ${isActive ? "active" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `custom-nav-link ${isActive ? "active" : ""}`
        }
        end
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/motivation"
        className={({ isActive }) =>
          `custom-nav-link ${isActive ? "active" : ""}`
        }
      >
        Quotes
      </NavLink>
      <NavLink
        to="/dashboard#tasks"
        className={() =>
          `custom-nav-link ${
            location.pathname === "/dashboard" && location.hash === "#tasks"
              ? "active"
              : ""
          }`
        }
      >
        Tasks
      </NavLink>
      <NavLink
        to="/translate"
        className={({ isActive }) =>
          `custom-nav-link ${isActive ? "active" : ""}`
        }
      >
        Syno&Anto
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-4 text-[15px] font-semibold text-[#f43f5e]"
            >
              {menuItems}
            </ul>
          </div>
          <Link to={"/"}>
            <img src="/Logo.png" className="w-12 md:w-20" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6 text-[20px] font-semibold text-[#f43f5e] ">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <CircleLoader color="#f43f5e" />
          ) : user ? (
            <>
              <details className="dropdown">
                <summary
                  className="flex items-center cursor-pointer list-none"
                  style={{ listStyle: "none" }}
                >
                  <FaRegCircleUser className="text-[#f43f5e]" size={40} />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOut}> Logout </button>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline border-rose-400 text-rose-500 hover:bg-rose-400 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
