import React, { useEffect, useState } from "react";
import { Button, Alert } from "@bigbinary/neetoui";
import { EUI_STATES, practitionerLeftText } from "./constants";
import { jitsiInit } from "components/Jitsi";
import { useJitsiDispatch, useJitsiState } from "contexts/jitsi";
import { conferenceStateSubscription } from "components/Channels/SessionApproval/conference_state_channel";
import { useParams } from "react-router-dom";
import {
  useParticipantDispatch,
  useParticipantState,
} from "contexts/participant";
let api;
const Admitted = ({ setCurrentState }) => {
  const [practitionerLeftAlert, setPractitionerLeftAlert] = useState(false);
  const { jitsiToken, roomName } = useJitsiState();
  const { room } = useParams();
  const participantDispatch = useParticipantDispatch();
  const jitsiDispatch = useJitsiDispatch();
  const { practitionerLeft } = useParticipantState();

  useEffect(() => {
    if (jitsiToken) {
      api = jitsiInit({ jitsiToken, roomName, jitsiDispatch });
      conferenceStateSubscription({
        practitionerRoomName: room,
        participantDispatch,
      });
      api.addEventListener("videoConferenceLeft", () =>
        setCurrentState(EUI_STATES.THANKYOU.label)
      );
    }
    return () => api && api.dispose();
  }, [jitsiToken]);

  useEffect(() => {
    if (practitionerLeft) {
      setPractitionerLeftAlert(true);
      setTimeout(() => setCurrentState(EUI_STATES.THANKYOU.label), 60000);
    }
  }, [practitionerLeft]);

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
