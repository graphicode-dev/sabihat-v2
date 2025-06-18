import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import defaultAvatar from "../../../../../assets/images/default-user.png";
import { useNavigate, useParams } from "react-router-dom";

function AuthoritiesViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const data = {
        user: {
            avatar: defaultAvatar,
            name: "*****",
        },
        authorityMaster: {
            name: "*****",
            phone: "*****",
            address: "*****",
        },
        contactInformation: {
            name: "*****",
            title: "*****",
            phone: "*****",
            email: "*****",
            hotline: "*****",
        },
    };

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="user"
                image={data.user.avatar}
                title={data.user.name}
                onEdit={() =>
                    navigate(
                        `/business-partners-management/authorities/edit/${id}`
                    )
                }
                buttons
                hideBorder
            />
            <ViewCard
                hideHeaderTitle
                variant="default"
                data={{
                    rows: [
                        {
                            title: "Authortiy master",
                            fields: [
                                {
                                    label: "Name",
                                    value: data.authorityMaster.name,
                                },
                                {
                                    label: "Phone",
                                    value: data.authorityMaster.phone,
                                },
                                {
                                    label: "Address",
                                    value: data.authorityMaster.address,
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
                                    label: "Hotline",
                                    value: data.contactInformation.hotline,
                                },
                            ],
                        },
                    ],
                }}
                hideBorder
            />
        </PageLayout>
    );
}

export default AuthoritiesViewPage;
