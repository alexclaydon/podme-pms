import React from "react";
import { Pane, Input, Select } from "@bigbinary/neetoui";

const MemberPane = ({ memberId, isOpen, onClose }) => {
  return (
    <Pane
      title={memberId ? "Edit team member" : "Create a new team member"}
      isOpen={isOpen}
      onClose={onClose}
      showFooter
      submitButtonProps={{
        label: "Save changes",
      }}
    >
      <form className="px-6 space-y-6">
        <Input label="Name" placeholder="Jane Doe" />
        <Input label="Email" placeholder="jane@example.com" />
        <Select label="User role" placeholder="Select" />
      </form>
    </Pane>
  );
};

export default MemberPane;
