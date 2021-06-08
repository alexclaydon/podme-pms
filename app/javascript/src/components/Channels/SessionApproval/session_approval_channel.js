import {
  handleWaitingParticipantJoined,
  handleWaitingParticipantLeft,
} from "components/Jitsi";
import consumer from "../consumer";

export const practitionerSubscription = ({ roomName, jitsiDispatch }) => {
  const subscription = consumer.subscriptions.create(
    {
      channel: "SessionApprovalChannel",
      room_id: roomName,
      role: "practitioner",
    },
    {
      connected() {
        this.practitionerIsOnline();
      },
      disconnected() {
        logger.log("practitioner is disconnected");
      },
      received(data) {
        if (!data.error) {
          if (data.participant_room) {
            handleWaitingParticipantJoined(data, jitsiDispatch);
          }
        } else {
          logger.log(data, "data from error");
        }
      },
      admit_participant(participant_room) {
        this.perform("admit_participant", {
          permission_granted: true,
          participant_room: participant_room,
        });
        handleWaitingParticipantLeft({ participant_room }, jitsiDispatch);
      },
      practitionerLeft() {
        this.perform("practitioner_left", {
          practitioner_left: true,
          practitioner_room_name: roomName,
        });
      },
      practitionerIsOnline() {
        this.perform("practitioner_is_online", {
          practitioner_room_name: roomName,
        });
      },
      practitionerStartedSession() {
        this.perform("practitioner_started_session", {
          practitioner_room_name: roomName,
        });
      },
    }
  );

  return subscription;
};

export const participantSubscription = ({
  roomId,
  participantDispatch,
  practitionerRoomName,
}) => {
  const subscription = consumer.subscriptions.create(
    {
      channel: "SessionApprovalChannel",
      room_id: roomId,
      role: "participant",
    },
    {
      connected() {
        this.getSessionState();
      },
      received(data) {
        if (!data.error) {
          if (data.permission_granted) {
            participantDispatch({
              type: "SET_PERMISSION",
              payload: { permissionGranted: data.permission_granted },
            });
          }
          if (data.practitioner_join_status) {
            participantDispatch({
              type: "PRACTITIONER_IS_ONLINE",
              payload: {
                isPractitionerOnline: data.is_practitioner_online,
                practitionerStartedSession: data.is_session_started,
              },
            });
          }
        } else {
          logger.log(data, "participant received data from error");
        }
      },
      getSessionState() {
        this.perform("practitioner_join_status", {
          practitioner_room_name: practitionerRoomName,
        });
      },
      disconnected() {
        logger.log("participant is disconnected");
      },
    }
  );

  return subscription;
};
