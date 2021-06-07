export const jitsiInit = ({ jitsiToken, roomName, jitsiDispatch }) => {
  const domain = "8x8.vc";

  const options = {
    roomName: roomName,
    parentNode: document.querySelector("#meet"),
    jwt: jitsiToken,
    configOverwrite: {
      prejoinPageEnabled: false,
      startWithAudioMuted: false,
      startWithVideoMuted: false,
      // brandingRoomAlias: "roomName",
    },
    onload: () => handleJitsiIframeLoad(jitsiDispatch),
  };
  return new window.JitsiMeetExternalAPI(domain, options);
};

const handleJitsiIframeLoad = jitsiDispatch => {
  jitsiDispatch({
    type: "LOAD_IFRAME",
    payload: { isIframeLoading: false },
  });
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
