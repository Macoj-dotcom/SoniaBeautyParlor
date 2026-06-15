import { useQuery } from "tanstack/react-query";
import api from "../api/axios";

export const useBookings = () => {
    const fetchBookings = async () => {
        const { data } = await api.get("/bookings");
        return data;
    };

    return useQuery({
        queryKey: ["bookings"],
        queryFn: fetchBookings,
    });
};