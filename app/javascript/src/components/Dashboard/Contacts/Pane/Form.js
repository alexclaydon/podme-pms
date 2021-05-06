import React from "react";
import { PANE_STATES } from "../constants";
import { Input, Textarea, Button } from "@bigbinary/neetoui";

const Edit = ({ onClose, setPaneState }) => {
  return (
    <div className="px-6 space-y-6 fadeIn">
      <Input label="Name" placeholder="Jane Doe" autoFocus />
      <Input type="email" label="Email" placeholder="jane@example.com" />
      <Input type="tel" label="Phone" placeholder="(463)-570-9165" />
      <Textarea rows={4} label="Address" />
      <div className="space-x-3 nui-pane__footer nui-pane__footer--absolute">
        <Button
          style="secondary"
          size="large"
          label="Cancel"
          onClick={() => setPaneState(PANE_STATES.info)}
        />
        <Button size="large" label="Save Changes" onClick={onClose} />
      </div>
    </div>
  );
};

export default Edit;
