import { useQuery } from "tanstack/react-query";
import api from "../api/axios";
export const useBookings = () => {
    const fecthBookings = async () => {
        const { data } = await api.get("/bookings/mybookings");
        return data;
    };

    return useQuery({
        queryKey: ["bookings"],
        queryFn: fecthBookings,
    });
};