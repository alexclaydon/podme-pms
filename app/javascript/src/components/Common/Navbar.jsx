import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Dropdown, Toastr, Button } from "@bigbinary/neetoui";
import { withRouter } from "react-router-dom";
import { isMobileOnly, isDesktop } from "react-device-detect";
import { useAuthDispatch } from "contexts/auth";
import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import classnames from "classnames";
import { useUserState } from "contexts/user";

const Tabs = () => {
  const navlinkClasses =
    "px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white hover:no-underline transition-all duration-300 ease-in-out space-x-2 inline-flex flex-row justify-start items-center";

  return (
    <>
      {/* <NavLink
        to="/contacts"
        activeClassName="bg-gray-800"
        className={navlinkClasses}
      >
        <i className="text-gray-200 ri-user-star-fill"></i>
        <span>Contacts</span>
      </NavLink> */}
      <NavLink
        to="/room"
        activeClassName="bg-gray-800"
        className={navlinkClasses}
      >
        <i className="text-gray-200 ri-door-open-fill"></i>
        <span>Room</span>
      </NavLink>
      <NavLink
        to="/settings"
        activeClassName="bg-gray-800"
        className={navlinkClasses}
      >
        <i className="text-gray-200 ri-settings-3-fill"></i>
        <span>Account</span>
      </NavLink>
    </>
  );
};

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();
  const fullName = user.first_name + " " + user.last_name;

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

  return (
    <nav
      className={classnames("sticky top-0 left-0 z-10 w-full bg-gray-900", {
        static: isDesktop,
      })}
    >
      <div className="container px-4 mx-auto">
        <div className="grid h-16 grid-cols-12 gap-2">
          {isMobileOnly && (
            <div className="flex flex-row items-center justify-start col-span-3">
              <Button
                style="icon"
                icon={showMobileMenu ? "ri-close-line" : "ri-menu-line"}
                className="text-2xl"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            </div>
          )}
          <div
            className={classnames(
              "flex flex-row items-center justify-start flex-shrink-0 col-span-3",
              {
                "col-span-6 justify-center": isMobileOnly,
              }
            )}
          >
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
          {!isMobileOnly && (
            <div className="flex flex-row items-center justify-center col-span-6 space-x-2">
              <Tabs />
            </div>
          )}
          <div className="flex flex-row items-center justify-end col-span-3">
            <Dropdown
              customTarget={() => (
                <div className="flex flex-row items-center justify-end cursor-pointer">
                  {isDesktop && (
                    <p className="mr-3 text-sm font-medium text-gray-50">
                      {fullName}
                    </p>
                  )}
                  <Avatar size={32} contact={{ fullName }} />
                  {!isMobileOnly && (
                    <i className="ml-1 text-gray-400 ri-arrow-down-s-line"></i>
                  )}
                </div>
              )}
              position="bottom-right"
            >
              {/* <li>Profile Settings</li> */}
              <li
                onClick={() => handleLogout()}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </li>
            </Dropdown>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div
          className="flex flex-row items-center justify-center px-2 pt-2 pb-3 space-x-2"
          id="mobile-menu"
        >
          <Tabs />
        </div>
      )}
    </nav>
  );
};

export default withRouter(NavBar);
