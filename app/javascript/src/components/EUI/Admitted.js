import React, { useEffect } from "react";
import { Button } from "@bigbinary/neetoui";
import { EUI_STATES } from "./constants";
import { jitsiInit } from "components/Jitsi";
import { useJitsiState } from "contexts/jitsi";
let api;
const Admitted = ({ setCurrentState }) => {
  const { jitsiToken, roomName } = useJitsiState();

  useEffect(() => {
    if (jitsiToken) {
      api = jitsiInit({ jitsiToken, roomName });
      api.addEventListener("videoConferenceLeft", () =>
        setCurrentState(EUI_STATES.THANKYOU.label)
      );
    }
    return () => api && api.dispose();
  }, [jitsiToken]);
  return (
    <div className="w-full max-w-6xl px-6 m-auto fadeIn">
      <div
        className="w-full bg-gray-400 rounded h-144 sm:h-120 xl:h-144"
        id="meet"
      ></div>
      <div className="max-w-xs mx-auto mt-8">
        <Button
          style="secondary"
          label="End Session"
          onClick={() => setCurrentState(EUI_STATES.THANKYOU.label)}
          fullWidth
        />
      </div>
    </div>
  );
};

export default Admitted;
