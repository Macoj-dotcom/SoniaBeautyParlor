import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user")
    );
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <nav className="navbar">
            <h2>Sonia Beauty Parlour</h2>
            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/book-appointment">Book Appointment</Link>
                <Link to="/my-bookings">My Bookings</Link>
                {(user?.role === "admin" ||
                    user?.role === "staff" &&
                    <Link to="/staff-dashboard">Staff Dashboard</Link>
                )}
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}
export default Navbar;