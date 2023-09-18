import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";

import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES,} from "../../utils/globalConstantUtil";
import { showRoles} from "./roleSlice";

import { openRightDrawer } from "../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import Pagination from "../../containers/Pagination";



const TopSideButtons = ({ removeFilter, applyFilter, applySearch, page, limit }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
 

  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openRightDrawer({
        header: "Add New Role",
        bodyType: RIGHT_DRAWER_TYPES.ROLE_ADD_NEW,
      })
    );
  };

  // const showFiltersAndApply = (params) => {
  //   applyFilter(params);
  //   setFilterParam(params);
  // };



  const removeAppliedFilter = () => {
    removeFilter()
    setFilterParam("")
    setSearchText("")
    // clearSearch()
  };



;

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
        className="focus:border-none outline-none"
        styleClass="mr-4"
        setSearchText={setSearchText}
        applySearch={applySearch}
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
  
    </div>
  );
};

function Transactions() {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const limit = 5

  let totalItems = roles?.data?.count
  const removeFilter = () => {
    // setTrans(rolesData)
  };

  const applyFilter = (params) => {
   
  };

  // Opening right sidebar for notification
  const update = (data) => {
    dispatch(
      openRightDrawer({
        header: "Update Role",
        bodyType: RIGHT_DRAWER_TYPES.UPDATE_ROLE_DRAWER,
        extraObject: data,
      })
    );
  };

  // 1)opening view sidebar
  const viewSidebar = (l) => {
    dispatch(
      openRightDrawer({
        header: "View Roles",
        bodyType: RIGHT_DRAWER_TYPES.VIEW_RIGHT_SIDE_DRAWER,
        extraObject: l,
      })
    );
  };

  // Search according to name
  const applySearch = (value) => {

 
    setSearch(value)
  };

  // for single delete
  const deleteById = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this role?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ROLE_DELETE,
          _id: id,
        },
      })
    );
  };


  let time;
  useEffect(() => {
    // console.log(search)
    if (search === "") {
      dispatch(showRoles({ page, limit, search }));
    }
    else {
      clearTimeout(time)
      time = setTimeout(() => {
        dispatch(showRoles({ page, limit, search }));
      }, 1000)
    }

  }, [search]);

  useEffect(() => {
    dispatch(showRoles({ page, limit, search }));
  }, []);

  const handlePage = (page) => {
    setPage(page);
    dispatch(showRoles({ page, limit, search }));
  };
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
            page={page}
            limit={limit}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th> Roles Name</th>
                <th>Description</th>

                <th>Created Date</th>
                <th>Created by</th>
                <th>Updated by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.data?.allRoles.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{l.role}</div>
                      </div>
                    </td>

                    <td>
                      <span
                        className=" transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500  dark:active:text-primary-600"
                        data-te-toggle="tooltip"
                        title={l.description}
                      >
                        {l.description.slice(0, 20)}
                      </span>
                    </td>

                    <td>{moment(l.createdAt).format("D MMM")}</td>
                    <td>{l.createdBy}</td>
                    <td>{l.updatedBy}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={() => viewSidebar(l)}
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={() => update(l)}
                      >
                        <PencilIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={() => deleteById(l._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}


              {roles.data?.allRoles.length === 0 ? (
                <div className="mt-3  ">
                  <p className="flex  justify-center">No record found</p></div>
              ) : null}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalItems}
      ></Pagination>
    </>
  );
}

export default Transactions;
