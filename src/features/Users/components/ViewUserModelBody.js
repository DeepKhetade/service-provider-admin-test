import { useDispatch } from "react-redux";
import { closeRightDrawer } from "../../common/rightDrawerSlice";

function ViewRoleModelBody({extraObject}) {
  const dispatch = useDispatch();
  const users=extraObject

  const closeModal = (e) => {
    dispatch(closeRightDrawer(e));
  };
  return (
    <>
      <form>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4 mt-4">
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={users.firstName}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
          <div className="w-1/3 ...  md:mt-2 sm:mt-3 ">
            <label
              htmlFor="middle-name"
              className="block text-sm lg:w-70 md:w-56 sm:52 font-medium leading-6 text-gray-900"
            >
              Middle Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="middleName"
                id="middle-name"
                value={users.middleName}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="last-name"
                value={users.lastName}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4 mt-4">
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Age
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="age"
                id="age"
                value={users.age}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="first-name"
                value={users.email}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="first-name"
              className="block text-sm lg:w-70 md:w-56 sm:52 font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={users.phoneNumber}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-0 mt-4 mt-4">
          <div className="sm:w-10/12 md:mt-2 sm:mt-3">
            <label
              htmlFor="select-role"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Select Role
            </label>
            <input
              className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              id="select-role"
              name="role"
              value={users.role}
            />
          </div>
          <div className="sm:w-10/12 md:mt-2 sm:mt-3">
            <label
              htmlFor="select-role"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Gender
            </label>
            <input
              className="input input-bordered lg:w-70 md:w-56 sm:52 h-9  focus:border-none outline-none"
              id=" gender"
              name="gender"
              value={users.gender}
            />
          </div>
          <div className="w-1/3 ...  md:mt-2 sm:mt-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                value={users.city}
                className="input input-bordered lg:w-70 md:w-56 sm:52 h-9   focus:border-none outline-none mt-1"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-col-1 lg:gap-0 md:gap-1">
          <label
            htmlFor="select-role"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Address
          </label>
          <textarea
            className="textarea textarea-bordered lg:w-11/12 md:9/12 h-9 focus:border-none outline-none"
            name="address"
            value={users.address}
          ></textarea>
        </div>
        <div className="modal-action relative bottom-0 top-60">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
export default ViewRoleModelBody;