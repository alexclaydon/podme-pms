import React, { useState } from "react";
import { Tab, Select } from "@bigbinary/neetoui";
import { isMobileOnly } from "react-device-detect";
import BasicInformation from "./BasicInformation";
import Billing from "./Billing";
import TeamManagement from "./TeamManagement";
import WaitingRoom from "./WaitingRoom";
import PostCallFeedback from "./PostCallFeedback";

const TABS = [
  {
    label: "Basic Information",
    value: "Basic Information",
    component: BasicInformation,
  },
  {
    label: "Billing",
    value: "Billing",
    component: Billing,
  },
  {
    label: "Team Management",
    value: "Team Management",
    component: TeamManagement,
  },
  {
    label: "Waiting Room",
    value: "Waiting Room",
    component: WaitingRoom,
  },
  {
    label: "Post-call Feedback",
    value: "Post-call Feedback",
    component: PostCallFeedback,
  },
];

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].value);

  return (
    <>
      <div className="container w-full px-4 py-6 mx-auto sm:py-8">
        <div className="flex flex-col items-stretch justify-start">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Account Settings
            </h1>
            <p className="text-sm text-gray-600">
              Manage your profile and billing settings
            </p>
          </div>
          {isMobileOnly && (
            <div className="pb-6 border-b border-gray-200">
              <Select
                options={TABS}
                value={TABS.filter(tab => tab.value === currentTab)}
                onChange={selected => setCurrentTab(selected.value)}
              />
            </div>
          )}
          <div className="w-full xl:w-2/3">
            {!isMobileOnly && (
              <Tab className="border-b border-gray-200">
                {TABS.map(({ label, value }, index) => (
                  <Tab.Item
                    key={index}
                    active={currentTab === value}
                    onClick={() => setCurrentTab(value)}
                  >
                    {label}
                  </Tab.Item>
                ))}
              </Tab>
            )}
            <div className="pt-6">
              {TABS.map(({ value, component }, index) => {
                const CurrentTab = component;
                return (
                  <React.Fragment key={index}>
                    {currentTab === value && <CurrentTab />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
