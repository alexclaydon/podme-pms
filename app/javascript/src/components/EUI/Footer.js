import React from "react";
import { Button } from "@bigbinary/neetoui";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-row items-center justify-between py-6 border-t border-gray-200">
          <p className="text-base text-gray-400">© 2020 PODME</p>
          <div className="flex flex-row items-stretch justify-end space-x-3">
            <Button
              style="text"
              label="Privacy Policy"
              className="text-gray-400 hover:text-gray-600"
            />
            <div className="w-px bg-gray-200"></div>
            <Button
              style="text"
              label="Terms of Use"
              className="text-gray-400 hover:text-gray-600"
            />
            <div className="w-px bg-gray-200"></div>
            <Button
              style="text"
              label="Legal"
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
