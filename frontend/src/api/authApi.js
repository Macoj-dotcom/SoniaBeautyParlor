import api from "./axios";

/**Register user */
export const registerUser = async (userData) => {
    const{ data } = await api.post("/auth/register", userData);
    return data;
};
/**login user */
export const loginUser = async(credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};
/**Get logged-in user profile */
export const getProfile = async () => {
    const { data } = await api.get("/auth/profile");
    return data;
}
/**Logout user */
export const logOut = async(credentials) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
/**Forgot password */
export const forgotPassword = async (email) => {
    const{ data } = await api.post("/auth/forgot-password", email);
    return data;
}; 
/**Reset Password */
export const resetPassword = async (token, password) => {
    const{ data } = await api.post(`/auth/reset-password/${token}`, password);
    return data;
};
/**Verify email */   
export const verifyemail = async (token) => {
    const{ data } = await api.get(`/auth/verify-email/${token}`);
    return data;
};