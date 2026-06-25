'use client'
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card } from "antd";

const SuperAdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Login Data:", values);
      // API Call Here
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">

      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-violet-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-indigo-50/70 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] mx-4">
        <Card >

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-200">
            <i className="fi fi-rs-shield-check text-white text-[24px]"></i>
             
            </div>
            <span className="text-[10px] font-bold tracking-[0.22em] text-violet-500 uppercase mb-1.5">Restricted Access</span>
            <h5  >
              Super Admin Portal
            </h5>
            <p className="text-muted mt-1">Sign in with your administrator credentials</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <i className="fi fi-rr-envelope"></i>
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="admin@company.com"
                     
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-1.5 text-xs text-rose-500" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <i className="fi fi-rr-fingerprint"></i>
                    </div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                    
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute  inset-y-0 right-3.5 flex items-center text-slate-350 hover:text-slate-500 transition-colors"
                    >
                      {showPassword ? (
                        <i className="fi fi-rs-crossed-eye pointer"></i>
                      ) : (
                       <i className="fi fi-rr-eye pointer"></i>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-1.5 text-xs text-rose-500" />
                </div>

                {/* Forgot */}
                {/* <div className="flex justify-end -mt-1">
                  <a href="#" className="text-xs font-medium text-violet-500 hover:text-violet-700 transition-colors">
                    Forgot password?
                  </a>
                </div> */}

                {/* Submit */}
               <Button
  disabled={isSubmitting}
  type="primary"
  block
>
  Sign In
  <i className="fi fi-tr-arrow-small-right text-2xl text-white ml-2"></i>
</Button>
              </Form>
            )}
          </Formik>

          
        </Card>
      </div>

     
    </div>
  );
};

export default SuperAdminLogin;