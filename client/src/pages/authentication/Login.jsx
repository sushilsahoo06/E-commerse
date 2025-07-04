import CommonFrom from "@/components/common/CommonFrom";
import { loginFromControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setformData] = useState(initialState);
  function onSubmit() {}
  return (
    <div className="max-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont't have account {""}
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonFrom
        fromControls={loginFromControls}
        buttonText={"Login"}
        formData={formData}
        setformData={setformData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
