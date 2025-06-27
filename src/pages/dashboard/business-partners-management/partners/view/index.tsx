import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import defaultAvatar from "../../../../../assets/images/default-user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function PartnersViewPage() {
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();
    const navigate = useNavigate();

    const data = {
        partner: {
            avatar: defaultAvatar,
            name: "Partner Name",
        },
        partnersMaster: {
            name: "*****",
            phone: "*****",
            address: "*****",
            layer: "*****",
        },
        creditLimit: {
            limitAmount: "*****",
            limitTicket: "*****",
        },
        contactInformation: {
            name: "*****",
            title: "*****",
            phone: "*****",
            email: "*****",
            hotLine: "*****",
        },
        users: [
            {
                name: "User1",
                phone: "*****",
                email: "*****",
                address: "*****",
                layer: "*****",
            },
            {
                name: "User2",
                phone: "*****",
                email: "*****",
                address: "*****",
                layer: "*****",
            },
            {
                name: "User3",
                phone: "*****",
                email: "*****",
                address: "*****",
                layer: "*****",
            },
            {
                name: "User4",
                phone: "*****",
                email: "*****",
                address: "*****",
                layer: "*****",
            },
            {
                name: "User5",
                phone: "*****",
                email: "*****",
                address: "*****",
                layer: "*****",
            },
        ],
    };

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="user"
                title={data.partner.name}
                image={data.partner.avatar}
                onEdit={() =>
                    navigate(
                        `/business-partners-management/partners/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this partner?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Partner deleted successfully",
                                        title: "Success!",
                                    });
                                    navigate(-1);
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
                }}
                buttons
                hideBorder
            />
            <ViewCard
                hideHeaderTitle
                variant="default"
                data={{
                    rows: [
                        {
                            title: "Partners Master",
                            fields: [
                                {
                                    label: "Name",
                                    value: data.partnersMaster.name,
                                },
                                {
                                    label: "Phone",
                                    value: data.partnersMaster.phone,
                                },
                                {
                                    label: "Address",
                                    value: data.partnersMaster.address,
                                },
                                {
                                    label: "Layer",
                                    value: data.partnersMaster.layer,
                                },
                            ],
                        },
                        {
                            title: "Credit Limit",
                            fields: [
                                {
                                    label: "Limit Amount",
                                    value: data.creditLimit.limitAmount,
                                },
                                {
                                    label: "Limit Ticket",
                                    value: data.creditLimit.limitTicket,
                                },
                            ],
                        },
                        {
                            title: "Contact Information",
                            fields: [
                                {
                                    label: "Name",
                                    value: data.contactInformation.name,
                                },
                                {
                                    label: "Title",
                                    value: data.contactInformation.title,
                                },
                                {
                                    label: "Phone",
                                    value: data.contactInformation.phone,
                                },
                                {
                                    label: "Email",
                                    value: data.contactInformation.email,
                                },
                                {
                                    label: "Hot Line",
                                    value: data.contactInformation.hotLine,
                                },
                            ],
                        },
                        {
                            title: "Users",
                            customRender: () => {
                                return (
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-dark-50">
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Name
                                                    </th>
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Phone
                                                    </th>
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Email
                                                    </th>
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Address
                                                    </th>
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Layer
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.users.map(
                                                    (user, index) => (
                                                        <tr
                                                            key={index}
                                                            className="border-b border-dark-50"
                                                        >
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.name ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.phone ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.email ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.address ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.layer ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            },
                        },
                    ],
                }}
                hideBorder
            />
        </PageLayout>
    );
}

export default PartnersViewPage;
