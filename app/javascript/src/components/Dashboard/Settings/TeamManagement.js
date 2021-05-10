import React, { useState } from "react";
import { Button, Badge } from "@bigbinary/neetoui";
import { isMobileOnly } from "react-device-detect";
import { CONTACTS } from "../Contacts/constants";
import MemberPane from "./Pane/Member";

const TeamManagement = () => {
  const [showPane, setShowPane] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const showMemberInfo = id => {
    setMemberId(id);
    setShowPane(true);
  };

  return (
    <>
      <div className="pms-team-management__wrapper">
        {!isMobileOnly ? (
          <Button
            label="Add new member"
            icon="ri-add-circle-line"
            onClick={() => setShowPane(true)}
            className="mb-4"
          />
        ) : (
          <div
            onClick={() => setShowPane(true)}
            className="fixed flex flex-row items-center justify-center w-12 h-12 bg-indigo-600 rounded-full shadow-xl focus:bg:indigo-700 right-4 bottom-4"
          >
            <i className="text-2xl text-white ri-add-line" />
          </div>
        )}
        <div className="w-full overflow-hidden border-b border-gray-200 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Team Member Name
                </th>
                {!isMobileOnly && (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative w-24 px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {CONTACTS.map(({ name, email }, index) => {
                const isActive = index % 2 === 0;
                return (
                  <tr
                    key={index}
                    onClick={() => isMobileOnly && showMemberInfo(index + 1)}
                  >
                    <td className="w-1/2 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {name}
                      </div>
                      <div className="text-sm text-gray-500">{email}</div>
                    </td>
                    {!isMobileOnly && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color={isActive ? "green" : "yellow"}>
                            {isActive ? "Active" : "Invited"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          Admin
                        </td>
                        <td className="w-24 px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Button
                            style="link"
                            label="Edit"
                            className="inline-flex"
                            onClick={() => showMemberInfo(index + 1)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showPane && (
        <MemberPane
          memberId={memberId}
          isOpen={showPane}
          onClose={() => {
            setShowPane(false);
            setMemberId(null);
          }}
        />
      )}
    </>
  );
};

export default TeamManagement;
