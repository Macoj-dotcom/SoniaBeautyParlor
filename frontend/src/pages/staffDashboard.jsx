import Navbar from "../components/guards/Navbar";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

function StaffDashboard() {
    const fetchBookings = async () => {
        const { data } = await api.get("/bookings/all");
        return data;
    };
    const { data, isloading } = useQuery({
        queryKey: ["allBookings"],
        queryFn: fetchBookings,
    });
    return(
        <>
          <Navbar />
            <div className="container">
                <h2>Staff Dashboard</h2>
                {isloading && <p>Loading...</p>}
                {!isloading && (
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((booking) => (
                                <tr key={booking._id || booking.id}>
                                    <td>{booking.client?.name || "N/A"}</td>
                                    <td>{booking.client?.email || "N/A"}</td>
                                    <td>{booking.service}</td>
                                    <td>
                                        {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
             </div>
        </>
    );
}
export default StaffDashboard;