import moment from "moment";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";

import SearchBar from "../../components/Input/SearchBar";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

import EyeIcon from "@heroicons/react/24/outline/EyeIcon";

import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

import { openModal } from "../common/modalSlice";

import {

  CONFIRMATION_MODAL_CLOSE_TYPES,

  MODAL_BODY_TYPES,

} from "../../utils/globalConstantUtil";

import { showUser } from "./userSlice";

import { openRightDrawer } from "../common/rightDrawerSlice";

import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";

import Pagination from "../../containers/Pagination";

// import ITEMS_PER_PAGE from "../../containers/Pagination"

 

 

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

  const [setFilterParam] = useState("");

  const [searchText, setSearchText] = useState("");

  // const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {

    dispatch(

      openRightDrawer({

        header: "Add New User",

        bodyType: RIGHT_DRAWER_TYPES.ADD_NEW_USER,

      })

    );

  };

  // const showFiltersAndApply = (params) => {

  //   applyFilter(params);

  //   setFilterParam(params);

  // };

  // const removeAppliedFilter = () => {

  //   removeFilter();

  //   setFilterParam("");

  //   setSearchText("");

  // };

  useEffect(() => {

    if (searchText === "") {

      return

    } else {

      applySearch(searchText);

    }

  });

 

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

        applySearch={applySearch}

      />
    

    </div>

  );

};

 

function Transactions() {

  const dispatch = useDispatch();

  const { users} = useSelector((state) => state.users);

  const [page, setPage] = useState(1);

  const [search,setSearch]=useState("")

  const limit=5

  let totalItems=users?.data?.total

  const removeFilter = () => {};

  const update = (data) => {

    dispatch(

      openRightDrawer({

        header: "Update User",

        bodyType: RIGHT_DRAWER_TYPES.UPDATE_USER,

        extraObject: data,

      })

    );

  };

  const viewSidebar = (l) => {

    dispatch(

      openRightDrawer({

        header: "View User",

        bodyType: RIGHT_DRAWER_TYPES.VIEW_USER,

        extraObject: l,

      })

    );

  };

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

          message: `Are you sure you want to delete this user?`,

          type: CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE,

          _id: id,

        },

      })

    );

  };

 

  let time;

  useEffect(() => {

      // console.log(search)

       if(search !== ""){

        dispatch(showUser({page,limit,search}));

       }

       else{

        clearTimeout(time)

        time =setTimeout(()=>{

          dispatch(showUser({page,limit,search}));

        },1000)

       }

   

  }, [search]);

 

  // useEffect(()=>{

  //   if(search !== ""){

  //     dispatch(showUser({page,limit,search}))

  //   }

  // },[search])

 

  useEffect(() => {

    dispatch(showUser({page,limit,search}));

  }, []);

 

  const handlePage = (page) => {

    setPage(page);

    dispatch(showUser({page,limit,search}));

  };

 

  return (

    <>

      <TitleCard

        title="All Users"

        topMargin="mt-2"

        TopSideButtons={

          <TopSideButtons

            applySearch={applySearch}

            // applyFilter={applyFilter}

            removeFilter={removeFilter}

          />

        }

      >

        <div className="overflow-x-auto w-full">

          <table className="table w-full">

            <thead>

              <tr>

                <th>First Name</th>

                <th>Middle Name</th>

                <th>Last Name</th>

                <th>Gender</th>

                <th>Email Id</th>

                <th>Role</th>

                <th>Created Date</th>

                <th>Created by</th>

                <th>Updated by</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {users?.data?.UserData.map((l, k) => {

                return (

                  <tr key={k}>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div >{l.firstName}</div>

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div >{l.middleName}</div>

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div>{l.lastName}</div>

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div >{l.gender}</div>

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div className="font-bold">{l.email}</div>

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center space-x-3">

                        <div className="font-bold">{l.role}</div>

                      </div>

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





 
              {users?.data?.UserData.length ===0 ? (
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