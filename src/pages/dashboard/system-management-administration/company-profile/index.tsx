import ViewCard from "../../../../components/ui/ViewCard";
import PageLayout from "../../../../layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import CompanyInfo from "../../../../components/system-management-administration/company-profile/CompanyInfo";
import ContactUs from "../../../../components/system-management-administration/company-profile/ContactUs";
import AboutUs from "../../../../components/system-management-administration/company-profile/AboutUs";
import Setting from "../../../../components/system-management-administration/company-profile/Setting";

function CompanyProfilePage() {
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    return (
        <PageLayout>
            <ViewCard
                variant="tabs"
                tabs={[
                    {
                        label: "Company Info",
                        value: "company-info",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/profile"
                            ),
                        onDelete: () => {
                            addAlertToast(
                                "Are you sure you want to delete this company?",
                                [
                                    {
                                        text: "OK",
                                        onClick: () => {
                                            addToast({
                                                type: "success",
                                                message:
                                                    "Company deleted successfully",
                                                title: "Success!",
                                            });
                                        },
                                        variant: "primary",
                                    },
                                    {
                                        text: "Cancel",
                                        onClick: () => {},
                                        variant: "secondary",
                                    },
                                ]
                            );
                        },
                        children: <CompanyInfo />,
                    },
                    {
                        label: "Contact Us",
                        value: "contact-us",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/contact-us"
                            ),
                        onDelete: () => {
                            addAlertToast(
                                "Are you sure you want to delete this contact us?",
                                [
                                    {
                                        text: "OK",
                                        onClick: () => {
                                            addToast({
                                                type: "success",
                                                message:
                                                    "Contact us deleted successfully",
                                                title: "Success!",
                                            });
                                        },
                                        variant: "primary",
                                    },
                                    {
                                        text: "Cancel",
                                        onClick: () => {},
                                        variant: "secondary",
                                    },
                                ]
                            );
                        },
                        children: <ContactUs />,
                    },
                    {
                        label: "About Us",
                        value: "about-us",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/about-us"
                            ),
                        onDelete: () => {
                            addAlertToast(
                                "Are you sure you want to delete this about us?",
                                [
                                    {
                                        text: "OK",
                                        onClick: () => {
                                            addToast({
                                                type: "success",
                                                message:
                                                    "About us deleted successfully",
                                                title: "Success!",
                                            });
                                        },
                                        variant: "primary",
                                    },
                                    {
                                        text: "Cancel",
                                        onClick: () => {},
                                        variant: "secondary",
                                    },
                                ]
                            );
                        },
                        children: <AboutUs />,
                    },
                    {
                        label: "Settings",
                        value: "settings",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/setting"
                            ),
                        onDelete: () => {
                            addAlertToast(
                                "Are you sure you want to delete this setting?",
                                [
                                    {
                                        text: "OK",
                                        onClick: () => {
                                            addToast({
                                                type: "success",
                                                message:
                                                    "Setting deleted successfully",
                                                title: "Success!",
                                            });
                                        },
                                        variant: "primary",
                                    },
                                    {
                                        text: "Cancel",
                                        onClick: () => {},
                                        variant: "secondary",
                                    },
                                ]
                            );
                        },
                        children: <Setting />,
                    },
                ]}
            />
        </PageLayout>
    );
}

export default CompanyProfilePage;
