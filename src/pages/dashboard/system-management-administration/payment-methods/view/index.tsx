import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function PaymentMethodsViewPage() {
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();

    const data: TableData = {
        id: "1",
        columns: {
            partner: "*******",
            accountName: "*******",
            accountType: "*******",
            currency: "*******",
            accountNumber: "*******",
            accountStatus: "*******",
            note: "*******",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Partner",
                                    value: data?.columns.partner.toString(),
                                },
                                {
                                    label: "Account Name",
                                    value: data?.columns.accountName.toString(),
                                },
                                {
                                    label: "Account Type",
                                    value: data?.columns.accountType.toString(),
                                },
                                {
                                    label: "Currency",
                                    value: data?.columns.currency.toString(),
                                },
                                {
                                    label: "Account Number",
                                    value: data?.columns.accountNumber.toString(),
                                },
                                {
                                    label: "Account Status",
                                    value: data?.columns.accountStatus.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Note",
                                    value: data?.columns.note.toString(),
                                    colSpan: 3,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/payment-methods/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this payment method?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Payment method deleted successfully",
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
            />
        </PageLayout>
    );
}

export default PaymentMethodsViewPage;
