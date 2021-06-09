import { Toastr } from "@bigbinary/neetoui";

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
      disableInviteFunctions: false,
      // brandingRoomAlias: "roomName",
      notifications,
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
  Toastr.success(`${participant.participant_name} has joined waiting room`);
};

export const handleWaitingParticipantLeft = (participant, jitsiDispatch) => {
  jitsiDispatch({
    type: "REMOVE_WAITING_PARTICIPANT",
    payload: {
      ...participant,
    },
  });
};

const notifications = [
  "connection.CONNFAIL", // shown when the connection fails,
  // "dialog.cameraNotSendingData", // shown when there's no feed from user's camera
  // "dialog.kickTitle", // shown when user has been kicked
  "dialog.liveStreaming", // livestreaming notifications (pending, on, off, limits)
  "dialog.lockTitle", // shown when setting conference password fails
  "dialog.maxUsersLimitReached", // shown when maximmum users limit has been reached
  "dialog.micNotSendingData", // shown when user's mic is not sending any audio
  "dialog.passwordNotSupportedTitle", // shown when setting conference password fails due to password format
  "dialog.recording", // recording notifications (pending, on, off, limits)
  "dialog.remoteControlTitle", // remote control notifications (allowed, denied, start, stop, error)
  "dialog.reservationError",
  "dialog.serviceUnavailable", // shown when server is not reachable
  "dialog.sessTerminated", // shown when there is a failed conference session
  "dialog.sessionRestarted", // show when a client reload is initiated because of bridge migration
  "dialog.tokenAuthFailed", // show when an invalid jwt is used
  "dialog.transcribing", // transcribing notifications (pending, off)
  "dialOut.statusMessage", // shown when dial out status is updated.
  "liveStreaming.busy", // shown when livestreaming service is busy
  "liveStreaming.failedToStart", // shown when livestreaming fails to start
  "liveStreaming.unavailableTitle", // shown when livestreaming service is not reachable
  "lobby.joinRejectedMessage", // shown when while in a lobby, user's request to join is rejected
  "lobby.notificationTitle", // shown when lobby is toggled and when join requests are allowed / denied
  "localRecording.localRecording", // shown when a local recording is started
  "notify.disconnected", // shown when a participant has left
  "notify.grantedTo", // shown when moderator rights were granted to a participant
  "notify.invitedOneMember", // shown when 1 participant has been invited
  "notify.invitedThreePlusMembers", // shown when 3+ participants have been invited
  "notify.invitedTwoMembers", // shown when 2 participants have been invited
  "notify.kickParticipant", // shown when a participant is kicked
  "notify.mutedRemotelyTitle", // shown when user is muted by a remote party
  "notify.mutedTitle", // shown when user has been muted upon joining,
  "notify.newDeviceAudioTitle", // prompts the user to use a newly detected audio device
  "notify.newDeviceCameraTitle", // prompts the user to use a newly detected camera
  "notify.passwordRemovedRemotely", // shown when a password has been removed remotely
  "notify.passwordSetRemotely", // shown when a password has been set remotely
  "notify.raisedHand", // shown when a partcipant used raise hand,
  "notify.startSilentTitle", // shown when user joined with no audio
  "prejoin.errorDialOut",
  "prejoin.errorDialOutDisconnected",
  "prejoin.errorDialOutFailed",
  "prejoin.errorDialOutStatus",
  "prejoin.errorStatusCode",
  "prejoin.errorValidation",
  "recording.busy", // shown when recording service is busy
  "recording.failedToStart", // shown when recording fails to start
  "recording.unavailableTitle", // shown when recording service is not reachable
  "toolbar.noAudioSignalTitle", // shown when a broken mic is detected
  "toolbar.noisyAudioInputTitle", // shown when noise is detected for the current microphone
  "toolbar.talkWhileMutedPopup", // shown when user tries to speak while muted
  "transcribing.failedToStart", // shown when transcribing fails to start
];
