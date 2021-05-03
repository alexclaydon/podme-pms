import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Checkbox } from "neetoui";

import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const {
        data: { user, auth_token },
      } = await authenticationApi.signup({
        user: {
          email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      });
      authDispatch({
        type: "LOGIN",
        payload: { auth_token, email, is_admin: false },
      });
      userDispatch({ type: "SET_USER", payload: { user } });
      history.push("/");
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-start justify-center w-screen h-screen px-6 pt-12 bg-white sm:pt-32">
      <div className="flex flex-col items-start justify-center w-full mx-auto sm:max-w-md">
        <h1 className="mb-1 text-3xl font-extrabold text-center text-gray-800">
          Create your account
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-start space-x-1">
          <p className="text-sm leading-relaxed text-gray-600">
            Already have an account?
          </p>
          <Button style="link" to="/login" label="Sign in here" />
        </div>
        <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="user_first_name"
            type="text"
            label="First name"
            placeholder="Sam"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            id="user_last_name"
            type="text"
            placeholder="Smith"
            label="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            id="user_email"
            type="email"
            label="Email"
            placeholder="oliver@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            id="user_password"
            type="password"
            label="Password"
            placeholder="******"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            id="user_password_confirmation"
            type="password"
            label="Confirm password"
            placeholder="******"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
          />
          <div className="flex flex-row items-center justify-center space-x-3">
            <Checkbox name="terms" />
            <p>
              I agree to the{" "}
              <a href="#!" className="text-indigo-600 hover:text-indigo-700">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#!" className="text-indigo-600 hover:text-indigo-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <Button type="submit" loading={loading} label="Signup" fullWidth />
        </form>
      </div>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
