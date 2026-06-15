import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../api/axios";

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookingData) => {
            const { data } = await api.post("/bookings", bookingData);
            return data;
        },
            
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
                   
            });
        },
    });
};