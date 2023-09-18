import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addRoute, getChildNodes, getParentNodes, getRoutes } from "../routingSlice"
import { closeRightDrawer } from "../../common/rightDrawerSlice";
import { routesData } from "../../../routes";
import { icons } from "../../../routes/sidebar"

const INITIAL_ROUTE_OBJ = {
    routingName: "",
    routingPath: "",
    routingComponent: "",
    parentNode: "",
    childNode: "",
    icon: ""
}

function AddRouteModalBody({ closeRightDrawer, extraObject }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        routingName: "",
        routingPath: "",
        routingComponent: "",
        icon: ""
    })
    // const [routeObj, setRouteObj] = useState(INITIAL_ROUTE_OBJ)
    const [routeObj, setRouteObj] = useState(INITIAL_ROUTE_OBJ)
    const { parentNodeData, child, routeData } = useSelector(state => state.routes);
    const [childPath, setChildPath] = useState("");

    useEffect(() => {
        dispatch(getRoutes());
        dispatch(getParentNodes())
    }, [])


    const saveNewRouting = () => {
        if (routeObj.routingName.trim() === "") setErrorMessage(prev => {
            return { ...prev, routingName: "Routing name is required" }
        })
        if (routeObj.routingPath.trim() === "") setErrorMessage(prev => {
            return { ...prev, routingPath: "Routing path is required" }
        })
        if (routeObj.routingComponent.trim() === "") setErrorMessage(prev => {
            return { ...prev, routingComponent: "Routing component is required" }
        })
        if (routeObj.icon === "") setErrorMessage(prev => {
            return { ...prev, icon: "Routing icon is required" }
        })


        if ((routeObj.routingName && routeObj.routingComponent && routeObj.icon && routeObj.routingPath) !== "") {
            let newRouteObj = {
                "routingName": routeObj.routingName,
                "routingPath": routeObj.routingPath,
                "routingComponent": routeObj.routingComponent,
                "icon": routeObj.icon
            }

            let paths = newRouteObj.routingPath.split("/");

            paths = paths.filter(item => item !== "");

            if (paths.length > 3) {
                setErrorMessage("Allowed route path upto 3 '/'.")
            }

            dispatch(addRoute(newRouteObj))
            dispatch(showNotification({ message: "New Route Added!", status: 1 }))
            closeRightDrawer()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage(prev => {
            return { ...prev, [updateType]: "" }
        })
        setRouteObj({ ...routeObj, [updateType]: value })
    }

    const getChildList = (parentNode) => {
        dispatch(getChildNodes(parentNode))
    }

    const setChildPathName = (id) => {
        child.forEach((item) => {
            if (item._id === id) {
                setChildPath(item.routingPath)
            }
        })
    }

    // flex flex-row items-center justify-between space-x-2

    return (
        <>
            <div className="grid md:grid-cols-2 sm:grid-col-1 gap-2">
                <div className="w-full">
                    <InputText type="text" defaultValue={routeObj.routingName} updateType="routingName" containerStyle="mt-4" labelTitle="Routing Name" updateFormValue={updateFormValue} />
                    <div className="text-base text-rose-300 p-2">
                        {errorMessage?.routingName ? errorMessage.routingName : ""}
                    </div>
                </div>

                <div className="w-full">
                    <InputText type="text" defaultValue={routeObj.routingPath} updateType="routingPath" containerStyle="mt-4" labelTitle="Routing Path" updateFormValue={updateFormValue} />
                    <div className="text-base text-rose-300 p-2">
                        {errorMessage?.routingPath ? errorMessage.routingPath : ""}
                    </div>
                </div>

                {/* <InputText type="text" defaultValue={routeObj.routingComponent} updateType="routingComponent" containerStyle="mt-4" labelTitle="Routing Component" updateFormValue={updateFormValue} /> */}
            </div>



            <div className="grid md:grid-cols-2 sm:grid-col-1 gap-2">
                <div className="w-full">
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Routing Component</span>
                        </label>
                        <select className="input  input-bordered w-full " name="routingComponent" onChange={(e) => updateFormValue({ updateType: "routingComponent", value: e.target.value })} >
                            <option value="">Select Routing Component</option>
                            {
                                Object.keys(routesData).map((item) => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-base text-rose-300 p-2">
                        {errorMessage?.routingComponent ? errorMessage.routingComponent : ""}
                    </div>
                </div>

                <div className="w-full">
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Component Icon</span>
                        </label>
                        <select className="input  input-bordered w-full " name="icon" onChange={(e) => updateFormValue({ updateType: "icon", value: e.target.value })} >
                            <option value="">Select Component Icon</option>
                            {
                                Object.keys(icons).map((item) => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-base text-rose-300 p-2">
                        {errorMessage?.icon ? errorMessage.icon : ""}
                    </div>
                </div>


            </div>

            {/* <ErrorText styleClass="mt-16">{errorMessage}</ErrorText> */}

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeRightDrawer()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewRouting()}>Save</button>
            </div>
        </>
    )
}

export default AddRouteModalBody