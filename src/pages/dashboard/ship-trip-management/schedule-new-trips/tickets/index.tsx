import { useParams } from "react-router-dom";

function ScheduleNewTripsTicketsPage() {
    const { id } = useParams();
    return <div>ScheduleNewTripsTicketsPage {id}</div>;
}

export default ScheduleNewTripsTicketsPage;
