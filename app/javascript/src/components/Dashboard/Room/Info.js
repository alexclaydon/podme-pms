import React from "react";
import { Badge } from "@bigbinary/neetoui";
import { useJitsiState } from "contexts/jitsi";
import { formatJoinTime } from "./helpers";

const ContactBlock = ({
  name,
  timestamp,
  isWaitingRoom = false,
  participantId,
  jitsiApi,
  consumer,
}) => {
  const buttonClass =
    "inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50";

  const handleAdmitParticipant = id => {
    consumer.admit_participant(id);
  };

  const handleRemoveParticipant = id => {
    jitsiApi.executeCommand("kickParticipant", id);
  };

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
          <button
            className={buttonClass}
            onClick={() =>
              isWaitingRoom
                ? handleAdmitParticipant(participantId)
                : handleRemoveParticipant(participantId)
            }
          >
            {isWaitingRoom ? "Admit" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ jitsiApi, consumer }) => {
  const { participantsInfo, waitingParticipantsInfo } = useJitsiState();
  return (
    <div className="w-full">
      <div className="mb-8">
        <h4 className="mb-4 text-sm font-medium text-gray-800">
          Currently in the meeting
        </h4>
        <div className="px-4 border border-gray-200 rounded">
          <div className="divide-y divide-gray-200">
            {participantsInfo.map((participant, index) => {
              const {
                displayName,
                timestamp,
                formattedDisplayName,
                id,
              } = participant;
              if (formattedDisplayName.includes(" (me)")) return;
              return (
                <ContactBlock
                  key={index}
                  name={displayName}
                  timestamp={formatJoinTime(timestamp)}
                  participantId={id}
                  jitsiApi={jitsiApi}
                  consumer={consumer}
                />
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
            <span>{waitingParticipantsInfo.length} Person waiting</span>
          </Badge>
        </div>
        <div className="px-4 border border-gray-200 rounded">
          <ul className="divide-y divide-gray-200">
            {consumer &&
              waitingParticipantsInfo.map((participant, index) => {
                const {
                  participant_name,
                  participant_room,
                  timestamp,
                } = participant;
                return (
                  <ContactBlock
                    key={index}
                    name={participant_name}
                    timestamp={formatJoinTime(timestamp)}
                    participantId={participant_room}
                    jitsiApi={jitsiApi}
                    consumer={consumer}
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
