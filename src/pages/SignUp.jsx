import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../components/user/registration/CustomForm";
import CustomCheckbox from "../components/user/registration/CustomCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewUserData } from "../features/users/userSlice";

function SignUp() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backResponse = useSelector((state) => state.user.backEndResponse);

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
  const onSubmit = (values, action) => {
    console.log(values);
    const { username, email, password, phoneNumber } = values;
    let dataToSend = {
      username,
      email,
      password,
      phone_number: phoneNumber,
    };
    dispatch(postNewUserData(dataToSend));
    console.log(action);
  };

  return (
    <section
      className="bg-primary dark:bg-gray-900 py-9 flex 
    items-center"
    >
      <div
        className=" w-5/6 flex flex-col lg:flex-row mx-auto 
      bg-primary rounded-xl"
      >
        <div
          className="bg-primary py-20 bg-cover w-full lg:w-1/2 mr-0 flex rounded-bl-xl 
        flex-col justify-center items-center rounded-tl-xl"
        >
          <h1 className=" font-medium tracking-tighter text-6xl text-white">
            tokoku
          </h1>
          <p
            className=" text-base font-normal text-light
           max-w-md text-center pt-8 tracking-widest"
          >
            revolutionize your business{" "}
            <span className="font-extrabold text-xl text-white">
              productivity
            </span>{" "}
            with our innovative cloud-based point-of-sale app
          </p>
        </div>
        <div className="w-full lg:w-1/2 ml-0">
          <div
            className="flex flex-col items-center justify-center 
          px-6 mx-auto lg:py-0"
          >
            <div
              className="w-full bg-primary rounded-lg dark:border 
            md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-6 space-y-4 md:space-y-12 sm:p-8">
                <h1
                  className="text-xl font-bold leading-tight
                text-white md:text-3xl dark:text-white text-sec text-center"
                >
                  create new account
                </h1>
                {backResponse.message && (
                  <div className="relative m-0 p-0">
                    {backResponse.isSuccess ? (
                      <p className=" text-sm text-primary font-semibold">
                        Check your email for verification
                      </p>
                    ) : (
                      <p className=" text-sm text-red-400 font-semibold">
                        {backResponse.message}
                      </p>
                    )}
                  </div>
                )}
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
                          className="w-full shadow-md text-white bg-secondary hover:bg-secondary
                          focus:ring-4 focus:outline-none focus:ring-secondary font-medium
                          rounded-full text-base px-5 h-10 text-center dark:bg-secondary 
                          dark:hover:bg-secondary dark:focus:ring-secondary tracking-widest"
                        >
                          REGISTER
                        </button>
                        <p
                          className="text-sm font-light text-white 
                        dark:text-gray-400 tracking-wide"
                        >
                          Already have an account?{" "}
                          <span
                            className="font-bold text-white hover:underline 
                           dark:text-white hover:cursor-pointer"
                          >
                            Login here
                          </span>
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
