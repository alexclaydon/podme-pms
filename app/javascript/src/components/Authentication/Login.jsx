import React, { useState } from "react";
import PropTypes from "prop-types";
import { setAuthHeaders } from "apis/axios";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { Button, Input, Toastr, Checkbox } from "@bigbinary/neetoui";
import authenticationApi from "apis/authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({
        user: { email, password, remember_me: rememberMe },
      });
      authDispatch({ type: "LOGIN", payload: { auth_token, email, is_admin } });
      userDispatch({ type: "SET_USER", payload: { user } });
      setAuthHeaders();
      // history.push("/contacts");
      window.location.href = "/";
      Toastr.success("Logged in successfully.");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-start justify-center w-screen h-screen px-6 pt-12 overflow-x-hidden overflow-y-auto bg-white sm:pt-32">
      <div className="flex flex-col items-start justify-center w-full mx-auto sm:max-w-md">
        <h1 className="mb-1 text-3xl font-extrabold text-gray-800">
          Login to your account
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-start space-x-1">
          <p className="text-sm leading-relaxed text-gray-600">
            Don&apos;t have an account?
          </p>
          <Button style="link" to="/signup" label="Signup here" />
        </div>
        <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="user_email"
            type="email"
            value={email}
            label="Email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            id="user_password"
            type="password"
            label="Password"
            placeholder="******"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex flex-row items-center justify-between">
            <Checkbox
              name="remember"
              label="Remember me"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <Button
              label="Forgot password?"
              style="link"
              to="/my/password/new"
            />
          </div>
          <Button type="submit" loading={loading} fullWidth label="Login" />
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
