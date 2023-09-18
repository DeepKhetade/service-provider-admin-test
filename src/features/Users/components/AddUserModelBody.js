import { useEffect } from "react";

import { useDispatch } from "react-redux";



import { showNotification } from "../../common/headerSlice";

import { getUserContent, showUser, getRoles } from "../userSlice";



import { useFormik } from "formik";

import { addUserSchema } from "../../../schemas";




const initialValues = {

  firstName: "",

  middleName: "",

  lastName: "",

  email: "",

  age: Number,

  phoneNumber: Number,

  role: "",

  gender: "",

  address: "",
  city: ""
};

const gender = [

  {

    label: "Male",

    value: "Male",

  },

  {

    label: "Female",

    value: "Female",

  },

  {

    label: "Other",

    value: "Other",

  },

];



let rolearray = [];



function AddUserModalBody({ closeModal }) {

  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,

    validationSchema: addUserSchema,

    onSubmit: (values) => {

      // const createdBy = JSON.parse(localStorage.getItem("user") || "");

      // Object.assign(values, { createdBy: createdBy.user });

      dispatch(getUserContent(values));

      let page = 1

      let limit = 5

      let search = ""

      dispatch(showUser({ page, limit, search }));

      dispatch(showNotification({ message: "New User Added!", status: 1 }));

      closeModal();

    },

  });



  useEffect(() => {

    dispatch(getRoles()).then((response) => {

      rolearray = response?.payload?.data

      console.log(rolearray)

    })

  }, [])







  return (

    <>

      <form onSubmit={handleSubmit}>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4">

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="firstName"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              First Name

            </label>

            <div className="mt-2">

              <input

                type="text"

                name="firstName"

                id="firstName"

                placeholder="First Name"

                value={values.firstName}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered  lg:w-70 md:w-52 sm:52 h-9 focus:border-none outline-none "

              />
              {errors.firstName && touched.firstName ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.firstName}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.firstName}
              </div> */}
            </div>

          </div>

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="middle-name"

              className="block text-sm lg:w-70 md:w-52 sm:52 font-medium leading-6 text-gray-900"

            >

              Middle Name

            </label>

            <div className="mt-2">

              <input

                type="text"

                name="middleName"

                id="middle-name"

                placeholder="Middle Name"

                value={values.middleName}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered  lg:w-70 md:w-52 sm:52  h-9  focus:border-none outline-none"

              />
              {errors.middleName && touched.middleName ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.middleName}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.middleName}
              </div> */}
            </div>

          </div>

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="last-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Last Name

            </label>

            <div className="mt-2">

              <input

                type="text"

                name="lastName"

                id="last-name"

                placeholder="Last Name"

                value={values.lastName}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered lg:w-70 md:w-52 sm:52 h-9  focus:border-none outline-none "

              />
              {errors.lastName && touched.lastName ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.lastName}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.lastName}
              </div> */}
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 lg:gap-0 md:gap-1 mt-4">

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="first-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Age

            </label>

            <div className="mt-2">

              <input

                type="number"

                name="age"

                id="age"

                placeholder="Age"

                value={values.age}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered lg:w-70 md:w-52 sm:52 h-9  focus:border-none outline-none addinput"

              />
              {errors.age && touched.age ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.age}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.age}
              </div> */}
            </div>

          </div>

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="first-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Email

            </label>

            <div className="mt-2">

              <input

                type="email"

                name="email"

                id="first-name"

                placeholder="Email"

                value={values.email}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered lg:w-70 md:w-52 sm:52 h-9  focus:border-none outline-none"

              />
              {errors.email && touched.email ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.email}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.email}
              </div> */}
            </div>

          </div>

          <div className="w-1/3 ... md:mt-2 sm:mt-3">

            <label

              htmlFor="first-name"

              className="block text-sm lg:w-70 md:w-60 sm:56 font-medium leading-6 text-gray-900"

            >

              Phone Number

            </label>

            <div className="mt-2">

              <input

                type="number"

                name="phoneNumber"

                id="phoneNumber"
                placeholder="Phone Number"
                value={values.phoneNumber}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered lg:w-70 md:w-52 sm:52 h-9  focus:border-none outline-none "

              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.phoneNumber}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.phoneNumber}
              </div> */}
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 lg:gap-0 md:gap-1 mt-4">

          <div className="sm:w-10/12">

            <label

              htmlFor="select-role"

              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >

              Select Role

            </label>

            <select

              className="select  select-bordered lg:w-70 md:w-52 sm:w-52 h-2/12  focus:border-none outline-none "

              id="select-role"

              name="role"

              value={values.role}

              onChange={handleChange}

              onBlur={handleBlur}

            >

              <option value="" selected>

                Select role

              </option>

              {rolearray.map((data, i) => (

                <option value={data.role} key={i}>

                  {data.role}



                </option>

              ))}

            </select>
            {errors.role && touched.role ? (
              <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-10/12 sm:9/12">{errors.role}</div>
            ) : null}
            {/* <div style={{ color: "red" }} className="text-sm">
              {errors.role}
            </div> */}
          </div>

          <div className="">

            <label

              htmlFor="select-role"

              className="block text-sm font-medium leading-6 text-gray-900 mb-3"

            >

              Gender

            </label>

            <select

              className="select  select-bordered lg:w-70 md:w-52 sm:w-52 min-h-4 focus:border-none outline-none "

              id=" gender"

              name="gender"

              value={values.gender}

              onChange={handleChange}

              onBlur={handleBlur}

            >

              <option value="" selected>

                Gender

              </option>

              {gender.map((a, i) => (

                <option value={a.value} key={i}>

                  {a.label}

                </option>

              ))}

            </select>
            {errors.gender && touched.gender ? (
              <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.gender}</div>
            ) : null}
            {/* <div style={{ color: "red" }} className="text-sm">
              {errors.gender}
            </div> */}
          </div>

          <div className="w-1/3 ... ">

            <label

              htmlFor="first-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >
              City

            </label>

            <div className="mt-2">

              <input

                type="text"

                name="city"

                id="first-name"

                placeholder="City"

                value={values.city}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered lg:w-70 md:w-52 sm:52 h-9  focus:border-none outline-none mt-1"

              />
              {errors.city && touched.city ? (
                <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.city}</div>
              ) : null}
              {/* <div style={{ color: "red" }} className="text-sm">
                {errors.city}
              </div> */}
            </div>

          </div>

        </div>

        <div className="mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-col-1 lg:gap-0 md:gap-1">

          <label

            htmlFor="select-role"

            className="block text-sm font-medium leading-6 text-gray-900 mb-3"

          >

            Address

          </label>

          <textarea

            className="textarea textarea-bordered lg:w-11/12 md:9/12 h-9 focus:border-none outline-none"

            name="address"

            id=""

            value={values.address}

            onChange={handleChange}

            onBlur={handleBlur}

            placeholder="Address"

          ></textarea>
          {errors.address && touched.address ? (
            <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52">{errors.address}</div>
          ) : null}
          {/* <div style={{ color: "red" }} className="text-sm">
            {errors.address}
          </div> */}
        </div>

        <div className="modal-action relative bottom-0 top-60">

          <button className="btn btn-ghost" onClick={() => closeModal()}>

            Cancel

          </button>

          <button className="btn btn-primary px-6" type="submit">

            Save

          </button>

        </div>

      </form>

    </>

  );

}

export default AddUserModalBody;

