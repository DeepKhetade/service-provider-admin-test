import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { updateRoute } from "../routingSlice"
import { icons } from "../../../routes/sidebar"
import { routesData } from "../../../routes";


function UpdateRouteModalBody({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [routeObj, setRouteObj] = useState({
    icon: extraObject.icon ? extraObject.icon : "",
    routingComponent: extraObject.routingComponent ? extraObject.routingComponent : "",
    routingName: extraObject.routingName ? extraObject.routingName : "",
    routingPath: extraObject.routingPath ? extraObject.routingPath : "",
    parentNode: extraObject.parentNode ? extraObject.parentNode : "",
  });

  const UpdateRouting = () => {
    // else if (routeObj.routingComponent.trim() === "") return setErrorMessage("Routing Component id is required!")
    // else if (routeObj.routingPath.trim() === "") return setErrorMessage("Routing Path id is required!")
    if (routeObj.routingName.trim() === "") return setErrorMessage("Routing Name is required!")
    else if (routeObj.icon.trim() === "") return setErrorMessage("Icon is required!")
    else {
      let newRoutingObj = {
        "routingName": routeObj.routingName,
        "routingPath": routeObj.routingPath,
        "routingComponent": routeObj.routingComponent,
        "icon": routeObj.icon,
      }
      dispatch(updateRoute({ payload: newRoutingObj, id: extraObject._id }))
      dispatch(showNotification({ message: "Route Updated!", status: 1 }))
      closeRightDrawer()
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("")
    setRouteObj({ ...routeObj, [updateType]: value })
  }



  return (
    <>
      <InputText type="text" defaultValue={routeObj.routingName} updateType="routingName" containerStyle="mt-4" labelTitle="Routing Name" updateFormValue={updateFormValue} />
      {routeObj.routingPath !== "" && <InputText type="text" defaultValue={routeObj.routingPath} updateType="routingPath" containerStyle="mt-4" labelTitle="Routing Path" updateFormValue={updateFormValue} />}
      {/* {routeObj.routingComponent !== "" && <InputText type="text" defaultValue={routeObj.routingComponent} updateType="routingComponent" containerStyle="mt-4" labelTitle="Routing Component" updateFormValue={updateFormValue} />} */}

      <div className={`form-control w-full`}>
        <label className="label">
          <span className={"label-text text-base-content "}>Routing Component</span>
        </label>
        <select className="input  input-bordered w-full " name="routingComponent" onChange={(e) => updateFormValue({ updateType: "routingComponent", value: e.target.value })} >
          <option value="">{routeObj.routingComponent}</option>
          {
            Object.keys(routesData).map((item) => (
              <option value={item}>{item}</option>
            ))
          }
        </select>
      </div>

      <div className={`form-control w-full`}>
        <label className="label">
          <span className={"label-text text-base-content "}>Component Icon</span>
        </label>
        <select className="input  input-bordered w-full " name="icon" onChange={(e) => updateFormValue({ updateType: "icon", value: e.target.value })} >
          <option value="">{routeObj.icon}</option>
          {
            Object.keys(icons).map((item) => (
              <option value={item}>{item}</option>
            ))
          }
        </select>
      </div>

      {/* <InputText type="text" defaultValue={routeObj.icon} updateType="icon" containerStyle="mt-4" labelTitle="Routing Component" updateFormValue={updateFormValue} /> */}

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeRightDrawer()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => UpdateRouting()}>Update</button>
      </div>
    </>
  )
}

export default UpdateRouteModalBody