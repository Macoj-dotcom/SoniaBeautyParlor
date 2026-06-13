import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/guards/Navbar";
import { useCreateBooking } from "../hooks/useCreateBooking";

function BookAppointment() {
    const navigate = useNavigate();
    const mutation = useCreateBooking();

    const [service, setService] = useState("");
    const[date, setDate] = useState("");
    const submit = (e) =>{
        e.preventDefault();
        if (!service) {
            alert("Please select a servicebefore booking.");
            return
        }
        mutation.mutate({
            service,
            date,
        });

        setService("");
        setDate("");
        alert("Appointment Booked");
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <form className="form" onSubmit={submit}>
                    <h2>Book Appointment</h2>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="">Select Service</option>
                        <option value="Hair Styling">Hair Styling</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Braiding">Braiding</option>
                        <option value="Pedicure">Pedicure</option>
                    </select>

                    <input type="datetime-local"
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button type="submit">Book</button>
                </form>
            </div>
        </>
    );
}
export default BookAppointment;