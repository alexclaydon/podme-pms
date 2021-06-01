import React from "react";

import Main from "./components/Main";

import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";
import { JitsiProvider } from "contexts/jitsi";

const App = props => {
  return (
    <AuthProvider>
      <UserProvider>
        <JitsiProvider>
          <Main {...props} />
        </JitsiProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
