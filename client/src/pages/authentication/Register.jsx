
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CommonFrom from "@/components/common/CommonFrom";
import { registationFromControls } from "@/config";

const initialstate={
  userName:'',
  email:'',
  password:'',
}

export default function Register() {
  const [formData , setFromData]=useState(initialstate);
  function onSubmit(){

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonFrom
      fromControls={registationFromControls}
      buttonText={'Sign account'}
      formData={formData}
      setformData={setFromData}
      onSubmit={onSubmit}
      />
    </div>
  );
}
