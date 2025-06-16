import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";

function PaymentMethodsViewPage() {
    // const { id } = useParams();

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
                buttons
            />
        </PageLayout>
    );
}

export default PaymentMethodsViewPage;
