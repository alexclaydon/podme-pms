import React, { useState } from "react";
import { Pane } from "@bigbinary/neetoui";
import Info from "./Info";
import Form from "./Form";
import { PANE_STATES } from "../constants";

const ContactsPane = props => {
  const { contactId, isOpen, onClose } = props;
  const [paneState, setPaneState] = useState(
    contactId ? PANE_STATES.info : PANE_STATES.edit
  );

  return (
    <Pane
      title={
        paneState === PANE_STATES.edit
          ? contactId
            ? "Edit Contact"
            : "New Contact"
          : null
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {paneState === PANE_STATES.edit ? (
        <Form {...props} setPaneState={setPaneState} />
      ) : (
        <Info {...props} setPaneState={setPaneState} />
      )}
    </Pane>
  );
};

export default ContactsPane;
