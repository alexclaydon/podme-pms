import React from "react";
import { Button } from "@bigbinary/neetoui";

const Billing = () => {
  return (
    <div className="flex flex-col items-center justify-start px-3 py-5 rounded sm:p-5 sm:flex-row sm:justify-between bg-gray-50">
      <div className="flex flex-row items-center justify-start w-full mb-6 sm:mb-0 sm:w-auto">
        <div className="px-2 py-1 text-sm font-medium text-white bg-blue-700 rounded">
          $5<span className="font-normal opacity-75">/mo</span>
        </div>
        <div className="flex flex-col items-start justify-center flex-grow ml-4">
          <h4 className="text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
            You’re on Monthly plan
          </h4>
          <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
            <span>Charged $5 on 12th of every month</span>
            <br className="sm:hidden" />
            <span className="hidden mx-1 sm:inline-block">•</span>
            <span>Last charged on 22 Aug 2017</span>
          </p>
        </div>
      </div>
      <Button style="secondary" label="Open Stripe Portal" />
    </div>
  );
};

export default Billing;
