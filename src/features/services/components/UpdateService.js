import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
// import { addNewLead, showRoles, updateRole } from "../serviceSlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { closeRightDrawer } from "../../common/rightDrawerSlice";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateRoleSchema } from "../../../schemas";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";

const INITIAL_LEAD_OBJ = {
  service: "",
  description: "",
};

function UpdateServicesModelBody(extraObject, { closeModal }) {
    const initialValues = {
      service: extraObject.service,
      description: extraObject.description,
    };
  
  
    const dispatch = useDispatch();
  
    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
      initialValues: initialValues,
  
      validationSchema: updateRoleSchema,
      onSubmit: (values) => {
        Object.assign(values, { id: extraObject._id });
        const updatedBy = JSON.parse(localStorage.getItem("service") || "");
        Object.assign(values, { updatedBy: updatedBy.user });
        dispatch(
          openModal({
            title: "Confirmation",
            bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: {
              message: "Are you sure you want to update this service?",
              type: CONFIRMATION_MODAL_CLOSE_TYPES.UPDATE_ROLE,
              _id: values,
            },
          })
        );
  
        //   dispatch(showRoles())
        //   dispatch(showNotification({message : "New Role Added!", status : 1}))
        //  dispatch(close())
      },
    });
  
    const close = (e) => {
      dispatch(closeRightDrawer(e));
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="flex ... mt-4">
            <div className="w-1/2 ... ">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Service Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="service"
                  id="first-name"
                  placeholder="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input input-bordered w-96"
                />
                <div style={{ color: "red" }}>{errors.service}</div>
              </div>
            </div>
            <div className="w-1/2 ... ">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  className="textarea textarea-bordered w-full h-10"
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
          <div className="modal-action relative bottom-0 top-60">
            <button className="btn btn-ghost" onClick={() => close()}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-6">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
  
  export default UpdateServicesModelBody;
