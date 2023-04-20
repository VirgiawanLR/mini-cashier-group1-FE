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
    username: Yup.string().required("must not blank"),
    email: Yup.string()
      .required("must not blank")
      .email("invalid email format"),
    password: Yup.string()
      .min(5, "password is too short - at least 5 chars minimum")
      // .matches(
      //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      //   "must contain one number and one special character"
      // )
      .required("must not blank"),
    phoneNumber: Yup.string()
      .required("must not blank")
      .matches(phoneRegExp, "phone number is not valid"),
    acceptedTOS: Yup.boolean().oneOf(
      [true],
      "please accept the terms of Service"
    ),
  });
  const onSubmit = async (values, action) => {
    let registerBtn = document.querySelector("#register");
    registerBtn.disabled = true;
    const { username, email, password, phoneNumber } = values;
    let dataToSend = {
      username,
      email,
      password,
      phone_number: phoneNumber,
    };
    await dispatch(postNewUserData(dataToSend));
    registerBtn.disabled = false;
  };

  return (
    <section
      className="bg-primary py-7 flex 
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
          <h1 className=" font-semibold -tracking-widest text-6xl text-white">
            tokoku
          </h1>
          <p
            className=" text-base font-normal text-light
           max-w-md text-center pt-8 tracking-widest"
          >
            revolutionize your business{" "}
            <span className="font-extrabold text-xl text-dark">
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
              className="w-full bg-primary rounded-lg 
              md:mt-0 sm:max-w-md xl:p-0"
            >
              <div className="p-6 space-y-16 sm:p-8">
                <div className=" w-fit relative mx-auto">
                  <h1
                    className="text-2xl font-bold leading-tight
                    text-dark md:text-3xl text-center"
                  >
                    create new account
                  </h1>
                  {backResponse.message && (
                    <div className="absolute top-12 ">
                      {backResponse.isSuccess ? (
                        <p className=" text-sm text-white font-semibold">
                          check your email for verification
                        </p>
                      ) : (
                        <p className=" text-sm text-red-600 font-semibold">
                          {backResponse.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
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
                          placeholder="username"
                        />
                        <CustomForm
                          name="email"
                          type="email"
                          id="email"
                          placeholder="email"
                        />
                        <CustomForm
                          name="password"
                          type="password"
                          id="password"
                          placeholder="password"
                        />
                        <CustomForm
                          name="phoneNumber"
                          type="text"
                          id="phoneNumber"
                          placeholder="phone number"
                        />
                        <CustomCheckbox
                          id="acceptedTOS"
                          name="acceptedTOS"
                          type="checkbox"
                        />

                        <button
                          type="submit"
                          id="register"
                          className="w-full mx-auto shadow-dark 
                          shadow-lg text-white 
                          bg-secondary hover:bg-tertiary
                          focus:ring-4 focus:outline-none focus:ring-secondary 
                          font-bold rounded-full text-base px-5 h-10 
                          text-center tracking-[0.18rem]
                          transition ease-in-out duration-200
                           disabled:hover:bg-secondary disabled:hover:cursor-wait"
                        >
                          REGISTER
                        </button>

                        <p
                          className="text-sm font-light text-white 
                          tracking-wide"
                        >
                          Already have an account?{" "}
                          <button
                            onClick={() => {
                              navigate("/login");
                            }}
                            className="font-bold text-white hover:underline 
                            hover:cursor-pointer"
                          >
                            Login here
                          </button>
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
