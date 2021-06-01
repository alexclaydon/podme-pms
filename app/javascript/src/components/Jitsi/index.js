export const jitsiInit = ({ jitsiToken, roomName }) => {
  const domain = "8x8.vc";

  const options = {
    roomName: roomName,
    parentNode: document.querySelector("#meet"),
    jwt: jitsiToken,
    configOverwrite: {
      prejoinPageEnabled: false,
      // startWithAudioMuted: true,
      // startWithVideoMuted: true,
    },
    // onload: handleJitsiIframeLoad,
  };
  return new window.JitsiMeetExternalAPI(domain, options);
};

export const handleParticipantJoined = (participant, jitsiDispatch) => {
  jitsiDispatch({
    type: "ADD_PARTICIPANT",
    payload: { ...participant, timestamp: new Date() },
  });
};

export const handleParticipantLeft = (participant, jitsiDispatch) => {
  jitsiDispatch({
    type: "REMOVE_PARTICIPANT",
    payload: { ...participant },
  });
};

export const handleWaitingParticipantJoined = (participant, jitsiDispatch) => {
  jitsiDispatch({
    type: "ADD_WAITING_PARTICIPANT",
    payload: {
      ...participant,
      timestamp: new Date(),
    },
  });
};

export const handleWaitingParticipantLeft = (participant, jitsiDispatch) => {
  jitsiDispatch({
    type: "REMOVE_WAITING_PARTICIPANT",
    payload: {
      ...participant,
    },
  });
};
