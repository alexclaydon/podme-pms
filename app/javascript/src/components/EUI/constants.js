import SignIn from "./SignIn";
import Waiting from "./Waiting";
import Admitted from "./Admitted";
import Thankyou from "./Thankyou";

export const EUI_STATES = {
  SIGNIN: {
    label: "Sign In",
    component: SignIn,
  },
  WAITING: {
    label: "Waiting",
    component: Waiting,
  },
  ADMITTED: {
    label: "Admitted",
    component: Admitted,
  },
  THANKYOU: {
    label: "Thankyou",
    component: Thankyou,
  },
};

export const practitionerLeftText =
  "The practitioner has left the session. The session will automatically terminate soon.";
