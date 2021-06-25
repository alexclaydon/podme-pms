import React from "react";
import ThankyouImage from "images/eui/thankyou.svg";
// import { EUI_STATES } from "./constants";
// import { Button } from "@bigbinary/neetoui";

const Thankyou = () => {
  return (
    <div className="container z-10 px-6 m-auto fadeIn">
      <div className="py-8 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col">
            <img
              src={ThankyouImage}
              className="w-4/5 h-auto max-w-sm mx-auto"
            />
            <h1 className="mb-2 text-2xl font-extrabold text-center text-gray-900 sm:mb-4 sm:text-3xl xl:text-4xl">
              The session has ended.
            </h1>
            {/* <p className="text-base leading-relaxed text-center text-gray-600 xl:text-lg sm:text-left">
              Thank you for attending a video-saas.com conference call with
              Oliver Smith. Could you kindly take a few moments to respond to
              the following treatment-related survey.
            </p> */}
          </div>
        </div>
      </div>
      <div className="py-10 mx-auto max-w-7xl">
        {/* <div className="relative w-full h-144">
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            height="100%"
            src="https://goutham450731.typeform.com/to/sOUO5ykL?typeform-embed=popup&amp;embed-opacity=100&amp;typeform-embed-id=f6p7x"
            width="100%"
            data-qa="iframe"
          />
        </div> */}
        {/* <div className="max-w-sm mx-auto mt-8">
          <Button
            label="Submit feedback"
            onClick={() => setCurrentState(EUI_STATES.SIGNIN.label)}
            fullWidth
          />
        </div> */}
      </div>
    </div>
  );
};

export default Thankyou;
