import React, { useState } from "react";
import { Button, Input } from "@bigbinary/neetoui";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-row items-start justify-center w-screen h-screen px-6 pt-12 bg-white sm:pt-32">
      <div className="flex flex-col items-start justify-center w-full mx-auto sm:max-w-md">
        <h1 className="mb-1 text-3xl font-extrabold text-gray-800">
          Forgot your password?
        </h1>
        <p className="text-sm leading-relaxed text-gray-600">
          Enter your email address below and we&apos;ll send you a link to reset
          your password.
        </p>
        <form className="w-full mt-8 space-y-6" id="new_user">
          <Input
            id="user_email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Button
              type="submit"
              label="Send Email"
              data-disable-with="Send Email"
              fullWidth
            />
          </div>
        </form>
        <div className="flex flex-row items-center justify-center w-full mt-4 space-x-1">
          <p className="font-normal text-gray-600">
            Don&apos;t have an account?
          </p>
          <Button label="Signup" style="link" to="/signup" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
