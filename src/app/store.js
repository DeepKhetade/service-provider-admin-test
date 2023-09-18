
import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import loginSlice from "../apiConfig/loginSlice";
import routingSlice from "../features/Routing/routingSlice";
import accessSlice from "../features/Access/accessSlice";
import roleSlice from "../features/Roles/roleSlice";
import userSlice from "../features/Users/userSlice";
import ChangePasswordSlice from "../apiConfig/ChangePasswordSlice";


const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  login: loginSlice,
  routes: routingSlice,
  access: accessSlice,
  roles: roleSlice,
  users: userSlice,
  changePassword: ChangePasswordSlice

}

export default configureStore({
  reducer: combinedReducer
})
