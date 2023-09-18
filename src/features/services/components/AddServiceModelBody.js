import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../servicesSlice"
import TextAreaInput from '../../../components/Input/TextAreaInput'
import { useFormik } from 'formik'
import { addRoleSchema } from "../../../schemas"

const initialValues = {
    role: "",
    description: "",

}

function AddRoleModalBody({ closeModal }) {
    // const dispatch = useDispatch()
    // const [loading, setLoading] = useState(false)
    // const [errorMessage, setErrorMessage] = useState("")
    // const [leadObj, setLeadObj] = useState(initialValues)

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: addRoleSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    // console.log(forMik)

    const saveNewLead = () => {
        // if(leadObj.role.trim() === "")return setErrorMessage("role is required!")
        // else if(leadObj.description.trim() === "")return setErrorMessage("description is required!")
        // else{
        //     let newLeadObj = {

        //         "role": leadObj.role,
        //         "description": leadObj.last_name,

        //     }
        //     dispatch(addNewLead({newLeadObj}))
        //     dispatch(showNotification({message : "New Role Added!", status : 1}))
        //     closeModal()
        // }
    }

    // const updateFormValue = ({updateType, value}) => {
    //     setErrorMessage("")
    //     setLeadObj({...leadObj, [updateType] : value})
    // }

    return (
        <>

            <form onSubmit={handleSubmit}>
                {/* <div>


                    <div>

                        <label>Role</label>
                        <input type="text" name="role" placeholder="Role" value={values.role} onChange={handleChange} onBlur={handleBlur} className="input input-bordered w-full max-w-xs" />
                        <ErrorText styleClass="">{errors.role}</ErrorText>
                    </div>

                    <div>
                        <label>description</label>

                        <textarea className="textarea textarea-bordered" value={values.description} onChange={handleChange} onBlur={handleBlur} name="description" placeholder="Description"></textarea>

                    </div>

                </div> */}
                
                <div className="flex ... mt-4">
                    <div className="w-1/2 ... ">

                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Service Name</label>
                        <div className="mt-2">
                            <input type="text" name="role" id="first-name" placeholder="Service" value={values.role} onChange={handleChange} onBlur={handleBlur} className="input input-bordered w-96" />
                            <div style={{ color: "red" }}>{errors.role}</div></div>

                    </div>
                    <div className="w-1/2 ... ">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <textarea className="textarea textarea-bordered w-full h-10" id="last-name" value={values.description} onChange={handleChange} onBlur={handleBlur} name="description" placeholder="Description"></textarea>
                        </div>

                    </div>
                </div>


                {/* <ErrorText styleClass="mt-16">{errorMessage}</ErrorText> */}
                <div className="modal-action relative bottom-0 top-60">
                    <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
                </div>
            </form>



        </>
    )
}

export default AddRoleModalBody