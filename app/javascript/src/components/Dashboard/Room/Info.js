import React from "react";
import { Badge } from "@bigbinary/neetoui";
import { ROOM_DATA, CONTACT_ROOM_STATUSES } from "./constants";

const ContactBlock = ({ name, timestamp, isWaitingRoom = false }) => {
  const buttonClass =
    "inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50";

  return (
    <div className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">
            {`${isWaitingRoom ? "Waiting Since" : "Joined at"} ${timestamp}`}
          </p>
        </div>
        <div>
          <button className={buttonClass}>
            {isWaitingRoom ? "Admit" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h4 className="mb-4 text-sm font-medium text-gray-800">
          Currently in the meeting
        </h4>
        <div className="px-4 border border-gray-200 rounded">
          <div className="divide-y divide-gray-200">
            {ROOM_DATA.filter(
              data => data.status === CONTACT_ROOM_STATUSES.joined
            ).map((contact, index) => {
              const { name, timestamp } = contact;
              return (
                <ContactBlock key={index} name={name} timestamp={timestamp} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-800">
            In the waiting room
          </h4>
          <Badge color="green">
            <span className="inline-block w-1.5 h-1.5 mr-2 bg-green-400 rounded-full"></span>
            <span>1 Person waiting</span>
          </Badge>
        </div>
        <div className="px-4 border border-gray-200 rounded">
          <ul className="divide-y divide-gray-200">
            {ROOM_DATA.filter(
              data => data.status === CONTACT_ROOM_STATUSES.waiting
            ).map((contact, index) => {
              const { name, timestamp } = contact;
              return (
                <ContactBlock
                  key={index}
                  name={name}
                  timestamp={timestamp}
                  isWaitingRoom
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
