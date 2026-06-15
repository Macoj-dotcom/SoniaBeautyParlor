import { Routes, Route } from "react-router-dom";  
import Login from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/myBookings";
import BookAppointment from "./pages/bookAppointment";
import staffDashboard from "./pages/staffDashboard";
import ProtectedRoute from "./components/guards/Protectedroute";
import AdminRoute from "./components/guards/AdminRoute";

function App() {
    return (
        <Routes>
            {/*Public Routes*/}
            <Route path="/"element={<login/>} />
            <Route path="/Register" element={<Login/>} />
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