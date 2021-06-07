import React, { useEffect, useState } from "react";
import { Button, Alert } from "@bigbinary/neetoui";
import { EUI_STATES, practitionerLeftText } from "./constants";
import { jitsiInit } from "components/Jitsi";
import { useJitsiDispatch, useJitsiState } from "contexts/jitsi";
import { useParticipantState } from "contexts/participant";
let api;
let closePageAfter60s;
const Admitted = ({ setCurrentState }) => {
  const [practitionerLeftAlert, setPractitionerLeftAlert] = useState(false);
  const { jitsiToken, roomName } = useJitsiState();
  const jitsiDispatch = useJitsiDispatch();
  const { practitionerLeft, practitionerJoined } = useParticipantState();

  useEffect(() => {
    if (jitsiToken) {
      api = jitsiInit({ jitsiToken, roomName, jitsiDispatch });
      api.addEventListener("videoConferenceLeft", () =>
        setCurrentState(EUI_STATES.THANKYOU.label)
      );
      api.addEventListener("participantKickedOut", participant => {
        if (participant.kicked.local) {
          setCurrentState(EUI_STATES.THANKYOU.label);
        }
      });
    }
    return () => api && api.dispose();
  }, [jitsiToken]);

  useEffect(() => {
    if (practitionerLeft) {
      setPractitionerLeftAlert(true);
      closePageAfter60s = setTimeout(
        () => setCurrentState(EUI_STATES.THANKYOU.label),
        60000
      );
    }
  }, [practitionerLeft]);

  useEffect(() => {
    if (practitionerJoined) {
      setPractitionerLeftAlert(false);
      clearTimeout(closePageAfter60s);
    }
  }, [practitionerJoined]);

  return (
    <div className="w-full max-w-6xl px-6 m-auto fadeIn">
      <div
        className="w-full bg-gray-400 rounded h-144 sm:h-120 xl:h-144"
        id="meet"
      ></div>
      {practitionerLeft && (
        <Alert
          style="info"
          isOpen={practitionerLeftAlert}
          title="Practitioner Left"
          message={practitionerLeftText}
          icon="ri-information-line text-blue-500"
          onClose={() => setPractitionerLeftAlert(false)}
          cancelButtonProps={{
            onClick: () => setPractitionerLeftAlert(false),
          }}
          submitButtonProps={{
            label: "Leave Call",
            onClick: () => {
              setPractitionerLeftAlert(false);
              setCurrentState(EUI_STATES.THANKYOU.label);
            },
          }}
          hideConfirmation={true}
        />
      )}
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
