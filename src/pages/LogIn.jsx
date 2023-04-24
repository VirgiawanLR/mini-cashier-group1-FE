import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../components/user/registration/CustomForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/users/userSlice";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });
  const [loginResponse, setLoginResponse] = useState({});

  const onSubmit = async (values, action) => {
    let loginBtn = document.querySelector("#signin");
    loginBtn.disabled = true;
    const { email, password } = values;
    let dataToSend = {
      email,
      password,
    };
    let response = await dispatch(userLogin(dataToSend));
    if (response.isSuccess) {
      navigate("/");
    }
    setLoginResponse(response);
    loginBtn.disabled = false;
    action.resetForm();
  };

  return (
    <section
      className="flex flex-col justify-center items-center h-screen
      bg-primary w-full"
    >
      <div className="flex flex-col items-center">
        <h1
          className="-tracking-widest text-7xl mb-4 font-semibold
          text-white"
        >
          tokoku
        </h1>
        <h2 className=" text-3xl text-dark font-bold">sign in</h2>
      </div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          acceptedTOS: true,
        }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form className="w-full mt-10">
              <div className=" w-1/3 mx-auto flex flex-col gap-4">
                <div>
                  <CustomForm
                    name="email"
                    type="email"
                    id="email"
                    label="email"
                  />
                </div>
                <div>
                  <CustomForm
                    name="password"
                    type="password"
                    id="password"
                    label="password"
                  />
                </div>
              </div>
              <div className="mt-6 w-fit mx-auto">
                {loginResponse.message ? (
                  <>
                    {loginResponse.isSuccess ? null : (
                      <p className="font-bold text-red-600 text-sm top-5">
                        {loginResponse.message}
                      </p>
                    )}
                  </>
                ) : null}
              </div>
              <div
                className="w-1/2 mx-auto mt-12   flex flex-col 
              items-center gap-12"
              >
                <button
                  type="submit"
                  id="signin"
                  className="w-1/3 mx-auto shadow-dark 
                  shadow-lg text-white 
                  bg-secondary hover:bg-tertiary
                  focus:ring-4 focus:outline-none focus:ring-secondary 
                  font-bold rounded-full text-base px-5 h-10 
                  text-center tracking-[0.18rem]
                  transition ease-in-out duration-200
                  disabled:hover:bg-secondary disabled:hover:cursor-wait"
                >
                  LOGIN
                </button>
                <p className="text-center text-lg text-light">
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    className="font-semibold hover:underline 
                    hover:cursor-pointer text-white"
                  >
                    Register
                  </span>{" "}
                  now!
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}

export default LogIn;
