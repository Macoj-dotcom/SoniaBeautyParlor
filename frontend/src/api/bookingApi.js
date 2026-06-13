import api from "./axios";
/**Create booking */
export const createBooking = async (bookingData) => {
    const { data } = await api.post("/bookings", bookingData);
    return data;
};
/**Get current user bookings */
export const getBookingById = async (bookingId) => {
    const { data } = await api.get(`/bookings/${bookingId}`);
    return data;
};
/**Cancel booking */
export const cancelBooking = async (bookingId) => {
    const { data } = await api.put(`/bookings/cancel/${bookingId}`);
    return data;
};
/**Update booking */
export const updateBooking = async (bookingId, bookingData) => {
    const { data } = await api.put(`/bookings/${bookingId}`, bookingData);
    return data;
};
/**Staff Admin confim booking */
export const confirmBooking = async (bookingId) => {
    const { data } = await api.patch(`/bookings/${bookingId}/confirm`);
    return data;
};
/**Staff Admin complete booking */
export const completeBooking = async (bookingId) => {
    const { data } = await api.patch(`/bookings/${bookingId}/complete`);
    return data;
};
/**Staff Admin delete booking */
export const deleteBooking = async (bookingId) => {
    const { data } = await api.delete(`/bookings/${bookingId}`);
    return data;
};