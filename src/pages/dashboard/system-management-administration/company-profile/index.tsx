import ViewCard from "../../../../components/ui/ViewCard";
import PageLayout from "../../../../layout/PageLayout";
import defaultUser from "../../../../assets/images/default-user.png";
import { useNavigate } from "react-router-dom";

function CompanyProfilePage() {
    const navigate = useNavigate();
    const userData = {
        id: "1",
        avatar: defaultUser,
        name: "Company Name",
        address: "street, city, country",
        taxId: "••••••••••••••••",
    };
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
                        onDelete: () => console.log("Delete Company Info"),
                        children: (
                            <div>
                                {/* Company Info Tab - First Image */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-xs">logo</span>
                                    </div>
                                    <h2 className="text-lg font-medium">
                                        Company Name
                                    </h2>
                                </div>

                                <div className="separator" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Address
                                        </h3>
                                        <p className="text-base font-medium">
                                            {userData.address}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Tax Id
                                        </h3>
                                        <p className="text-base font-medium">
                                            {userData.taxId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        label: "Contact Us",
                        value: "contact-us",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/contact-us"
                            ),
                        onDelete: () => console.log("Delete Contact Us"),
                        children: (
                            <div>
                                {/* Contact Us Tab - Second Image */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Facebook
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Whatsapp
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Instagram
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            LinkedIn
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Twitter
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Snapchat
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Email Address
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Hotline
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Phone Number
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        label: "About Us",
                        value: "about-us",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/about-us"
                            ),
                        onDelete: () => console.log("Delete About Us"),
                        children: (
                            <div>
                                {/* About Us Tab - Third Image */}
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Who We Are Statement
                                        </h3>
                                        <p className="text-base font-medium break-all">
                                            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Vision
                                        </h3>
                                        <p className="text-base font-medium break-all">
                                            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Mission
                                        </h3>
                                        <p className="text-base font-medium break-all">
                                            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Purpose
                                        </h3>
                                        <p className="text-base font-medium break-all">
                                            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        label: "Settings",
                        value: "settings",
                        buttons: true,
                        onEdit: () =>
                            navigate(
                                "/system-management-administration/company-profile/edit/setting"
                            ),
                        onDelete: () => console.log("Delete Setting"),
                        children: (
                            <div>
                                {/* Setting Tab - Fourth Image */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Tax
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-1">
                                            Currency
                                        </h3>
                                        <p className="text-base font-medium">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </PageLayout>
    );
}

export default CompanyProfilePage;
