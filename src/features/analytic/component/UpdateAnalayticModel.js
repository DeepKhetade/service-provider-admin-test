import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { updateAnalytic } from "../analyticSlice";
import { useFormik } from "formik";
import { addAnalyticSchema } from "../../../schemas";

function UpdateAnalyticModel({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch();
  const [analyticObj, setAnalyticObj] = useState({
    analyticName: extraObject.analyticName ? extraObject.analyticName : "",
    description: extraObject.description ? extraObject.description : "",
  });

  const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: analyticObj,
    validationSchema: addAnalyticSchema,
    updateValue: setAnalyticObj,
    onSubmit: (values) => {
      const updateValue = {
        analyticName: values.analyticName,
        description: values.description,
      };
      console.log("extraObject", extraObject);
      dispatch(updateAnalytic({ payload: updateValue, id: extraObject._id }))
        .then(() => {
          dispatch(
            showNotification({ message: "Updated Succesfully ", status: 1 })
          );
          closeRightDrawer();
        })
        .catch(() => {
          dispatch(showNotification({ message: "API error", status: 1 }));
          closeRightDrawer();
        });
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex ... mt-4">
          <div className="w-1/2 ... ">
            <label
              htmlFor="analytic-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Analytic Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="analyticName"
                id="analytic-name"
                placeholder="Analytic Name"
                value={values.analyticName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-96  sm:80"
              />
              <div style={{ color: "red" }}>{errors.analyticName}</div>
            </div>
          </div>
          <div className="w-1/2 ... ">
            <label
              htmlFor="analytic-description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Analytic Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="description"
                id="analytic-description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered lg:w-96 sm:80"
              />
              <div style={{ color: "red" }}>{errors.description}</div>
            </div>
          </div>
        </div>

        <div className="modal-action relative bottom-0 top-60">
          <button className="btn btn-ghost" onClick={() => closeRightDrawer()}>
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

export default UpdateAnalyticModel;
