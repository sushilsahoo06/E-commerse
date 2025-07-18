import CommonFrom from "@/components/common/CommonFrom";
import { loginFromControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
        if (data?.payload?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      } else {
        toast(data?.payload?.message);
      }
    });
  }
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
