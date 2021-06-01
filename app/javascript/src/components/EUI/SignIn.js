import React, { useState } from "react";
import { Input, Button } from "@bigbinary/neetoui";
import { isMobile } from "react-device-detect";
import Pattern from "images/eui/pattern.svg";
import { EUI_STATES } from "./constants";
import jitsiTokenApi from "apis/jitsiToken";
import { useJitsiDispatch } from "contexts/jitsi";
import { participantSubscription } from "components/Channels/SessionApproval/session_approval_channel";
import { uuid } from "components/Dashboard/Room/helpers";
import { useParticipantDispatch } from "contexts/participant";
import { useParams } from "react-router-dom";

const SignIn = ({ setCurrentState }) => {
  const [name, setName] = useState("");
  const jitsiDispatch = useJitsiDispatch();
  const participantDispatch = useParticipantDispatch();
  const { room } = useParams();

  const handleSignIn = e => {
    e.preventDefault();
    if (name) {
      const participantId = name + uuid();
      participantSubscription({ roomId: participantId, participantDispatch });
      getToken(participantId);
    }
  };

  const getToken = async participantId => {
    try {
      const response = await jitsiTokenApi.create({
        token: { name: name, id: participantId, room_name: room },
      });
      jitsiDispatch({
        type: "SET_TOKEN_AND_ROOM_NAME",
        payload: {
          jitsiToken: response.data.token,
          roomName: response.data.room,
        },
      });
      setCurrentState(EUI_STATES.WAITING.label);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="w-full fadeIn">
      {!isMobile && <img src={Pattern} className="fixed z-0 right-8 top-16" />}
      <div className="z-10 max-w-4xl px-6 m-auto">
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-900 sm:text-5xl">
          Oliver’s therapy center
        </h1>
        <p className="text-base leading-relaxed text-center text-gray-600 sm:text-lg">
          Welcome to your video-saas.com video call with Oliver Smith. You are
          currently in the waiting room. When your practitioner becomes
          available, you will automatically be placed into conference. In the
          meantime, please see below content specifically provided for your
          consideration by Oliver Smith.
        </p>
        <div className="max-w-md mx-auto mt-12">
          <form onSubmit={handleSignIn}>
            <Input
              label="Choose the name you wish to use for this session"
              placeholder="John Appleseed"
              className="mb-4"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Button label="Enter waiting room" fullWidth type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
