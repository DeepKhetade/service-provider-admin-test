import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    password: "",
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [isSubmit, setIsSubmit] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage(validate(registerObj));
    setIsSubmit(true);
    // if (registerObj.name.trim() === "")
    //   return setErrorMessage("Name is required! (use any value)");
    // if (registerObj.email.trim() === "")
    //   return setErrorMessage("Email Id is required! (use any value)");
    // if (registerObj.password.trim() === "")
    //   return setErrorMessage("Password is required! (use any value)");
    // else {
    setLoading(true);
    // Call API to check user credentials and save token in localstorage
    localStorage.setItem("token", "DumyTokenHere");
    setLoading(false);
    // window.location.href = "/app/welcome";
    // }
  };
  //   useEffect(() => {
  //     console.log(errorMessage);
  //     if (Object.keys(errorMessage).length === 0 && isSubmit) {
  //       console.log(registerObj);
  //     }
  //   }, [errorMessage]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const updateFormValue = ({ updateType, value }) => {
    // setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-sm  shadow-xl my-[29px]">
        {/* max-w-5xl */}
        <div className=" bg-base-100 rounded-xl">
          {/*  grid  md:grid-cols-2 grid-cols-1  */}
          {/* <div className=''>
                        <LandingIntro />
                </div> */}
          <div className="py-20 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  defaultValue={registerObj.name}
                  updateType="name"
                  containerStyle="mt-4"
                  labelTitle="Name"
                  updateFormValue={updateFormValue}
                  name="name"
                />
                {errorMessage.name && (
                  <p className="text-red-500">{errorMessage.name}</p>
                )}{" "}
                {/* <p className="text-red-500">{errorMessage.name}</p> */}
                <InputText
                  defaultValue={registerObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                  name="email"
                />
                {errorMessage.email && (
                  <p className="text-red-500">{errorMessage.email}</p>
                )}
                <InputText
                  defaultValue={registerObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                  name="password"
                />
                {errorMessage.password && (
                  <p className="text-red-500">{errorMessage.password}</p>
                )}{" "}
              </div>

              {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
