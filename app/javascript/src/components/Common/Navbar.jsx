import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Dropdown, Toastr } from "@bigbinary/neetoui";
import { withRouter } from "react-router-dom";
import { useAuthDispatch } from "contexts/auth";
import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";

const NavBar = () => {
  const authDispatch = useAuthDispatch();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Toastr.error(error);
    }
  };

  const navlinkClasses =
    "px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white hover:no-underline transition-all duration-300 ease-in-out";

  return (
    <nav className="w-full bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-3 gap-2">
          <div className="flex items-center flex-shrink-0">
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"
                fill="#10B981"
              />
              <path
                d="M34.828 31.9733C34.578 31.7234 34.2389 31.583 33.8853 31.583C33.5318 31.583 33.1927 31.7234 32.9427 31.9733L32 32.9147C31.754 33.1694 31.4597 33.3725 31.1344 33.5123C30.8091 33.652 30.4591 33.7256 30.1051 33.7287C29.751 33.7318 29.3998 33.6643 29.0721 33.5302C28.7444 33.3961 28.4466 33.1981 28.1963 32.9477C27.9459 32.6973 27.7479 32.3996 27.6138 32.0719C27.4797 31.7442 27.4122 31.393 27.4153 31.0389C27.4184 30.6849 27.492 30.3349 27.6317 30.0096C27.7715 29.6842 27.9746 29.39 28.2293 29.144L35.736 21.6347C37.5132 21.2304 39.3727 21.3968 41.0499 22.1101C42.7272 22.8234 44.1368 24.0473 45.0785 25.6079C46.0202 27.1684 46.4459 28.9861 46.2951 30.8024C46.1443 32.6188 45.4247 34.3414 44.2387 35.7253L41.428 38.572L34.828 31.972V31.9733ZM20.2147 23.9573C21.5943 22.5778 23.3989 21.704 25.3367 21.477C27.2745 21.2501 29.2322 21.6833 30.8933 22.7067L26.3427 27.2587C25.3571 28.2423 24.7952 29.5724 24.7772 30.9648C24.7592 32.3571 25.2865 33.7013 26.2464 34.71C27.2062 35.7188 28.5225 36.3122 29.9141 36.3634C31.3056 36.4146 32.6619 35.9195 33.6933 34.984L33.8853 34.8013L39.5427 40.4573L33.8853 46.1147C33.3852 46.6146 32.7071 46.8954 32 46.8954C31.2929 46.8954 30.6147 46.6146 30.1147 46.1147L20.2133 36.2133C18.5882 34.588 17.6752 32.3838 17.6752 30.0853C17.6752 27.7869 18.5882 25.5826 20.2133 23.9573H20.2147Z"
                fill="#F9FAFB"
              />
            </svg>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="hidden space-x-4 sm:block">
              <NavLink
                to="/clients"
                activeClassName="bg-gray-800"
                className={navlinkClasses}
              >
                Clients
              </NavLink>
              <NavLink
                to="/room"
                activeClassName="bg-gray-800"
                className={navlinkClasses}
              >
                Room
              </NavLink>
              <NavLink
                to="/account"
                activeClassName="bg-gray-800"
                className={navlinkClasses}
              >
                Account
              </NavLink>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end">
            <Dropdown
              customTarget={() => (
                <div className="flex-row items-center justify-end hidden sm:flex">
                  <p className="mr-3 text-sm font-medium text-gray-50">
                    Martha Lynn
                  </p>
                  <Avatar size={32} contact={{ name: "Martha Lynn" }} />
                  <i className="ml-1 text-gray-400 ri-arrow-down-s-line"></i>
                </div>
              )}
            >
              <li>Profile Settings</li>
              <li
                onClick={() => handleLogout()}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </li>
            </Dropdown>
            <div className="flex -mr-2 sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
