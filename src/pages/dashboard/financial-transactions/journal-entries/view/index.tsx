import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useToast } from "../../../../../hooks/useToast";

const JournalEntriesViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast, addAlertToast } = useToast();

    const data = {
        id,
        columns: {
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
                                    label: "Date",
                                    value: data.columns.date,
                                },
                                {
                                    label: "Journal No",
                                    value: data.columns.journalNo,
                                },
                                {
                                    label: "Layer",
                                    value: data.columns.layer,
                                },
                                {
                                    label: "Ledger Account",
                                    value: data.columns.ledgerAccount,
                                },
                                {
                                    label: "Debit",
                                    value: data.columns.debit,
                                },
                                {
                                    label: "Credit",
                                    value: data.columns.credit,
                                },
                                {
                                    label: "Note",
                                    value: data.columns.note,
                                },
                                {
                                    label: "Currency",
                                    value: data.columns.currency,
                                },
                                {
                                    label: "Amount Currency",
                                    value: data.columns.amountCurrency,
                                },
                                {
                                    label: "Rate",
                                    value: data.columns.rate,
                                },
                                {
                                    label: "Doc Reference",
                                    value: data.columns.docReference,
                                },
                                {
                                    label: "Voyage No",
                                    value: data.columns.voyageNo,
                                },
                                {
                                    label: "Service Type",
                                    value: data.columns.serviceType,
                                },
                            ],
                        },
                    ],
                }}
                buttons
                onEdit={() =>
                    navigate(
                        `/financial-transactions/journal-entries/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this journal entry?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Journal entry deleted successfully",
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
            />
        </PageLayout>
    );
};

export default JournalEntriesViewPage;
