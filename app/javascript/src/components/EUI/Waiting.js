import React, { useEffect } from "react";
import WelcomeImage from "images/eui/waiting.svg";
import { isMobileOnly } from "react-device-detect";
import { EUI_STATES } from "./constants";
import {
  useParticipantDispatch,
  useParticipantState,
} from "contexts/participant";
import { conferenceStateSubscription } from "components/Channels/SessionApproval/conference_state_channel";
import { useParams } from "react-router-dom";
import { useJitsiDispatch } from "contexts/jitsi";
import { uuid } from "components/Dashboard/Room/helpers";
import jitsiTokenApi from "apis/jitsiToken";
import { participantSubscription } from "components/Channels/SessionApproval/session_approval_channel";
import classNames from "classnames";
import LogoSVG from "components/Common/LogoSVG";

const randomId = uuid();

const Waiting = ({ setCurrentState }) => {
  const { permissionGranted } = useParticipantState();
  const { room } = useParams();
  const participantDispatch = useParticipantDispatch();
  const jitsiDispatch = useJitsiDispatch();
  const {
    isPractitionerOnline,
    participantName,
    timestamp,
    practitionerStartedSession,
    askForPermission,
  } = useParticipantState();
  const participantId = participantName + randomId;

  useEffect(() => {
    participantSubscription({
      roomId: participantId,
      participantDispatch,
      practitionerRoomName: room,
    });
    conferenceStateSubscription({
      practitionerRoomName: room,
      participantDispatch,
      participantId,
    });
    getToken(participantId);
  }, []);

  useEffect(() => {
    if (isPractitionerOnline && askForPermission) {
      getToken(participantId);
    }
  }, [isPractitionerOnline, askForPermission]);

  useEffect(() => {
    if (permissionGranted) {
      setCurrentState(EUI_STATES.ADMITTED.label);
    }
  }, [permissionGranted]);

  const getToken = async participantId => {
    try {
      const response = await jitsiTokenApi.create({
        token: {
          name: participantName,
          id: participantId,
          room_name: room,
          timestamp,
        },
      });
      jitsiDispatch({
        type: "SET_TOKEN_AND_ROOM_NAME",
        payload: {
          jitsiToken: response.data.token,
          roomName: response.data.room,
        },
      });
      participantDispatch({
        type: "ASK_FOR_PERMISSION",
        payload: { askForPermission: false },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const isPractitionerOnlineAndStartedSession =
    isPractitionerOnline && practitionerStartedSession;

  let waitingTextClass = classNames({
    "text-base leading-relaxed text-center text-gray-600 xl:text-lg sm:text-left": true,
    "text-red-400": isPractitionerOnlineAndStartedSession,
  });

  return (
    <div className="w-full h-full px-6 py-12 sm:pb-0 fadeIn">
      <div className="flex flex-col items-center justify-center h-full max-w-5xl m-auto">
        <div className="flex flex-row items-center justify-center space-x-6 sm:justify-start">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-4xl">
            Welcome to
          </h1>
          <LogoSVG />
        </div>
        <div className="grid items-center self-center grid-cols-12 m-auto sm:gap-8">
          {!isMobileOnly && (
            <div className="col-span-4">
              <img src={WelcomeImage} className="w-full h-auto" />
            </div>
          )}
          <div className="col-span-12 sm:col-span-8">
            <h2 className="mb-2 text-lg font-bold text-center text-gray-800 sm:text-xl xl:text-2xl sm:text-left">
              You are currently in the waiting room.
            </h2>
            {isMobileOnly && (
              <img src={WelcomeImage} className="w-4/5 h-auto mx-auto" />
            )}
            <p className={waitingTextClass}>
              {isPractitionerOnlineAndStartedSession
                ? "Practitioner started the session. Asking for Permission."
                : "When your practitioner becomes available, the session will automatically commence."}
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      {/* <div className="max-w-4xl py-8 mx-auto sm:py-10">
        <p className="text-base leading-loose text-gray-700 xl:text-lg">
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam.
          Laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis
          unde omnis iste natus error sit voluptatem.
          <br />
          <br />
          Ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat. Temporibus autem quibusdam
          et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
          voluptates repudiandae sint et molestiae non recusandae.
          <br />
          <br />
          Quia consequuntur magni dolores eos qui ratione voluptatem sequi
          nesciunt. Cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia. Et harum quidem rerum facilis est et
          expedita distinctio. Totam rem aperiam. Non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          <br />
          <br />
          Architecto beatae vitae dicta sunt explicabo. Animi, id est laborum et
          dolorum fuga.
        </p>
      </div> */}
    </div>
  );
};

export default Waiting;
