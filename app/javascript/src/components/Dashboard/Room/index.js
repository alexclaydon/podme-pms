import React, { useEffect } from "react";
import {
  isDesktop,
  isTablet,
  withOrientationChange,
} from "react-device-detect";
import { Dropdown, Button, PageLoader } from "@bigbinary/neetoui";
import Info from "./Info";
import jitsiTokenApi from "apis/jitsiToken";
import {
  handleParticipantJoined,
  handleParticipantLeft,
  jitsiInit,
} from "components/Jitsi";
import { useUserState } from "contexts/user";
import { useJitsiDispatch, useJitsiState } from "contexts/jitsi";
import { practitionerSubscription } from "components/Channels/SessionApproval/session_approval_channel";
let api;
let consumer;
let Room = props => {
  const { isLandscape } = props;
  const isTabletLandscapeOrUpper = isDesktop || (isTablet && isLandscape);
  const { user } = useUserState();
  const {
    jitsiToken,
    roomName,
    isIframeLoading,
    isSessionStarted,
  } = useJitsiState();
  const jitsiDispatch = useJitsiDispatch();

  useEffect(() => {
    if (user) {
      consumer = practitionerSubscription({
        roomName: user.room_name,
        jitsiDispatch,
      });
      getToken();
    }
  }, [user]);

  useEffect(() => {
    if (jitsiToken && isSessionStarted) {
      jitsiDispatch({
        type: "LOAD_IFRAME",
        payload: { isIframeLoading: true },
      });
      api = jitsiInit({ jitsiToken, roomName, jitsiDispatch });
      api.addEventListener("participantJoined", participant =>
        handleParticipantJoined(participant, jitsiDispatch)
      );
      api.addEventListener("participantLeft", participant =>
        handleParticipantLeft(participant, jitsiDispatch)
      );
      api.addEventListener("videoConferenceLeft", () => {
        api.dispose();
        jitsiDispatch({
          type: "SESSION_STARTED",
          payload: { isSessionStarted: false },
        });
      });
    }
    return () => api && api.dispose();
  }, [jitsiToken, isSessionStarted]);

  const getToken = async () => {
    try {
      const response = await jitsiTokenApi.create({
        token: { email: user.email },
      });
      jitsiDispatch({
        type: "SET_TOKEN_AND_ROOM_NAME",
        payload: {
          jitsiToken: response.data.token,
          roomName: response.data.room,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleStartSession = () => {
    jitsiDispatch({
      type: "SESSION_STARTED",
      payload: { isSessionStarted: true },
    });
  };

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
                  label="Guests"
                  buttonStyle="secondary"
                  buttonProps={{
                    icon: null,
                  }}
                  closeOnSelect={false}
                  ulProps={{
                    className: "p-4",
                    style: {
                      width: "calc(min(calc(100vw - 32px), 420px))",
                      maxHeight: "70vh",
                    },
                  }}
                  position="bottom-right"
                >
                  <Info jitsiApi={api} consumer={consumer} />
                </Dropdown>
              )}
            </div>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div
              className="flex-grow rounded h-144 flex items-center justify-center flex-col"
              id="meet"
            >
              {isIframeLoading && <PageLoader />}
              {!isSessionStarted && (
                <Button
                  type="primary"
                  onClick={handleStartSession}
                  label={"Start Session"}
                  size="large"
                />
              )}
            </div>
            {isTabletLandscapeOrUpper && (
              <div className="ml-10 w-80 xl:w-96">
                <Info jitsiApi={api} consumer={consumer} />
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
