// import { useState } from "react";

import { useDispatch } from "react-redux";

// import InputText from "../../../components/Input/InputText";

// import ErrorText from "../../../components/Typography/ErrorText";

// import { showNotification } from "../../common/headerSlice";

// import { addNewLead, showRoles, updateRole } from "../roleSlice";

// import TextAreaInput from "../../../components/Input/TextAreaInput";

import { closeRightDrawer } from "../../common/rightDrawerSlice";



import { useFormik } from "formik";

import { addRoleSchema} from "../../../schemas";

import { openModal } from "../../common/modalSlice";

import {

  CONFIRMATION_MODAL_CLOSE_TYPES,

  MODAL_BODY_TYPES,

} from "../../../utils/globalConstantUtil";

 

function UpdateRole(extraObject, { closeModal }) {

  const initialValues = {

    role: extraObject.role,

    description: extraObject.description,

  };

 



  const dispatch = useDispatch();

 

  const { values,touched, errors, handleBlur, handleSubmit, handleChange } = useFormik({

    initialValues: initialValues,

    validationSchema: addRoleSchema,

 

    onSubmit: (values) => {
     

      // console.log(errors, "nnd");

       Object.assign(values, { id: extraObject._id });

      // const updatedBy = JSON.parse(localStorage.getItem("user") || "");

      // Object.assign(values, { updatedBy: updatedBy.user });

      // dispatch(updateRole(values));

      dispatch(

        openModal({

          title: "Confirmation",

          bodyType: MODAL_BODY_TYPES.CONFIRMATION,

          extraObject: {

            message: "Are you sure you want to update this role?",

            type: CONFIRMATION_MODAL_CLOSE_TYPES.UPDATE_ROLE,

            _id: values,

          },

        })

      );
    },

  });

 



  const close = (e) => {

    dispatch(closeRightDrawer(e));

  };  

  return (

    <>

      <form onSubmit={handleSubmit}>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4">

          <div className="w-1/2 ...  mt-4">

            <label

              htmlFor="first-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Role Name

            </label>

            <div className="">

              <input

                type="text"

                name="role"

                id="first-name"

                placeholder="Role"

                value={values.role}

                onChange={handleChange}

                onBlur={handleBlur}

                className="input input-bordered xl:w-96 lg:w-80 md:w-62 sm:w-62 mt-2  focus:border-none outline-none"

              />
              {
                errors.role && touched.role ? (

                  <div style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52 mt-2">{errors.role}</div>
                ) : null
              }

            </div>

          </div>

          <div className="mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-col-1 lg:gap-0 md:gap-1">

            <label

              htmlFor="last-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Description

            </label>

            <div className="mt-2">

              <textarea

                className="textarea textarea-bordered lg:w-11/12 md:w-9/12 h-4 focus:border-none outline-none"
                id="last-name"
                value={values.description}

                onChange={handleChange}

                onBlur={handleBlur}

                name="description"

                placeholder="Description"

              ></textarea>

            </div>

          </div>

        </div>

        <div className="modal-action relative bottom-0 top-80">

          <button className="btn btn-ghost" onClick={() => close()}>

            Cancel

          </button>

          <button type="submit" className="btn btn-primary px-6">

            Update

          </button>

        </div>

      </form>

    </>

  );

}

 

export default UpdateRole;