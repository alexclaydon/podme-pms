/* eslint-disable prettier/prettier */
const participantReducer = (state, { type, payload }) => {
  switch (type) {
  case "SET_PERMISSION": {
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
