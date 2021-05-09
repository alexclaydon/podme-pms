import React, { useState } from "react";
import { Button, Tab } from "@bigbinary/neetoui";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import { CONTACTS } from "./constants";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import ContactPane from "./Pane";

const TABS = ["Active", "Archived"];

const Contacts = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const [showPane, setShowPane] = useState(false);
  const [contactId, setContactId] = useState(null);

  const showContactInfo = id => {
    setContactId(id);
    setShowPane(true);
  };

  return (
    <>
      <div className="container w-full px-4 py-6 mx-auto sm:py-8">
        <div className="flex flex-col items-stretch justify-start">
          <div className="flex flex-row items-center justify-between mb-2">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
              <p className="text-sm text-gray-600">
                View and manage your contacts list
              </p>
            </div>
            {isBrowser ? (
              <Button
                label="Add new contact"
                icon="ri-add-circle-line"
                onClick={() => setShowPane(true)}
              />
            ) : (
              <div
                onClick={() => setShowPane(true)}
                className="flex flex-row items-center justify-center w-8 h-8 bg-indigo-600 rounded-full focus:bg:indigo-700"
              >
                <i className="text-lg text-white ri-add-line" />
              </div>
            )}
          </div>
          {isBrowser && (
            <Tab className="border-b border-gray-200">
              {TABS.map((tab, index) => (
                <Tab.Item
                  key={index}
                  active={currentTab === tab}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </Tab.Item>
              ))}
            </Tab>
          )}
          <div className="mt-6">
            <BrowserView>
              <TableDesktop
                contacts={CONTACTS}
                showContactInfo={showContactInfo}
              />
            </BrowserView>
            <MobileView>
              <TableMobile
                contacts={CONTACTS}
                showContactInfo={showContactInfo}
              />
            </MobileView>
          </div>
        </div>
      </div>
      {showPane && (
        <ContactPane
          contactId={contactId}
          isOpen={showPane}
          onClose={() => {
            setShowPane(false);
            setContactId(null);
          }}
        />
      )}
    </>
  );
};

export default Contacts;
