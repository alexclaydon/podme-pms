import React, { useEffect } from "react";
import WelcomeImage from "images/eui/waiting.svg";
import { isMobileOnly } from "react-device-detect";
import { EUI_STATES } from "./constants";

const Waiting = ({ setCurrentState }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentState(EUI_STATES.ADMITTED.label);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="container z-10 px-6 m-auto fadeIn">
      <div className="py-8 border-b border-gray-200 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid items-center grid-cols-12 sm:gap-8">
            {!isMobileOnly && (
              <div className="col-span-4">
                <img src={WelcomeImage} className="w-full h-auto" />
              </div>
            )}
            <div className="col-span-12 sm:col-span-8">
              <h1 className="mb-2 text-2xl font-extrabold text-center text-gray-900 sm:mb-4 sm:text-3xl xl:text-4xl sm:text-left">
                Oliver’s therapy center
              </h1>
              <h2 className="mb-2 text-lg font-bold text-center text-gray-800 sm:text-xl xl:text-2xl sm:text-left">
                You are currently in the waiting room.
              </h2>
              {isMobileOnly && (
                <img src={WelcomeImage} className="w-4/5 h-auto mx-auto" />
              )}
              <p className="text-base leading-relaxed text-center text-gray-600 xl:text-lg sm:text-left">
                When your practitioner becomes available, you will automatically
                be placed into conference. In the meantime, please see below
                content specifically provided for your consideration.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-4xl py-8 mx-auto sm:py-10">
        <p className="text-base leading-loose text-gray-700 xl:text-lg">
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam.
          Laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis
          unde omnis iste natus error sit voluptatem.
          <br />
          <br />
          Ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat. Temporibus autem quibusdam
          et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
          voluptates repudiandae sint et molestiae non recusandae.
          <br />
          <br />
          Quia consequuntur magni dolores eos qui ratione voluptatem sequi
          nesciunt. Cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia. Et harum quidem rerum facilis est et
          expedita distinctio. Totam rem aperiam. Non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          <br />
          <br />
          Architecto beatae vitae dicta sunt explicabo. Animi, id est laborum et
          dolorum fuga.
        </p>
      </div>
    </div>
  );
};

export default Waiting;
