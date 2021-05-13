import React, { useState } from "react";
import Footer from "./Footer";
import { isMobileOnly } from "react-device-detect";
import { EUI_STATES } from "./constants";

const EUI = () => {
  const [currentState, setCurrentState] = useState(EUI_STATES.SIGNIN.label);
  return (
    <div className="relative flex flex-row items-center justify-center w-screen h-screen overflow-y-auto sm:p-8 sm:pb-18">
      {Object.keys(EUI_STATES).map((key, index) => {
        const { label, component } = EUI_STATES[key];
        const Component = component;
        return (
          <React.Fragment key={index}>
            {currentState === label && (
              <Component setCurrentState={setCurrentState} />
            )}
          </React.Fragment>
        );
      })}
      {!isMobileOnly && <Footer />}
    </div>
  );
};

export default EUI;
