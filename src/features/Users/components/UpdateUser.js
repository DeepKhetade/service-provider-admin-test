import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeRightDrawer } from "../../common/rightDrawerSlice";
// import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {  updateUserSchema } from "../../../schemas";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { getRoles } from "../userSlice";


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

function UpdateUserModalBody(extraObject,{closeModal}) {
  
  const initialValues = {
    firstName:extraObject.extraObject.firstName,
    middleName: extraObject.extraObject.middleName,
    lastName: extraObject.extraObject.lastName,
    email: extraObject.extraObject.email,
    age: extraObject.extraObject.age,
    phoneNumber: extraObject.extraObject.phoneNumber,
    role: extraObject.extraObject.role,
    gender: extraObject.extraObject.gender,
    address: extraObject.extraObject.address,
    city: extraObject.extraObject.city,
  };
  const dispatch = useDispatch();
  const [ roleArray, setRollarray]=useState([])
  const { values, errors,touched ,handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: updateUserSchema,
    
    onSubmit: (values) => {
      

       Object.assign(values, { id: extraObject.extraObject._id });
      // const updatedBy = JSON.parse(localStorage.getItem("user") || "");
      // Object.assign(values, { updatedBy: updatedBy.user });
      dispatch(
        openModal({
          title: "Confirmation",
          bodyType: MODAL_BODY_TYPES.CONFIRMATION,
          extraObject: {
            message: "Are you sure you want to update this user?",
            type: CONFIRMATION_MODAL_CLOSE_TYPES.UPDATE_USER,
            _id: values,
          },
        })
      );
    }
  });

  const close = (e) => {
    dispatch(closeRightDrawer(e));
  };
  useEffect(()=>{
    dispatch(getRoles()).then((response)=>{
    setRollarray(response?.payload?.data)
    })
  },[])
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
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9   focus:border-none outline-none"
              />
              <div style={{ color: "red" }} className="text-sm">
                {errors.firstName}
              </div>
            </div>
          </div>
          <div className="w-1/3 ... md:mt-2 sm:mt-3">
            <label
              htmlFor="middleName"
              className="block text-sm lg:w-70 md:w-56 sm:52 font-medium leading-6 text-gray-900 "
            >
              Middle Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Middle Name"
                value={values.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
              <div style={{ color: "red" }} className="text-sm ">
                {errors.middleName}
              </div>
            </div>
          </div>
          <div className="w-1/3 ...md:mt-2 sm:mt-3 ">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />

              {errors.lastName && touched.lastName ?(

                <div style={{ color: "red" }} className="text-sm ">  {errors.lastName}</div>
              ) :null}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4">
          <div className="w-1/3 ... md:mt-2 sm:mt-3">
            <label
              htmlFor="age"
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
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
              <div style={{ color: "red" }} className="text-sm ">
                {errors.age}
              </div>
            </div>
          </div>
          <div className="w-1/3 ... md:mt-2 sm:mt-3">
            <label
              htmlFor="Email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="Email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
              <div style={{ color: "red" }} className="text-sm">
                {errors.email}
              </div>
            </div>
          </div>
          <div className="w-1/3 ... md:mt-2 sm:mt-3">
            <label
              htmlFor="first-name"
              className="block text-sm lg:w-70 md:w-56 sm:52 font-medium leading-6 text-gray-900 "
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
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
              <div style={{ color: "red" }} className="text-sm ">
                {errors.phoneNumber}
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4">
          <div className="sm:w-10/12 md:mt-2 sm:mt-3">
            <label
              htmlFor="select-role"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Select Role
            </label>
            <select
              className="select  select-bordered  lg:w-70 md:w-56 sm:w-52 h-2/12 focus:border-none outline-none"
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">
                Select role
              </option>
              {roleArray?.map((data, i) => (
                <option value={data.role} key={i}>
                  {data.role}
                </option>
              ))}
            </select>
            <div style={{ color: "red" }} className="text-sm ">
              {errors.role}
            </div>
          </div>
          <div className="sm:w-10/12 md:mt-2 sm-3">
            <label
              htmlFor="select-role"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Gender
            </label>
            <select
              className="select  select-bordered lg:w-70 md:w-56 sm:w-52 focus:border-none outline-none"
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">
                Gender
              </option>
              {gender.map((a, i) => (
                <option value={a.value} key={i}>
                  {a.value}
                </option>
              ))}
            </select>
            <div style={{ color: "red" }} className="text-sm ">
              {errors.gender}
            </div>
          </div>
          <div className="w-1/3 ... md:mt-2 sm:mt-3">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-70 md:w-56 sm:52 focus:border-none outline-none mt-1"
              />
              <div style={{ color: "red" }} className="text-sm ">
                {errors.city}
              </div>
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
            id="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="address"
          ></textarea>
          <div style={{ color: "red" }} className="text-sm ">
            {errors.address}
          </div>
        </div>
        <div className="modal-action relative bottom-0 top-60">
          <button className="btn btn-ghost" onClick={() => close()}>
            Cancel
          </button>
          <button className="btn btn-primary px-6" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
export default UpdateUserModalBody;
