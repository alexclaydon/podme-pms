/* eslint-disable prettier/prettier */

const userReducer = (state, { type, payload }) => {
  switch (type) {
  case "SET_USER": {
    return {
      user: payload.user,
    };
  }

  case "UPDATE_USER": {
    return {
      user: payload.user,
    };
  }

  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default userReducer;
