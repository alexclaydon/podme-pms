/* eslint-disable prettier/prettier */
const participantReducer = (state, { type, payload }) => {
  switch (type) {
  case "SET_PERMISSION": {
    return {
      ...state,
      ...payload,
    };
  }

  case "PRACTITIONER_LEFT": {
    return {
      ...state,
      ...payload,
    };
  }

  case "PRACTITIONER_JOINED": {
    return {
      ...state,
      ...payload,
    };
  }

  case "SET_PARTICIPANT_NAME": {
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

export default participantReducer;
