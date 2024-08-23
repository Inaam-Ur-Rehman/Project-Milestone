import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../services/users/userServices";

//! Validation
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("Required"),
});

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //! Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  // console.log(mutation);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //! Validation
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // http request
      mutateAsync(values)
        .then((data) => console.log(data))
        .catch((err) => {
          setErrors(err.response.data.msg);
        });
    },
  });

  // console.log(formik);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <form
            onSubmit={formik.handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******************"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {errors && (
              <div className="text-red-500">
                <p>{errors}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <Link to={"/register"}>New here? Register</Link>
          </form>

          <p className="text-xs text-center text-gray-500">
            &copy;2024 Project Milestone. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
