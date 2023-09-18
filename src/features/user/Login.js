import React from "react";

// import { useState,  } from "react";

import { Link, json } from "react-router-dom";

import { showNotification } from "../common/headerSlice";

import { getLoginApi } from "../../apiConfig/loginSlice";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

// import axios from "axios";

 

import { useFormik } from "formik";

import { LoginSchema } from "../../schemas";

 

const initialValues = {

  password: "",

  email: "",

};

 

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const { login } = useSelector(state => state?.login)

 

  // const login = useSelector((state) => state?.login);

 

  // console.log("loginlogin", login);

 

  // const INITIAL_LOGIN_OBJ = {

 

  //   password: "",

 

  //   emailId: "",

 

  // };

 

  // const {register,handleSubmit,fromState:{errors}}=useForm();

 

  const {

    handleReset,

    values,

    errors,

    touched,

    handleBlur,

    handleSubmit,

    handleChange,

  } = useFormik({

    initialValues: initialValues,

 

    validationSchema: LoginSchema,

 

    onSubmit: (values) => {

      console.log(values);

 

      dispatch(getLoginApi(values)).then((res) => {

        console.log(res);

        if (res.payload.code === 200) {

          dispatch(

            showNotification({ message: res.payload.message, status: 1 })

          );

          localStorage.setItem("token", JSON.stringify(res.payload.data));

          navigate("/app/welcome");

        } else {

          dispatch(showNotification({ message: "Login failed", status: 0 }));

        }

      });

 

      // const response = axios.post(

 

      //   "http://13.232.2.101:3169/api/v1/authentication/login",

 

      //   values

 

      // );

 

      // console.log(response);

 

      // if (response?.data?.message) {

 

      //   localStorage.setItem("token", "DumyTokenHere");

 

      //   setLoading(false);

 

      //window.location.href = "/app/welcome";

 

      // }

 

      // {

 

      //   console.log(handleReset);

 

      // }

 

      // handleReset();

 

      // if(response?.data?.message){

 

      //   //     localStorage.setItem("token", "DumyTokenHere")

 

      //   //     window.location.href = '/app/welcome'

 

      //     }

    },

  });

 

  // useEffect(() => {

 

  //   if (login.login) {

 

  //     console.log("loginloginloginloginloginloginloginloginlogin", login.login);

 

  //     localStorage.setItem("token", login.login.accessToken);

 

  //     setLoading(false);

 

  //     // window.location.href = '/app/welcome'

 

  //   }

 

  // }, [login]);

 

  // const LoginApi = async()=>{

 

  //     const response = await axios.post('http://13.232.2.101:3169/api/v1/authentication/login', {"email":"dk@yopmail.com",

 

  //     "password":"Dk@123"})

 

  //  if(response?.data?.message){

 

  //     localStorage.setItem("token", "DumyTokenHere")

 

  //     setLoading(false)

 

  //     window.location.href = '/app/welcome'

 

  //  }

 

  // }

 

  // const submitForm = (e) => {

 

  //   // e.preventDefault();

 

  //   // setErrorMessage("");

 

  //   // if (loginObj.emailId.trim() === "")

 

  //   //   return setErrorMessage("Email Id is required! (use any value)");

 

  //   // if (loginObj.password.trim() === "")

 

  //   //   return setErrorMessage("Password is required! (use any value)");

 

  //   // else {

 

  //   //   setLoading(true);

 

  //   //   // Call API to check user credentials and save token in localstorage

 

  //   //   localStorage.setItem("token", "DumyTokenHere");

 

  //   //   setLoading(false);

 

  //   //   window.location.href = "/app/welcome";

 

  //   // }

 

  // };

 

  // const onSubmit = (data) =>{

 

  //   console.log(data);

 

  // }

 

  // const updateFormValue = ({ updateType, value }) => {

 

  //     // setErrorMessage("");

 

  //   setLoginObj({ ...loginObj, [updateType]: value });

 

  // };

 

  return (

    <div className="min-h-screen bg-base-200 flex items-center">

      <div className="card mx-auto w-full max-w-sm  shadow-xl my-4">

        {/* max-w-3xl */}

 

        <div className="  bg-base-100 rounded-xl">

          {/* grid  md:grid-cols-2 grid-cols-1  */}

 

          {/* <div className=''>

 

                        <LandingIntro />

 

                </div> */}

 

          <div className="py-20 px-10">

            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>

 

            <form onSubmit={handleSubmit}>

              <div className="mb-4">

                {/* <InputText

 

                  type="email"

 

                  id="emailId"

 

                  name="emailId"

 

                  updateFormValue={updateFormValue}

 

                  updateType="emailId"

 

                  containerStyle="mt-4"

 

                  labelTitle="Email Id"

 

                  defaultValue={loginObj.emailId}

 

                 

 

                 

 

                />

 

 

 

                <InputText

 

                  defaultValue={loginObj.password}

 

                  type="password"

 

                  name="password"

 

                  updateFormValue={updateFormValue}

 

                  updateType="password"

 

                  containerStyle="mt-4"

 

                  labelTitle="Password"

 

         

 

                 

 

                />  */}

 

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

                    className="input input-bordered w-full max-w-xs focus:border-none outline-none"

                    value={values.email}

                    onChange={handleChange}

                    onBlur={handleBlur}

                  />

 

                  {errors.email && touched.email ? (

                    <div style={{ color: "red" }}>{errors.email}</div>

                  ) : null}

                </div>

              </div>

 

              <div className="mb-4">

                <div className="mt-2">

                  <label

                    htmlFor="firname"

                    className="block text-sm font-medium leading-6 text-gray-900"

                  >

                    Password

                  </label>

 

                  <input

                    type="password"

                    name="password"

                    placeholder="Type here"

                    id="firname"

                    className="input input-bordered w-full max-w-xs focus:border-none outline-none"

                    value={values.password}

                    onChange={handleChange}

                    onBlur={handleBlur}

                  />

 

                  {errors.password && touched.password ? (

                    <div style={{ color: "red" }}>{errors.password}</div>

                  ) : null}

                </div>

              </div>

 

              <div className="text-right text-primary">

                <Link to="/forgot-password">

                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">

                    Forgot Password?

                  </span>

                </Link>

              </div>

 

              <button

                type="submit"

                className="btn mt-2 w-full btn-primary"

                onSubmit={handleSubmit}

              >

                Login

              </button>

 

              {/* </form> */}

 

              <div className="text-center mt-4">

                Don't have an account yet?{" "}

                <Link to="/register">

                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">

                    Register

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

 

export default Login;