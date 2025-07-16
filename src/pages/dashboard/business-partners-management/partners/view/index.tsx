import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import defaultAvatar from "../../../../../assets/images/default-user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import {
    CreditLimit,
    Partner,
    PartnerUser,
    TicketQuotaManagement,
} from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { DataResponse } from "../../../../../types";
import { TableData } from "../../../../../types/table";

const usePartnerById = (id: string) => {
    return useQuery({
        queryKey: ["partner", id],
        queryFn: async () => {
            const response = await ENDPOINTS.partners.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};
const useQuotaManagementById = (id: string) => {
    return useQuery({
        queryKey: ["quotaManagement", id],
        queryFn: async () => {
            const response = await ENDPOINTS.quotaManagement.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};
const useCreditLimitById = (id: string) => {
    return useQuery({
        queryKey: ["creditLimit", id],
        queryFn: async () => {
            const response = await ENDPOINTS.creditLimit.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

const usePartnerUsers = (id: string) => {
    return useQuery({
        queryKey: ["partnerUsers", id],
        queryFn: async () => {
            const response = await ENDPOINTS.partnerUsers.getAll(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            // Access the data array from the response
            const typedResponse = response.data as DataResponse<PartnerUser>;
            return typedResponse.data || [];
        },
    });
};
const useContactInformation = (id: string) => {
    return useQuery({
        queryKey: ["contactInformation", id],
        queryFn: async () => {
            const response = await ENDPOINTS.contactInformation.getAll(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data || [];
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

function PartnersViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();

    const {
        data: partner,
        error: partnerError,
        isLoading: partnerLoading,
    } = usePartnerById(id as string);
    const {
        data: quotaManagement,
        error: quotaManagementError,
        isLoading: quotaManagementLoading,
    } = useQuotaManagementById(id as string);
    const {
        data: creditLimit,
        error: creditLimitError,
        isLoading: creditLimitLoading,
    } = useCreditLimitById(id as string);
    const {
        data: contactInformation,
        error: contactInformationError,
        isLoading: contactInformationLoading,
    } = useContactInformation(id as string);
    console.log(contactInformation);
    const {
        data: partnerUsers = [],
        error: partnerUsersError,
        isLoading: partnerUsersLoading,
    } = usePartnerUsers(id as string);

    const partnerData = (partner?.data as Partner) || ({} as Partner);

    const quotaManagementData =
        (quotaManagement?.data as TicketQuotaManagement) ||
        ({} as TicketQuotaManagement);

    const creditLimitData =
        (creditLimit?.data as CreditLimit) || ({} as CreditLimit);

    const partnerUsersData: TableData[] =
        partnerUsers?.map((item) => ({
            id: item.id.toString(),
            columns: {
                name: item.name,
                email: item.email,
                phoneCode: item.phoneCode,
                phoneNumber: item.phoneNumber,
                phoneVerifiedAt: item.phoneVerifiedAt,
                address: item.address,
                image: item.image,
                businessPartnerId: item.businessPartnerId,
                isSalesman: item.isSalesman,
                createdAt: item.createdAt,
            },
        })) || [];

    if (
        partnerLoading ||
        partnerUsersLoading ||
        quotaManagementLoading ||
        creditLimitLoading ||
        contactInformationLoading
    )
        return <Loading />;
    if (
        partnerError ||
        partnerUsersError ||
        quotaManagementError ||
        creditLimitError ||
        contactInformationError
    )
        return <Error message={partnerError?.message || "Unknown error"} />;

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="user"
                title={partnerData.name}
                image={defaultAvatar}
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
                                        message: "Partner deleted successfully",
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
                                    value: partnerData.name,
                                },
                                {
                                    label: "Phone",
                                    value: partnerData.phoneNumber,
                                },
                                // {
                                //     label: "Address",
                                //     value: partnerData.address,
                                // },
                                // {
                                //     label: "Layer",
                                //     value: partnerData.layer,
                                // },
                            ],
                        },
                        {
                            title: "Credit Limit",
                            fields: [
                                {
                                    label: "Limit Amount",
                                    value: creditLimitData.limitAmount,
                                },
                                {
                                    label: "Ticket Quota",
                                    value: quotaManagementData.ticketQuota,
                                },
                            ],
                        },
                        {
                            title: "Contact Information",
                            fields: contactInformation?.flatMap((item) => [
                                {
                                    label: "Name",
                                    value: item.name,
                                },
                                {
                                    label: "Phone",
                                    value:
                                        item.phoneCode + " " + item.phoneNumber,
                                },
                                {
                                    label: "Email",
                                    value: item.email,
                                },
                                {
                                    label: "Title",
                                    value: item.title,
                                },
                                {
                                    label: "Hotline",
                                    value: item.hotline,
                                },
                            ]),
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
                                                        Is Salesman
                                                    </th>
                                                    <th className="py-2 px-4 text-left text-sm font-medium text-dark-200">
                                                        Created At
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {partnerUsersData.map(
                                                    (user, index) => (
                                                        <tr
                                                            key={index}
                                                            className="border-b border-dark-50"
                                                        >
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .name ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .phoneNumber ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .email ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .address ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .isSalesman ||
                                                                    "••••••••••••••••"}
                                                            </td>
                                                            <td className="py-2 px-4 text-dark-500 font-medium">
                                                                {user.columns
                                                                    .createdAt ||
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
                gridCols={5}
                hideBorder
            />
        </PageLayout>
    );
}

export default PartnersViewPage;
