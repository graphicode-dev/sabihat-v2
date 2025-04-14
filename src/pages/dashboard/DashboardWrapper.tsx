import { Outlet } from "react-router-dom";
import { DashboardLayout } from "../../layout/DashboardLayout";

const DashboardWrapper = () => {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default DashboardWrapper;
