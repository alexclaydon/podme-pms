import React from "react";
import PropTypes from "prop-types";

import jitsiReducer from "reducers/jitsi";

const JitsiStateContext = React.createContext();
const JitsiDispatchContext = React.createContext();
const initialState = {
  jitsiToken: null,
  roomName: null,
  participantsInfo: [],
  waitingParticipantsInfo: [],
  isIframeLoading: false,
  isSessionStarted: false,
};

const JitsiProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(jitsiReducer, initialState);

  return (
    <JitsiStateContext.Provider value={state}>
      <JitsiDispatchContext.Provider value={dispatch}>
        {children}
      </JitsiDispatchContext.Provider>
    </JitsiStateContext.Provider>
  );
};

const useJitsiState = () => {
  const context = React.useContext(JitsiStateContext);
  if (context === undefined) {
    throw new Error("useJitsiState must be used within a JitsiProvider");
  }
  return context;
};

const useJitsiDispatch = () => {
  const context = React.useContext(JitsiDispatchContext);
  if (context === undefined) {
    throw new Error("useJitsiDispatch must be used within a JitsiProvider");
  }
  return context;
};

const useJitsi = () => {
  return [useJitsiState(), useJitsiDispatch()];
};

JitsiProvider.propTypes = {
  children: PropTypes.node,
};

export { JitsiProvider, useJitsiState, useJitsiDispatch, useJitsi };
