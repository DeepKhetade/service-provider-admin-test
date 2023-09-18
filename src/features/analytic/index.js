import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { routingData } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { openModal } from "../common/modalSlice";
import { getAnalytic, deleteAnalytic } from "./analyticSlice";
import axios from "axios";
import {
  _MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
  RIGHT_DRAWER_TYPES,
} from "../../utils/globalConstantUtil";
import { openRightDrawer } from "../common/rightDrawerSlice";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["ankit", "London", "Canada", "Peru", "Tokyo"];
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

  const OpenAddNewAnalyticModal = () => {
    dispatch(
      openRightDrawer({
        header: "Add New Analytic",
        bodyType: RIGHT_DRAWER_TYPES.ANALYTIC_ADD,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <div className="inline-block float-right">
        <button
          className="btn px-6 btn-sm normal-case btn-primary ml-2"
          onClick={() => OpenAddNewAnalyticModal()}
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
  const [trans, setTrans] = useState(routingData);
  const dispatch = useDispatch();
  const { analytic } = useSelector((state) => state.analytic);

  // useEffect(() => {
  //   (async ()=> {
  //     try {
  //       const result = await axios.get("http://localhost:8000/api/v1/getAllRoute");
  //       setList(result.data)
  //     } catch (error) {
  //       alert("Unable to get data.")
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    dispatch(getAnalytic());
  }, []);

  const removeFilter = () => {
    setTrans(routingData);
  };

  const applyFilter = (params) => {
    let filteredTransactions = routingData.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = routingData.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  const UpdateAnalayticModel = (data) => {
    dispatch(
      openRightDrawer({
        header: "Update Analytic",
        bodyType: RIGHT_DRAWER_TYPES.ANALYTIC_UPDATE_NEW,
        extraObject: data,
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Analytic"
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
                <th>Analytics Name</th>
                <th>Analytics Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {analytic.map((l, k) => {
                return (
                  <tr key={l}>
                    <td>
                      <div className="flex items-center space-x-3">
                        {/* <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div> */}
                        <div>
                          <div className="font-bold">{l.analyticName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.description}</td>

                    <td>{moment(l.createdAt).format("D MMM")}</td>
                    {/* <td>{l.role}</td> */}
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => UpdateAnalayticModel(l, "view")}
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => UpdateAnalayticModel(l)}
                      >
                        <PencilIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          dispatch(deleteAnalytic(l._id));
                          dispatch(
                            showNotification({
                              message: "analytic Deleted!",
                              status: 1,
                            })
                          );
                        }}
                      >
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
