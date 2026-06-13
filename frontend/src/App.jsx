import { Routes, Route } from "react-router-dom";  
import login from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import myBookings from "./pages/myBookings";
import bookAppointment from "./pages/bookAppointment";
import staffDashboard from "./pages/staffDashboard";
import Protectedroute from "./components/guards/Protectedroute";
import AdminRoute from "./components/guards/AdminRoute";

function App() {
    return (
        <Routes>
            {/*Public Routes*/}
            <Route
            path="/"element={<login/>}
            />
            <Route
            path="/Register" element={<Register/>}
            />
            /*client Routes*/ 
            <Route
            path="/dashboard" element={<Protectedroute><Dashboard />
            </Protectedroute>}
            />
            <Route path="/book-appointment"
            element={
                <Protectedroute>
                    <bookAppointment />
                </Protectedroute>
            }
            />
            <Route path="/my-bookings"
            element={
                <Protectedroute>
                    <myBookings />
                </Protectedroute>
            }
            />
            /*staff/Admin*/
            <Route path="/staff-dashboard"
            element={
                <AdminRoute>
                    <staffDashboard />
                </AdminRoute>
            }
            />
        </Routes>
    );
}
export default App;