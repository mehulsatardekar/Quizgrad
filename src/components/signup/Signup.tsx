import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { supabase } from "../../../supabaseClient";

import { SignupType, SignupErrorType } from "./SignupType";

import { useToast, useAuth } from "../../contexts";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  emailRegex,
  wrongEmailMessage,
  passwordRegex,
  wrongPasswordMessage,
} from "../../utils";

const Signup = () => {
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      window.location.reload();
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const initialValues: SignupType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),

    email: Yup.string()
      .required("Invalid Email Format Email should contain valid email address")
      .required("Email Address is required")
      .matches(emailRegex, wrongEmailMessage),

    password: Yup.string()
      .required("Password is required")
      .matches(passwordRegex, wrongPasswordMessage),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mismatched passwords")
      .required("Please confirm your password"),
  });

  const signupFormValidate = async (values: SignupType) => {
    console.log(values.confirmPassword);

    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      notifySuccess("Account created successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();

      try {
        const timestamp = new Date().toLocaleString();
        const imgUrl =
          "https://res.cloudinary.com/dwhsfh3sc/image/upload/v1654457432/quiz-grad/assets/quiz-grad_wjshyu.webp";
        const { data, error } = await supabase.from("users").insert(
          [
            {
              id: user?.id,
              email: values.email,
              userbio: "quiz-grad",
              username: values.username,
              user_profile_image: imgUrl,
              last_sign_in: timestamp,
            },
          ],
          { returning: "minimal" }
        );

        console.log(error);

        if (error) throw error;

        // init user achievement table in DB
        try {
          const { data, error } = await supabase.from("achievements").insert(
            [
              {
                id: user?.id,
                quiz_passed: 0,
                correct_answer: 0,
                user_current_stat: 0,
                user_booster_level: 0,
              },
            ],
            { returning: "minimal" }
          );
           console.log(error?.message)
          if (error) throw error;
        } catch (error) {
          notifyError("error while initialize account in our database");
          console.error(error.message);
        }
      } catch (error) {
        if (error.code === "23505") {
          notifyError("user already exists");
        }
        notifyError(error.message);
        console.error(error.message);
      }

      /* user insertion table  */
    } catch (error) {
      notifyError(error.message);
    }
  };
  return (
    <div className="flex flex-space-evenly flex-wrap gap pt-2 pb-2">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex flex-column gap-1 ui-card-default py-1">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signupFormValidate}
        >
          <Form className="flex flex-column gap">
            <div className="flex flex-column gap-1">
              <label
                htmlFor="username"
                className="label-text label-text-primary"
              >
                UserName
              </label>
              <Field
                type="text"
                className="input"
                placeholder="Username"
                id="username"
                aria-describedby="username"
                name="username"
              />
              <span className="font-md-light">
                We'll never share your email with anyone else.
              </span>
              <ErrorMessage name="username">
                {(errorMsg) => (
                  <div className="font-bold font-ex-sm label-text-danger">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="flex flex-column gap-1">
              <label
                htmlFor="email-address"
                className="label-text label-text-primary"
              >
                Email Address
              </label>
              <Field
                type="email"
                className="input"
                placeholder="Email Address"
                id="email-address"
                name="email"
              />
              <ErrorMessage name="email">
                {(errorMsg) => (
                  <div className="font-bold font-ex-sm label-text-danger">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="flex flex-column gap-1">
              <label
                htmlFor="Password"
                className="label-text label-text-primary"
              >
                Password
              </label>
              <Field
                type="password"
                className="input"
                placeholder="Password"
                id="Password"
                name="password"
              />

              <ErrorMessage name="password">
                {(errorMsg) => (
                  <div className="font-bold font-ex-sm label-text-danger">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="flex flex-column gap-1">
              <label
                htmlFor="confirmPassword"
                className="label-text label-text-primary"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                className="input"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword">
                {(errorMsg) => (
                  <div className="font-bold font-ex-sm label-text-danger">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <button
              type="submit"
              className="btn-primary btn btn-py-1 flex flex-justify-center width-full "
            >
              <span className="font-size-sm"> Sign Up </span>
            </button>
          </Form>
        </Formik>
        <div className="flex flex-justify-center">
          <div className="label-text ">
            Already have an account?{" "}
            <Link to="/login" className="btn-link label-text-primary">
              {" "}
              Login{" "}
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Signup };
