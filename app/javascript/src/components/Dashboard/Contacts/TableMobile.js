import React from "react";
import { Avatar } from "@bigbinary/neetoui";

const TableMobile = ({ contacts, showContactInfo }) => {
  return (
    <div className="overflow-hidden border border-gray-200 rounded">
      {contacts.map((contact, index) => {
        const { name, email, image } = contact;
        return (
          <div
            key={index}
            onClick={() => showContactInfo(index + 1)}
            className="flex flex-row items-center justify-start px-6 py-4 space-x-4 border-b border-gray-200 last:border-b-0 focus:bg-gray-100"
          >
            <Avatar size={40} contact={{ name, profile_image_path: image }} />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-sm text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        );
      })}
      {contacts.map((contact, index) => {
        const { name, email, image } = contact;
        return (
          <div
            key={index}
            onClick={() => showContactInfo(index + 1)}
            className="flex flex-row items-center justify-start px-6 py-4 space-x-4 border-b border-gray-200 last:border-b-0 focus:bg-gray-100"
          >
            <Avatar size={40} contact={{ name, profile_image_path: image }} />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-sm text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        );
      })}
      {contacts.map((contact, index) => {
        const { name, email, image } = contact;
        return (
          <div
            key={index}
            onClick={() => showContactInfo(index + 1)}
            className="flex flex-row items-center justify-start px-6 py-4 space-x-4 border-b border-gray-200 last:border-b-0 focus:bg-gray-100"
          >
            <Avatar size={40} contact={{ name, profile_image_path: image }} />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-sm text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        );
      })}
      {contacts.map((contact, index) => {
        const { name, email, image } = contact;
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-start px-6 py-4 space-x-4 border-b border-gray-200 last:border-b-0"
          >
            <Avatar size={40} contact={{ name, profile_image_path: image }} />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-sm text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableMobile;
