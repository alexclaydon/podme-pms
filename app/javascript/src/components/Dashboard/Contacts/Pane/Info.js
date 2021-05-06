import React from "react";
import { Button, Switch } from "@bigbinary/neetoui";
import { PANE_STATES } from "../constants";

const InfoBlock = ({ label, value = "--" }) => (
  <div className="flex flex-col items-start justify-center">
    <h6 className="mb-1 text-sm font-medium text-gray-500">{label}</h6>
    <p className="text-sm text-gray-800">{value}</p>
  </div>
);

const Info = ({ onClose, setPaneState }) => {
  return (
    <div className="h-screen p-6 space-y-6 overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-gray-800">Jane Cooper</h1>
          <p className="text-sm text-gray-600">jane.cooper@example.com</p>
        </div>
        <Button style="icon" icon="ri-close-line text-3xl" onClick={onClose} />
      </div>
      <div className="flex flex-row items-center justify-start space-x-3">
        <Button size="large" label="Email Contact" className="sm:px-8" />
        <Button
          size="large"
          style="secondary"
          label="Send call link"
          icon="ri-arrow-down-s-line"
          iconPosition="right"
        />
        <Button
          style="icon"
          className="border-gray-300 shadow-sm nui-btn--icon_bordered w-9 h-9"
          icon="ri-edit-fill"
          onClick={() => setPaneState(PANE_STATES.edit)}
        />
      </div>
      <InfoBlock label="Phone" value="841-826-2953" />
      <InfoBlock label="Address" value="923 Percival County, Melbourne" />
      <InfoBlock label="Added on" value="May 30 2020" />
      <InfoBlock label="Last call on" value="Jun 29 2020" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center pr-2">
          <h4 className="mb-1 text-base font-medium text-gray-800">
            Active Contact
          </h4>
          <p className="text-sm text-gray-600">
            Inactive contacts are moved to the archived list.
          </p>
        </div>
        <Switch name="contact" />
      </div>
    </div>
  );
};

export default Info;
