import React, { useState } from "react";
import { Button, Radio } from "@bigbinary/neetoui";
import classnames from "classnames";
import PaypalLogo from "images/paypal.svg";
import StripeLogo from "images/stripe.svg";
import VisaLogo from "images/visa.svg";
import MastercardLogo from "images/mastercard.svg";

const PLANS = ["Pay yearly $50/year", "Pay monthly $5/month"];

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  return (
    <div className="flex flex-row items-start justify-center w-screen h-screen px-6 pt-12 bg-white sm:pt-32">
      <div className="flex flex-col items-start justify-center w-full mx-auto sm:max-w-md">
        <h1 className="mb-1 text-3xl font-extrabold text-center text-gray-800">
          Choose your plan
        </h1>
        <p className="text-sm leading-relaxed text-gray-600">
          A one-month free trial is included; you won&apos;t be charged if you
          cancel before the end of one month.
        </p>
        <div className="w-full my-8 space-y-6">
          <div className="-space-y-px bg-white rounded-md">
            {PLANS.map((plan, index) => (
              <div
                key={index}
                onClick={() => setSelectedPlan(index)}
                className={classnames(
                  "relative flex flex-row justify-start items-center p-4 space-x-3 border border-indigo-200 cursor-pointer",
                  "first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md",
                  {
                    "bg-indigo-50": selectedPlan === index,
                  }
                )}
              >
                <Radio>
                  <Radio.Item name={index} checked={selectedPlan === index} />
                </Radio>
                <p className="text-sm font-medium text-indigo-900">{plan}</p>
              </div>
            ))}
          </div>
          <Button type="submit" label="Subscribe" fullWidth />
        </div>
        <LogoClouds />
      </div>
    </div>
  );
};

const LogoClouds = () => (
  <div className="flex flex-row items-center justify-center w-full space-x-4">
    <img src={PaypalLogo} />
    <img src={VisaLogo} />
    <img src={StripeLogo} />
    <img src={MastercardLogo} />
  </div>
);

export default Plans;
