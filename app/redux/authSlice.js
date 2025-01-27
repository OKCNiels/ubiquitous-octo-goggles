import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";


 const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        // console.log("Error loading user from storage", error);
        return null;
    }
}


// iniciar el state

const initialState = {
    user: null,
    isLoading: true,
};

// Slace
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logoutAction: (state, action) => {
            state.isLoading = false;
            state.user = null;
            AsyncStorage.removeItem("userInfo");
        },
        setUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
    },
});

// generar acciones

export const { loginUserAction, logoutAction, setUserAction } = authSlice.actions;
// generadr de reducer
export const authReducer = authSlice.reducer;

// loaduser
export const loadUser = () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();
    if (userInfo) {
        dispatch(setUserAction(userInfo));
    }
};