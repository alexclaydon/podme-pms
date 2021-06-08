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
                practitionerStartedSession: false,
              },
            });
          }
          if (data.is_practitioner_online) {
            participantDispatch({
              type: "PRACTITIONER_IS_ONLINE",
              payload: {
                isPractitionerOnline: data.is_practitioner_online,
                askForPermission: true,
              },
            });
          }
          if (data.is_session_started) {
            participantDispatch({
              type: "PRACTITIONER_STARTED_SESSION",
              payload: {
                practitionerStartedSession: data.is_session_started,
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
