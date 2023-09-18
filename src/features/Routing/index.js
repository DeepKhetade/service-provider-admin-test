import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { routingData } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { openModal } from "../common/modalSlice";
import { openRightDrawer } from "../common/rightDrawerSlice";
import { getRoutes } from "./routingSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES, RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];
  const dispatch = useDispatch();

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const OpenAddNewRoutingModal = () => {
    dispatch(
      openRightDrawer({
        header: "Add New Route",
        bodyType: RIGHT_DRAWER_TYPES.ROUTE_ADD_NEW,
        // extraObject: extraObject
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <div className="inline-block float-right">
        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => OpenAddNewRoutingModal()}
        >
          Add New
        </button>
      </div>

      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Routing() {
  const [trans, setTrans] = useState(routingData);
  const dispatch = useDispatch();
  const { routeData } = useSelector((state) => state.routes);

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  const removeFilter = () => {
    setTrans(routingData);
  };

  const applyFilter = (params) => {
    let filteredRouting = routingData.filter((t) => {
      return t.location === params;
    });
    setTrans(filteredRouting);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredRouting = routingData.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredRouting);
  };

  const OpenUpdateRouteModal = (data) => {
    dispatch(
      openRightDrawer({
        header: "Update Route",
        bodyType: RIGHT_DRAWER_TYPES.ROUTE_UPDATE_NEW,
        extraObject: data,
      })
    );
  };

  const openViewRouteModal = (data) => {
    dispatch(
      openRightDrawer({
        header: "View Route",
        bodyType: RIGHT_DRAWER_TYPES.ROUTE_VIEW_DATA,
        extraObject: data
      })
    )
  }

  const OpenDeleteRouteModal = (data) => {
    dispatch(openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to delete this Routing?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.ROUTING_DELETE,
        _id: data
      }
    }))
  }

  return (
    <>
      <TitleCard
        title="All Roles"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Routing Name</th>
                <th>Routing Path</th>
                <th>Routing Component</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {routeData.length > 0 && routeData.map((l, k) => (
                <tr key={l._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      {/* <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div> */}
                      <div>
                        <div className="font-bold">{l.routingName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{l.routingPath === "" ? "Parent" : l.routingPath}</td>
                  <td>{l.routingComponent === "" ? "Parent" : l.routingComponent}</td>

                  <td>{moment(l.createdAt).format("D MMM")}</td>
                  {/* <td>{l.role}</td> */}
                  <td>
                    <button className="btn btn-square btn-ghost" onClick={() => openViewRouteModal(l)}>
                      <EyeIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => OpenUpdateRouteModal(l)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => OpenDeleteRouteModal(l._id)
                      }
                    >
                      <TrashIcon className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Routing;