
import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { deleteLead } from "../../leads/leadSlice";
import { showNotification } from "../headerSlice";
import { showRoles, SingleDelete, updateRole } from "../../Roles/roleSlice";
import { closeRightDrawer } from "../rightDrawerSlice";
import { SingleDeleteUser, showUser, updateUser } from "../../Users/userSlice";
import { deleteRoute } from '../../Routing/routingSlice'


let page = 1
let limit = 5
let search = ""
function ConfirmationModalBody({ extraObject, closeModal }) {
    const dispatch = useDispatch();
    const { message, type, _id, index } = extraObject;

    // const dispatch = useDispatch()

    // const { message, type, _id, index} = extraObject


    const proceedWithYes = async () => {
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
            // positive response, call api or dispatch redux function
            dispatch(deleteLead({ index }))
            dispatch(showNotification({ message: "Lead Deleted!", status: 1 }))
        }

        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ROLE_DELETE) {

            dispatch(SingleDelete(_id)).then((res) => {

                if (res.payload.code === 200) {
                    dispatch(showRoles({ page, limit, search }));
                    // dispatch(showRoles(""))
                    dispatch(showNotification({ message: `${res.payload.message}!`, status: 1 }))
                }
                if (res.payload.code === 500) {
                    dispatch(showNotification({ message: `Error !`, status: 0 }))
                }

            })
        }

        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.UPDATE_ROLE) {

            dispatch(updateRole(_id)).then((res) => {

                console.log(res)
                if (res?.payload?.code === 200) {
                    dispatch(showNotification({ message: res.payload.message, status: 1 }))
                    // dispatch(showRoles(""))
                    dispatch(showRoles({ page, limit, search }));
                    dispatch(closeRightDrawer())

                }
                if (res?.error?.code === "ERR_BAD_RESPONSE") {
                    dispatch(showNotification({ message: "Role already exists", status: 0 }))
                }
            })

        }



        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE) {
            dispatch(SingleDeleteUser(_id));
            dispatch(showNotification({ message: " User Deleted!", status: 1 }));
            // dispatch(showUser());
            dispatch(showUser({ page, limit, search }))
        }
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.UPDATE_USER) {
            dispatch(updateUser(_id));
            dispatch(showNotification({ message: "User Updated!", status: 1 }));
            // dispatch(showUser());
            dispatch(showUser({ page, limit, search }))
            dispatch(closeRightDrawer());
        }

        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ROUTING_DELETE) {
            dispatch(deleteRoute(_id))
            dispatch(showNotification({ message: "Routing Deleted!", statys: 1 }))
        }

        closeModal();
    };

    return (
        <>
            <p className=" text-xl mt-8 text-center">{message}</p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline   " onClick={() => closeModal()}>
                    Cancel
                </button>

                <button
                    className="btn btn-primary w-36"
                    onClick={() => proceedWithYes()}
                >
                    Yes
                </button>
            </div>
        </>
    );
}

export default ConfirmationModalBody
