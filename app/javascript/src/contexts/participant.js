import React from "react";
import PropTypes from "prop-types";

import participantReducer from "reducers/participant";

const ParticipantStateContext = React.createContext();
const ParticipantDispatchContext = React.createContext();
const initialState = {
  permissionGranted: false,
};

const ParticipantProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(participantReducer, initialState);

  return (
    <ParticipantStateContext.Provider value={state}>
      <ParticipantDispatchContext.Provider value={dispatch}>
        {children}
      </ParticipantDispatchContext.Provider>
    </ParticipantStateContext.Provider>
  );
};

const useParticipantState = () => {
  const context = React.useContext(ParticipantStateContext);
  if (context === undefined) {
    throw new Error(
      "useParticipantState must be used within a ParticipantProvider"
    );
  }
  return context;
};

const useParticipantDispatch = () => {
  const context = React.useContext(ParticipantDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useParticipantDispatch must be used within a ParticipantProvider"
    );
  }
  return context;
};

const useParticipant = () => {
  return [useParticipantState(), useParticipantDispatch()];
};

ParticipantProvider.propTypes = {
  children: PropTypes.node,
};

export {
  ParticipantProvider,
  useParticipantState,
  useParticipantDispatch,
  useParticipant,
};
