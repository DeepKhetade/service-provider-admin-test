import React from 'react';
import { Change_Password } from "../../apiConfig/ChangePasswordSlice";
import { useDispatch, } from "react-redux";
import { useFormik } from "formik";
import { changePassword } from "../../schemas";
import { useParams } from 'react-router-dom';
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom"
import { NotificationManager } from 'react-notifications';

const initialValues = {
  // currentPassword: "",
  password: "",
  confirm_password: "",
};

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams()

  const { values, errors, touched, handleBlur, handleSubmit, handleChange, } = useFormik({
    initialValues: initialValues,
    validationSchema: changePassword,
    onSubmit: (values) => {

      console.log(values, id)
      dispatch(Change_Password({ values, id })).then((res) => {
        console.log(res, "");
        if (res?.payload?.code === 200) {
          // dispatch(showNotification({ message: res.payload.message, status: 1 }))
          NotificationManager.success('Password Changed Successfully', 'success!', 2000);
          navigate("/login")
        }
        else {

          dispatch(showNotification({ message: res.message, status: 0 }))
        }
      })
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-sm  shadow-xl my-4">
        {/* max-w-3xl */}

        <div className="  bg-base-100 rounded-xl">
          <div className="py-20 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Change Password
            </h2>

            <form onSubmit={handleSubmit}>


              <div className="mb-4">
                <div className="mt-2">
                  <label
                    htmlFor="firname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    id="firname"
                    className="input input-bordered w-full max-w-xs  focus:border-none outline-none"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }} className="text-sm">{errors.password}</div>
                  ) : null}
                  {/* <div style={{ color: "red" }}>{errors.password}</div> */}
                </div>
              </div>

              <div className="mb-4">
                <div className="mt-2">
                  <label
                    htmlFor="firname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm New Password"
                    id="firname"
                    className="input input-bordered w-full max-w-xs  focus:border-none outline-none"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <div style={{ color: "red" }} className="text-sm">{errors.confirm_password}</div>
                  ) : null}
                  {/* <div style={{ color: "red" }}>{errors.confirm_password}</div> */}
                </div>
              </div>



              <button
                type="submit"
                className="btn mt-2 w-full btn-primary"
                onSubmit={handleSubmit}
              >
                Change Password
              </button>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
