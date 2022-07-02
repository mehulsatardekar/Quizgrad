import React, { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LoginType } from "./LoginType";
import { supabase } from "../../../supabaseClient";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useToast, useAuth } from "../../contexts";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  emailRegex,
  wrongEmailMessage,
  passwordRegex,
  wrongPasswordMessage,
} from "../../utils";

const Login = () => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const { notifySuccess, notifyError } = useToast();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
      //window.location.reload();
    }
  }, []);

  const initialValues: LoginType = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format Email should contain valid email address")
      .required("Email Address is required")
      .matches(emailRegex, wrongEmailMessage),
    password: Yup.string()
      .required("Password is Required")
      .matches(passwordRegex, wrongPasswordMessage),
  });

  const loginFormData = async (values: LoginType) => {
    try {
      const { user, session, error }: any = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (user) {
        notifySuccess("You are successfully loged in.");
        //console.log(currentUser?.currentSession?.user.id);

        if (session !== null) {
          setCurrentUser(session);
        }
        if (location.state) {
          console.log("huree");

          navigate(location?.state?.from?.pathname, { replace: true });
        } else {
          navigate("/dashboard");
        }

        // window.location.reload();
      }
      if (error) throw error;
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex flex-space-evenly flex-wrap gap pt-2 pb-2">
        <div className="flex flex-column gap-1 ui-card-default py-1 form-container mt-3 pt-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={loginFormData}
          >
            <Form className="flex flex-column gap">
              <div className="flex flex-column gap-1">
                <label
                  htmlFor="exampleInputEmail1"
                  className="label-text label-text-primary"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  className="input"
                  placeholder="Email"
                  id="emailInput1"
                  aria-describedby="emailHelp"
                  name="email"
                />
                <span className="font-md-light">
                  We'll never share your email with anyone else.
                </span>
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
                  htmlFor="passwordInput2"
                  className="label-text label-text-primary"
                >
                  Password
                </label>
                <Field
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="passwordInput2"
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
              <button
                type="submit"
                className="btn-primary btn btn-py-1 flex flex-justify-center width-full "
              >
                <span className="font-size-sm"> Login </span>
              </button>
            </Form>
          </Formik>
          <div className="flex flex-justify-center  flex-align-item-center mt-1">
            <div className="flex flex-column  flex-align-item-center gap-1">
              <span className="font-ex-sm font-bold">OR</span>
              <span className="">
                Dont have an account? <Link to="/signup">Sign up here</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Login };
