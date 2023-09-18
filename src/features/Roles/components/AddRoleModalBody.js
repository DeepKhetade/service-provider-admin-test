import { useDispatch } from "react-redux"

import { showNotification } from "../../common/headerSlice"

import { createRoles, showRoles } from "../roleSlice"

import { useFormik } from 'formik'

import { addRoleSchema } from "../../../schemas"



 

 

const initialValues = {

  role: "",

  description: "",

};

let page=1

let limit=5

let search=""

function AddRoleModalBody({ closeModal }) {

  const dispatch = useDispatch();
  const { values, errors,touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,

    validationSchema: addRoleSchema,

    onSubmit:  (values) => {
    console.log(values);
     

      // const createdBy = JSON.parse(localStorage.getItem('user') || "")

      // Object.assign(values, { createdBy: createdBy.user })

        dispatch(createRoles(values)).then((res)=>{

          console.log(res)

        if(res.payload.code === 200){

          // dispatch(showRoles(""))

          dispatch(showRoles({page,limit,search}));

          dispatch(showNotification({ message: "New Role Added!", status: 1 }))

          closeModal()

        }

        if(res.payload.code === 400){

          dispatch(showNotification({ message: res.payload.message, status: 0 }))

        }

      })

    }

  })

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
              {errors.role && touched.role ? (
             <div  style={{ color: "red" }} className="text-sm lg:w-70 md:w-56 sm:52 h-9">{errors.role}</div>
           ) : null}
           
            </div>

          </div>

          <div className="mt-4">

            <label

              htmlFor="last-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Description

            </label>

            <div className="mt-2 ">

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

          <button className="btn btn-ghost" onClick={() => closeModal()}>

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

export default AddRoleModalBody;

 