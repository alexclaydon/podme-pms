import React from "react";
import classnames from "classnames";
import { Button } from "@bigbinary/neetoui";

const Table = ({ contacts, showContactInfo }) => {
  return (
    <div className="pms-contacts__wrapper">
      <div className="relative overflow-hidden border-b border-gray-200 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => {
              const { name, email, phone, address } = contact;
              return (
                <tr
                  key={index}
                  className={classnames("cursor-pointer hover:bg-gray-100", {
                    "bg-white": index % 2 === 0,
                    "bg-gray-50": index % 2 !== 0,
                  })}
                  onClick={() => showContactInfo(index + 1)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {address}
                  </td>
                </tr>
              );
            })}
            {contacts.map((contact, index) => {
              const { name, email, phone, address } = contact;
              return (
                <tr
                  key={index}
                  className={classnames({
                    "bg-white": index % 2 === 0,
                    "bg-gray-50": index % 2 !== 0,
                  })}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {address}
                  </td>
                </tr>
              );
            })}
            {contacts.map((contact, index) => {
              const { name, email, phone, address } = contact;
              return (
                <tr
                  key={index}
                  className={classnames({
                    "bg-white": index % 2 === 0,
                    "bg-gray-50": index % 2 !== 0,
                  })}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {address}
                  </td>
                </tr>
              );
            })}
            {contacts.map((contact, index) => {
              const { name, email, phone, address } = contact;
              return (
                <tr
                  key={index}
                  className={classnames({
                    "bg-white": index % 2 === 0,
                    "bg-gray-50": index % 2 !== 0,
                  })}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {address}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex flex-row items-center justify-between px-6 py-3 bg-white border-t border-gray-200"
          aria-label="Pagination"
        >
          <p className="text-sm text-gray-700">
            Showing&nbsp;
            <span className="font-medium">1</span>
            &nbsp;to&nbsp;
            <span className="font-medium">10</span>
            &nbsp;of&nbsp;
            <span className="font-medium">20</span>
            &nbsp;results
          </p>
          <div className="flex justify-end flex-1 space-x-3">
            <Button style="secondary" label="Previous" />
            <Button style="secondary" label="Next" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Table;
