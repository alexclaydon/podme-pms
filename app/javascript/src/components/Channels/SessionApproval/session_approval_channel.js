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
    },
    {
      connected() {},
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
    }
  );

  return subscription;
};

export const participantSubscription = ({ roomId, participantDispatch }) => {
  const subscription = consumer.subscriptions.create(
    {
      channel: "SessionApprovalChannel",
      room_id: roomId,
    },
    {
      connected() {},
      received(data) {
        if (!data.error) {
          if (data.permission_granted) {
            participantDispatch({
              type: "SET_PERMISSION",
              payload: { permissionGranted: data.permission_granted },
            });
          }
        } else {
          logger.log(data, "guest received data from error");
        }
      },
      disconnected() {
        logger.log("participant is disconnected");
      },
    }
  );

  return subscription;
};
