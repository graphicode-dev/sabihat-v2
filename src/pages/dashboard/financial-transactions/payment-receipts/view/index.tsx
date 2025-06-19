import { useNavigate, useParams } from "react-router-dom";
import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";

const PaymentReceiptsViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const data = {
        id,
        date: "1",
        journalNo: "Ledger Description",
        layer: "Ledger Type",
        ledgerAccount: "Sequence",
        debit: "Sequence",
        credit: "Sequence",
        note: "Sequence",
        currency: "Sequence",
        amountCurrency: "Sequence",
        rate: "Sequence",
        docReference: "Sequence",
        voyageNo: "Sequence",
        serviceType: "Sequence",
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
                                    label: "Date",
                                    value: data.date,
                                },
                                {
                                    label: "Journal No",
                                    value: data.journalNo,
                                },
                                {
                                    label: "Layer",
                                    value: data.layer,
                                },
                                {
                                    label: "Ledger Account",
                                    value: data.ledgerAccount,
                                },
                                {
                                    label: "Debit",
                                    value: data.debit,
                                },
                                {
                                    label: "Credit",
                                    value: data.credit,
                                },
                                {
                                    label: "Note",
                                    value: data.note,
                                },
                                {
                                    label: "Currency",
                                    value: data.currency,
                                },
                                {
                                    label: "Amount Currency",
                                    value: data.amountCurrency,
                                },
                                {
                                    label: "Rate",
                                    value: data.rate,
                                },
                                {
                                    label: "Doc Reference",
                                    value: data.docReference,
                                },
                                {
                                    label: "Voyage No",
                                    value: data.voyageNo,
                                },
                                {
                                    label: "Service Type",
                                    value: data.serviceType,
                                },
                            ],
                        },
                    ],
                }}
                buttons
                onEdit={() =>
                    navigate(
                        `/financial-transactions/payments/edit/${id}`
                    )
                }
            />
        </PageLayout>
    );
};

export default PaymentReceiptsViewPage;
