import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import authReducer from "../slices/authSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
})

export default rootReducer;