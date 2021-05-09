import React from "react";
import {
  isDesktop,
  isTablet,
  withOrientationChange,
} from "react-device-detect";
import { Dropdown } from "@bigbinary/neetoui";
import Info from "./Info";

let Room = props => {
  const { isLandscape } = props;
  const isTabletLandscapeOrUpper = isDesktop || (isTablet && isLandscape);
  return (
    <div className="pms-scrollable__wrapper">
      <div className="container w-full px-4 py-6 mx-auto sm:py-8">
        <div className="flex flex-col items-stretch justify-start">
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-2xl font-bold text-gray-800">Room</h1>
              <p className="text-sm text-gray-600">
                Control meetings and waiting room
              </p>
            </div>
            <div>
              {!isTabletLandscapeOrUpper && (
                <Dropdown
                  label="Control"
                  buttonStyle="secondary"
                  buttonProps={{
                    icon: null,
                  }}
                  closeOnSelect={false}
                  ulProps={{
                    className: "p-4",
                    style: {
                      width: "calc(100vw - 32px)",
                      maxHeight: "70vh",
                    },
                  }}
                  position="bottom-right"
                >
                  <Info />
                </Dropdown>
              )}
            </div>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="flex-grow bg-gray-500 rounded h-144"></div>
            {isTabletLandscapeOrUpper && (
              <div className="ml-10 w-80 xl:w-96">
                <Info />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Room = withOrientationChange(Room);

export default Room;
