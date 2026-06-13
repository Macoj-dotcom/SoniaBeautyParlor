import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../api/axios";

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookingData) =>
            api.post("/bookings", bookingData),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["bookings"],

                    
                });
            },
    });
};