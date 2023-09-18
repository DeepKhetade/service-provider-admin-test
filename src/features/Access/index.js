import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { rolesData } from "../../utils/dummyData";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { clearAccessData, getAccessWithPagination, getRoles, removeAccess, updateAccess } from "./accessSlice";

import Pagination from "../../containers/Pagination";

const LIMIT = 5

const TopSideButtons = ({ removeFilter, applyFilter, applySearch, setRole }) => {
  const [filterParam, setFilterParam] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.access);
  useEffect(() => {
    dispatch(getRoles())
  }, [])



  const showFiltersAndApply = (params) => {
    const selectedItem = { _id: params._id, role: params.role };
    applyFilter(params);
    // setFilterParam(prev => [...prev, params]);
    // setFilterParam(prev => [...new Set([...prev, params])]);
    // setFilterParam(prev => {
    //   // let values = new Set([...prev]);
    //   // let newArr = [...prev];
    //   // if (!values.has(selectedItem)) {
    //   //   newArr.push(selectedItem)
    //   // }
    //   console.log("======[...new Set([...prev, selectedItem])]>>>>>>", [...new Set([...prev, selectedItem])]);
    //   return [...new Set([...prev, selectedItem])]
    // })
    setFilterParam((prev) => {
      const filterData = prev.filter(ele => ele._id === selectedItem._id);
      const newArr = [...prev];
      if (filterData.length === 0) {
        dispatch(getAccessWithPagination({ id: selectedItem._id, page: 1, limit: LIMIT }))
        newArr.push(selectedItem)
      }
      return newArr;
    })
    setRole(prev => {
      const filterData = prev.filter(ele => ele._id === selectedItem._id);
      const newArr = [...prev];
      if (filterData.length === 0) {
        newArr.push(selectedItem)
      }
      return newArr;
    });
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam([]);
    setSearchText("");
    setRole([]);
    dispatch(clearAccessData())
  };

  const removeElementFilter = (params) => {
    setFilterParam(prev => prev.filter(item => item._id !== params._id))
    setRole(prev => prev.filter(item => item._id !== params._id));
    dispatch(removeAccess(params._id))
  }

  // useEffect(() => {
  //   if (roles[0]?.role) {
  //     setRole([{ _id: roles[0]?._id, role: roles[0]?.role }])
  //     setFilterParam([{ _id: roles[0]?._id, role: roles[0]?.role }])
  //   }
  // }, [roles])

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right ">
      {filterParam.length > 0 && filterParam.map(ele => (
        <button
          onClick={() => removeElementFilter(ele)}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {ele.role}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      ))}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline w-52">
          {/* <FunnelIcon className="w-5 mr-2" /> */}
          Select Role
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {roles.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l.role}</a>
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

function Access() {
  const [trans, setTrans] = useState(rolesData);
  const [role, setRole] = useState([])
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.access);

  const removeFilter = () => {
    setTrans(rolesData);
  };

  const applyFilter = (params) => {
    let filteredAccess = rolesData.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredAccess);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredAccess = rolesData.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredAccess);
  };

  useEffect(() => {
    dispatch(clearAccessData());
  }, []);

  const updateAccessData = (data) => {
    dispatch(updateAccess({ payload: data.item, id: data._id, roleId: data.roleId, page: data.page, limit: data.limit }))
  }

  const handlePage = (page, id) => {
    dispatch(getAccessWithPagination({ id: id, page: page, limit: LIMIT }))
  }

  return (
    <>
      <TitleCard
        title="All Access"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
            setRole={setRole}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          {
            role.length > 0 && role.map((ele) => (

              <table className="table w-full">
                <thead>
                  <tr>

                    <th>{ele.role}</th>
                    <th>View</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Private</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((l, k) => (
                    <>
                      {
                        Object.keys(l).length > 0 && Object.keys(l).map((roleId) => (
                          <>
                            {
                              ele._id === roleId && (
                                <>
                                  {
                                    l[roleId].data.map((ele) => (
                                      <tr key={k}>
                                        <td>
                                          <label className="label-text">{ele.route}</label>
                                        </td>

                                        <td>
                                          <div className="flex">
                                            <label htmlFor="check-box-1" className="pr-3">
                                              <input
                                                type="checkbox"
                                                id="check-box-1"
                                                className="checkbox checkbox-primary"
                                                onChange={(e) => updateAccessData({ _id: ele._id, item: { view: e.target.checked }, roleId: ele.roleId, page: l[roleId].page, limit: l[roleId].limit })}
                                                checked={ele.view}
                                              />
                                            </label>
                                            <label className="label-text">view</label>
                                          </div>
                                        </td>

                                        <td>
                                          <div className="flex">
                                            <label htmlFor="check-box-1" className="pr-3">
                                              <input
                                                type="checkbox"
                                                id="check-box-1"
                                                className="checkbox checkbox-primary"
                                                onChange={(e) => updateAccessData({ _id: ele._id, item: { create: e.target.checked }, roleId: ele.roleId, page: l[roleId].page, limit: l[roleId].limit })}
                                                checked={ele.create}
                                              />
                                            </label>
                                            <label className="label-text"> create</label>
                                          </div>

                                        </td>
                                        <td>
                                          <div className="flex">
                                            <label htmlFor="check-box-1" className="pr-3">
                                              <input
                                                type="checkbox"
                                                id="check-box-1"
                                                className="checkbox checkbox-primary"
                                                onChange={(e) => updateAccessData({ _id: ele._id, item: { edit: e.target.checked }, roleId: ele.roleId, page: l[roleId].page, limit: l[roleId].limit })}
                                                checked={ele.edit}
                                              />
                                            </label>
                                            <label className="label-text">edit</label>
                                          </div>
                                        </td>

                                        <td>
                                          <div className="flex">
                                            <label htmlFor="check-box-1" className="pr-3">
                                              <input
                                                type="checkbox"
                                                id="check-box-1"
                                                className="checkbox checkbox-primary"
                                                onChange={(e) => updateAccessData({ _id: ele._id, item: { private: e.target.checked }, roleId: ele.roleId, page: l[roleId].page, limit: l[roleId].limit })}
                                                checked={ele.private}
                                              />
                                            </label>
                                            <label className="label-text">private</label>
                                          </div>

                                        </td>
                                      </tr>
                                    ))
                                  }
                                  <tr>
                                    <td colSpan={5}>
                                      <div className="w-full">
                                        <Pagination page={l[roleId].page} handlePage={(page) => handlePage(page, roleId)} totalItems={l[roleId].total} />
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            }
                          </>
                        ))
                      }
                    </>
                  )
                  )}
                </tbody>
              </table>
            ))
          }
        </div>
      </TitleCard>
    </>
  );
}

export default Access;