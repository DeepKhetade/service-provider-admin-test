// import routes from '../routes/sidebar'
import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';
import { getUserModuleRoute } from '../features/Routing/routingSlice';
import { useEffect, useState } from 'react';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import { icons } from "../routes/sidebar"
const iconClasses = `h-6 w-6`

function LeftSidebar({ allRoutes }) {
    const location = useLocation();
    // const [allRoutes, setallRoutes] = useState(routes)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getUserModuleRoute()).then((result) => {
    //         setallRoutes([...allRoutes, {
    //             path: "",
    //             icon: <DocumentIcon className={`${iconClasses} inline`} />,
    //             name: "user module",
    //             submenu: result.payload
    //         }])
    //     })
    // }, []
    // )


    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    return (
        <div className="drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-72 bg-base-100 text-base-content">
                <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-3 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-2 font-semibold text-xl">

                    <Link to={'/app/welcome'}>
                        <img className="mask mask-squircle w-10" src="/logos.png" alt="DashWind Logo" />Service Provider</Link> </li>
                {
                    allRoutes.map((route, k) => {
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route} /> :
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                            {route.icon ? route.icon : icons[route.iconName]} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar