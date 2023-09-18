import { useDispatch } from "react-redux";

import { closeRightDrawer } from "../../common/rightDrawerSlice";

 

function ViewRoleDrawer({ extraObject }) {

  const dispatch = useDispatch();

  const roles = extraObject;

 

  const closeModal = (e) => {

    dispatch(closeRightDrawer(e));

  };


  return (

    <>

      <form>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4">

          <div className="w-1/2 ...  mt-4">

            <label

              htmlFor="first-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Role Name

            </label>

            <div className="mt-2">

              <input

                type="text"

                readOnly

                name="role"

                id="first-name"

                placeholder="Role"

                value={roles.role}

                className="input input-bordered xl:w-96 lg:w-80 md:w-62 sm:w-62   focus:border-none outline-none"

              />

            </div>

          </div>

          <div className="mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-col-1 lg:gap-0 md:gap-1">

            <label

              htmlFor="last-name"

              className="block text-sm font-medium leading-6 text-gray-900"

            >

              Description

            </label>

            <div className="mt-2">

              <textarea

                className="textarea textarea-bordered lg:w-11/12 md:w-9/12 h-9 focus:border-none outline-none"

                rows="40"

                readOnly

                value={roles.description}

                id="last-name"

                name="description"

                placeholder="Description"

              ></textarea>

            </div>

          </div>

        </div>

 

        <div className="modal-action relative bottom-0 top-80">

          <button className="btn btn-ghost" onClick={() => closeModal()}>

            Cancel

          </button>

        </div>

      </form>

    </>

  );

}

 

export default ViewRoleDrawer;

 

