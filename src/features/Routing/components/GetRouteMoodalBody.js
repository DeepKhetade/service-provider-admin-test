import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
const { useState } = require("react");
const { useDispatch } = require("react-redux");


function GetRouteModalBody({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch;
  const [errorMessage, setErrorMessage] = useState("")
  const [routeObj, setRouteObj] = useState({
    icon: extraObject.icon ? extraObject.icon : "",
    parentNode: extraObject.parentNode ? extraObject.parentNode : "",
    routingName: extraObject.routingName ? extraObject.routingName : "",
    routingPath: extraObject.routingPath ? extraObject.routingPath : "",
    routingComponent: extraObject.routingComponent ? extraObject.routingComponent : ""
  })

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("")
    setRouteObj({ ...routeObj, [updateType]: value })
  }


  return (
    <>

      <InputText type="text" defaultValue={routeObj.routingName} updateType="routingName" containerStyle="mt-4" labelTitle="Routing Name" updateFormValue={updateFormValue} />
      {routeObj.routingPath !== "" && <InputText type="text" defaultValue={routeObj.routingPath} updateType="routingPath" containerStyle="mt-4" labelTitle="Routing Path" updateFormValue={updateFormValue} />}
      {routeObj.routingComponent !== "" && <InputText type="text" defaultValue={routeObj.routingComponent} updateType="routingComponent" containerStyle="mt-4" labelTitle="Routing Component" updateFormValue={updateFormValue} />}
      <InputText type="text" defaultValue={routeObj.icon} updateType="icon" containerStyle="mt-4" labelTitle="Routing Icon" updateFormValue={updateFormValue} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      {/* <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeRightDrawer()}>CLOSE</button>
      </div> */}
    </>
  )

}

export default GetRouteModalBody