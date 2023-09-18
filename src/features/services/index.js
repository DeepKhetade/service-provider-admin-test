import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { rolesData } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { deleteLead, getLeadsContent } from "./servicesSlice";
import { openRightDrawer } from "../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openRightDrawer({
        header: "Add New Sevices",
        bodyType: RIGHT_DRAWER_TYPES.SERVICE_ADD_NEW,
      })
    );
  };

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

  return (
    <div className="inline-block float-right ">
      <div className="inline-block float-right ml-2">
        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => openAddNewLeadModal()}
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

function Transactions() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  const [trans, setTrans] = useState(rolesData);

  const removeFilter = () => {
    setTrans(rolesData);
  };

  const applyFilter = (params) => {
    let filteredTransactions = rolesData.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Opening right sidebar for notification
  const open = () => {
    dispatch(
      openRightDrawer({
        header: "Update Service",
        bodyType: RIGHT_DRAWER_TYPES.UPDATE_SERVICE,
      })
    );
  };

  // 1)opening view sidebar
  const viewService = () => {
    dispatch(
      openRightDrawer({
        header: "View service",
        bodyType: RIGHT_DRAWER_TYPES.VIEW_SERVICES,
      })
    );
  };
  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = rolesData.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  return (
    <>
      <TitleCard
        title="All Services"
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
                <th> Services Name</th>
                <th>Services Description</th>
                <th>Created Date</th>
                <th>Created by</th>
                <th>Updated by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{l.name}</div>
                      </div>
                    </td>
                    <td>{l.email}</td>

                    <td>{moment(l.date).format("D MMM")}</td>
                    <td>Nilesh</td>
                    <td>saloni</td>
                    <td>
                    <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={() => viewService()}
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={() => open()}
                      >
                        <PencilIcon className="w-5" />
                      </button>
                      <button className="btn btn-square btn-ghost btn-sm">
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Transactions;
