import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TermsAndCondition from "../components/user/registration/TermsAndCondition";
import CustomForm from "../components/user/registration/CustomForm";
import CustomCheckbox from "../components/user/registration/CustomCheckbox";

function SignUp() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Must not blank"),
    email: Yup.string()
      .required("Must not blank")
      .email("Invalid email format"),
    password: Yup.string()
      .min(5, "Password is too short - at least 5 chars minimum")
      // .matches(
      //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      //   "Must contain one number and one special character"
      // )
      .required("Must not blank"),
    phoneNumber: Yup.string()
      .required("Must not blank")
      .matches(phoneRegExp, "Phone number is not valid"),
    acceptedTOS: Yup.boolean().oneOf(
      [true],
      "Please accept the terms of Service"
    ),
  });
  const onSubmit = () => {};

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
      <div className=" w-5/6 h-5/6 flex flex-col lg:flex-row mx-auto bg-white rounded-xl shadow-lg ">
        <div
          className="bg-primary bg-cover w-full lg:w-1/2 mr-0 flex rounded-bl-xl 
        flex-col justify-center items-center rounded-tl-xl"
        >
          <h1 className=" font-bold text-6xl text-white">tokoku</h1>
          <p
            className=" text-base font-normal text-light opacity-60
           max-w-sm text-center pt-2"
          >
            <span className="text-3xl">"</span>
            Revolutionize your business{" "}
            <span className="font-bold text-xl text-white">
              productivity
            </span>{" "}
            with our innovative cloud-based point-of-sale app.
          </p>
        </div>
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
              text-primary md:text-xl dark:text-white text-sec"
                >
                  Create an account
                </h1>
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                    acceptedTOS: true,
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
                          type="text"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          label="Phone Number"
                        />
                        <CustomCheckbox
                          id="acceptedTOS"
                          name="acceptedTOS"
                          type="checkbox"
                        />
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
