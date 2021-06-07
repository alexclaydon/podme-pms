import consumer from "../consumer";

export const conferenceStateSubscription = ({
  practitionerRoomName,
  participantDispatch,
}) => {
  const subscription = consumer.subscriptions.create(
    {
      channel: "ConferenceStateChannel",
      room_id: practitionerRoomName,
    },
    {
      connected() {},
      received(data) {
        if (!data.error) {
          if (
            data.practitioner_left &&
            data.practitioner_room_name === practitionerRoomName
          ) {
            participantDispatch({
              type: "PRACTITIONER_LEFT",
              payload: {
                practitionerLeft: data.practitioner_left,
                practitionerJoined: false,
              },
            });
          }
          if (data.practitioner_joined) {
            participantDispatch({
              type: "PRACTITIONER_JOINED",
              payload: {
                practitionerJoined: data.practitioner_joined,
                practitionerLeft: false,
              },
            });
          }
        } else {
          logger.log(data, "participant received data from error");
        }
      },
      disconnected() {
        logger.log("participant is disconnected");
      },
    }
  );

  return subscription;
};
