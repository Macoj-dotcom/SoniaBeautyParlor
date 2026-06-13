import Navbar from "../components/guards/Navbar";
function Dashboard() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return (
        <>
           <Navbar />
           <div className="container">
               <div className="card">
                    <h1>Welcome, {user?.name || "Guest"}</h1>
                    <p>Sonia Beauty Parlour Appointment System </p>
               </div>
           </div>
        </>
    );
}
export default Dashboard;
