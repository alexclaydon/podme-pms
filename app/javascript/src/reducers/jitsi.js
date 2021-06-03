/* eslint-disable prettier/prettier */
const jitsiReducer = (state, { type, payload }) => {
  switch (type) {
  case "SET_TOKEN_AND_ROOM_NAME": {
    return {
      ...state,
      ...payload,
    };
  }
  case "ADD_PARTICIPANT": {
    return {
      ...state,
      participantsInfo: [...state.participantsInfo, payload],
    };
  }

  case "REMOVE_PARTICIPANT": {
    return {
      ...state,
      participantsInfo: state.participantsInfo.filter(
        participant => participant.id !== payload.id
      ),
    };
  }

  case "ADD_WAITING_PARTICIPANT": {
    return {
      ...state,
      waitingParticipantsInfo: [...state.waitingParticipantsInfo, payload],
    };
  }

  case "REMOVE_WAITING_PARTICIPANT": {
    return {
      ...state,
      waitingParticipantsInfo: state.waitingParticipantsInfo.filter(
        participant =>
          participant.participant_room !== payload.participant_room
      ),
    };
  }

  case "LOAD_IFRAME": {
    return {
      ...state,
      ...payload,
    };
  }

  case "SESSION_STARTED": {
    return {
      ...state,
      ...payload,
    };
  }

  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default jitsiReducer;
