import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import { SendResendLinkForgotPassword } from "../../schemas";
import { useFormik } from "formik";

const initialValues = {
  email: "",
};

function ForgotPassword() {
  // const INITIAL_USER_OBJ = {
  //     emailId : ""
  // }

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [userObj, setUserObj] = useState(initialValues);

  // const submitForm = (e) =>{
  //     e.preventDefault()
  //     setErrorMessage("")

  //     if(userObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
  //     else{
  //         setLoading(true)
  //         // Call API to send password reset link
  //         setLoading(false)
  //         setLinkSent(true)
  //     }
  // }

  // const updateFormValue = ({updateType, value}) => {
  //     setErrorMessage("")
  //     setUserObj({...userObj, [updateType] : value})
  // }

  const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: SendResendLinkForgotPassword,
    onSubmit: (values) => {
      console.log(values);
      // if(response?.data?.message){
      //   //     localStorage.setItem("token", "DumyTokenHere")

      //   //     window.location.href = '/app/welcome'
      //     }
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-sm  shadow-xl my-4">
        {/* max-w-5xl */}
        <div className=" bg-base-100 rounded-xl">
          {/* grid  md:grid-cols-2 grid-cols-1  */}
          {/* <div className=''>
                        <LandingIntro />
                </div> */}
          <div className="py-20 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>

            {linkSent && (
              <>
                <div className="text-center mt-8">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </div>
                <p className="my-4 text-xl font-bold text-center">Link Sent</p>
                <p className="mt-4 mb-8 font-semibold text-center">
                  Check your email to reset password
                </p>
                <div className="text-center mt-4">
                  <Link to="/login">
                    <button className="btn btn-block btn-primary ">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}

            {!linkSent && (
              <>
                <p className="my-8 font-semibold text-center">
                  We will send password reset link on your email Id
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    {/* <InputText type="emailId" defaultValue={userObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/> */}
                    <label
                      htmlFor="firname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email Id
                    </label>

                    <div className="mt-2">
                      <input
                        type="text"
                        name="email"
                        placeholder="Type here"
                        id="email"
                        className="input input-bordered w-full max-w-xs"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <div style={{ color: "red" }}>{errors.email}</div>
                    </div>
                  </div>

                  {/* <ErrorText styleClass="mt-12">{errorMessage}</ErrorText> */}
                  <button
                    type="submit"
                    className="btn mt-2 w-full btn-primary"
                    onSubmit={handleSubmit}
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center mt-4">
                    Don't have an account yet?{" "}
                    <Link to="/register">
                      <button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
