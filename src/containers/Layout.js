import PageContent from "./PageContent"
import LeftSidebar from "./LeftSidebar"
import routes from '../routes/sidebar'
import pathComponent from '../routes/index'
import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from './RightSidebar'
import { useEffect, useState, lazy } from "react"
import { removeNotificationMessage } from "../features/common/headerSlice"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import 'react-notifications/lib/notifications.css';
import ModalLayout from "./ModalLayout"
// import UpdateDrawer from "../features/Roles/components/UpdateDrawer"
import { getRoutes, getUserModuleRoute } from "../features/Routing/routingSlice"
import { routesData } from "../routes/index"
// const AboutUs = lazy(() => import("../pages/protected/AboutUs"))
const iconClasses = `h-6 w-6`
// const dynamicComponentsNames = ["AboutUs"]

function Layout() {
  const dispatch = useDispatch()
  const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header)
  const [allRoutes, setallRoutes] = useState(routes)
  const [pathRoutes, setPathRoutes] = useState([])


  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success')
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error')
      dispatch(removeNotificationMessage())
    }
  }, [newNotificationMessage])
  // console.log("+++++DynamicComponent>>>>>>>", DynamicComponent)
  useEffect(() => {
    // console.log("=====>this iis working>>>>>>>>>")
    dispatch(getRoutes()).then(result => {
      let paths = []
      for (const ele of result.payload) {
        paths.push({
          path: ele.routingPath,
          component: routesData[ele.routingComponent]
        })
      }
      setPathRoutes([...pathComponent, ...paths])
    });
    dispatch(getUserModuleRoute()).then((result) => {
      //console.log("=====>resultresultresult>>>>>>>>>", result.payload)

      // let routesPath = []
      // result.payload.forEach(element => {
      //   if (dynamicComponentsNames.includes(element.componentName)) {
      //     routesPath.push({
      //       path: element.path.replace("/app/", "/"),
      //       component: element.componentName
      //     })
      //   }
      // });
      // const routesPath = result.payload?.map((item) => {
      //   return {
      //     path: item.path.replace("/app/", "/"),
      //     component: DynamicComponent
      //   }
      // })
      // console.log("=====>result.payload>>>>>>>>>", result.payload)

      // setPathRoutes([...pathComponent, ...routesPath])

      setallRoutes([...allRoutes, ...result.payload.data])
      // setallRoutes([...allRoutes, {
      // ...result.payload[0]
      // path: "",
      // icon: <DocumentIcon className={`${iconClasses} inline`} />,
      // name: "user module",
      // submenu: 
      // }])
    })
  }, []
  )

  return (
    <>
      { /* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent routes={pathRoutes} />
        <LeftSidebar allRoutes={allRoutes} />

      </div>

      { /* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />

      {/* <UpdateDrawer /> */}
    </>
  )
}

export default Layout