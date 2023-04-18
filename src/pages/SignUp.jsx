import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TermsAndCondition from "../components/user/registration/TermsAndCondition";
import CustomForm from "../components/user/registration/CustomForm";

function SignUp() {
  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Must not blank"),
    email: Yup.string()
      .required("Must not blank")
      .email("Invalid email format"),
    password: Yup.string()
      .min(8, "Password is too short - at least 8 chars minimum")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Must contain one number and one special character"
      )
      .required("Must not blank"),
    phoneNumber: Yup.number().required("Must not blank"),
  });
  const onSubmit = () => {};

  return (
    <section className="bg-gray-100 dark:bg-gray-900 h-screen flex items-center">
      <div className=" w-5/6 h-5/6 flex flex-col lg:flex-row mx-auto bg-white rounded-xl shadow ">
        <div className="bg-hero-pattern bg-cover w-full lg:w-1/2 mr-0 rounded-bl-xl rounded-tl-xl"></div>
        <div className="w-full lg:w-1/2 ml-0">
          <div
            className="flex flex-col items-center justify-center 
          px-6 py-8 mx-auto lg:py-0"
          >
            <div
              className="w-full bg-white rounded-lg dark:border 
            md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  className="text-xl font-bold leading-tight tracking-tight
              text-gray-900 md:text-xl dark:text-white"
                >
                  Create an account
                </h1>
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => {
                    return (
                      <Form className="space-y-4 md:space-y-6">
                        <CustomForm
                          name="username"
                          type="text"
                          id="username"
                          placeholder="Username"
                          label="Username"
                        />
                        <CustomForm
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Email"
                          label="Email"
                        />
                        <CustomForm
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Password"
                          label="Password"
                        />
                        <CustomForm
                          name="phoneNumber"
                          type="tel"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          label="Phone Number"
                        />
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded 
                             bg-gray-50 focus:ring-3 focus:ring-primary 
                             dark:bg-gray-700 dark:border-gray-600 
                             dark:focus:ring-primary dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              for="terms"
                              className="font-light text-gray-500 dark:text-gray-300"
                            >
                              I accept the{" "}
                              <a
                                className="font-medium text-primary hover:underline
                         dark:text-primary"
                                href="#"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-primary hover:bg-primary
                    focus:ring-4 focus:outline-none focus:ring-primary font-medium
                    rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary 
                    dark:hover:bg-primary dark:focus:ring-primary"
                        >
                          Create an account
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account?{" "}
                          <a
                            href="#"
                            className="font-medium text-primary hover:underline 
                    dark:text-primary"
                          >
                            Login here
                          </a>
                        </p>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
