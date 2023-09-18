import { useDispatch } from "react-redux";
import { closeRightDrawer } from "../../common/rightDrawerSlice";

const rolearray = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
];

function ViewServicesModelBody() {
  const dispatch = useDispatch();

  const closeModal = (e) => {
    dispatch(closeRightDrawer(e));
  };

  return (
    <>
      <form>
        {/* <InputText type="text" defaultValue={leadObj.role} updateType="role" containerStyle="mt-4" labelTitle="Role Name" updateFormValue={updateFormValue}/>

            <TextAreaInput type="text" defaultValue={leadObj.description} updateType="description" containerStyle="mt-4" labelTitle="Description" updateFormValue={updateFormValue}/> */}

        <div className="flex ... mt-4">
          <div className="w-1/2 ... ">
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
                placeholder="email"
                className="input input-bordered lg:w-96  sm:80"
              />
              {/* <div style={{ color: "red" }}>{errors.email}</div> */}
            </div>
          </div>
          <div className="w-1/2 ... ">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Service Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="userName"
                id="first-name"
                placeholder="Role"
                className="input input-bordered lg:w-96 sm:80"
              />
              {/* <div style={{ color: "red" }}>{errors.userName}</div> */}
            </div>
          </div>
        </div>
        <div className="w-1/2 ... mt-4">
          <label
            htmlFor="select-role"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Select Service
          </label>
          <select
            className="select  select-bordered  max-w-full lg:w-96 sm:80"
            id="select-role"
            name="role"
          >
            <option value="" selected>
              Select Service
            </option>
            {rolearray.map((option, i) => (
              <option value={option.value} key={i}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <div style={{ color: "red" }}>{errors.role}</div> */}
        </div>

        {/* <ErrorText styleClass="mt-16">{errorMessage}</ErrorText> */}
        <div className="modal-action relative bottom-0 top-60">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          {/* <button  className="btn btn-primary px-6" type="submit">Save</button> */}
        </div>
      </form>
    </>
  );
}

export default ViewServicesModelBody;
