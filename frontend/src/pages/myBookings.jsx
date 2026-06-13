import Navbar from "../components/guards/Navbar";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

function MyBookings() {
    const fetchBookings = async () => {
        const { data } = await api.get("/bookings/my-bookings");
        return data;
    };
    const { data, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: fetchBookings,
    });
    return (
        <>
          <Navbar />
            <div className="container">
                     
             <h2>My Bookings</h2>
             {isLoading && <p>Loading...</p>}
             {!isLoading && (!data || data.length === 0) && (
                <p>No bookings found</p>
             )}
               {data?.map((booking) => (
                <div className="card" key={booking._id || booking.id}>
                    <h3>{booking.service}</h3>
                    <p>
                     <strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {booking.status}                      
                    </p>
                </div>    
            ))}
        </div>
        </>
    );
}
export default MyBookings;