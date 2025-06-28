import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function TicketsPassengerViewPage() {
    const { addToast, addAlertToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const data = {
        id: "1",
        ticketDetails: {
            ticketNo: "123456",
            cabin: "1",
            ticketType: "Passenger",
            serviceType: "Passenger",
            visaType: "Passenger",
            allowedWeight: "100",
            status: "Active",
        },
        cargoDetails: {
            cargoType: "Passenger",
            goodsType: "Passenger",
            Qty: "1",
            weight: "100",
            dimension: "100",
            goodsDescription: "Passenger",
        },
        consigneeDetails: {
            name: "John Doe",
            phone: "1234567890",
            IdNumber: "1234567890",
        },
        consignorDetails: {
            name: "John Doe",
            phone: "1234567890",
            IdNumber: "1234567890",
        },
        agentDetails: {
            company: "John Doe",
            marineAgent: "John Doe",
            commercialAgent: "John Doe",
            subAgent: "John Doe",
            userName: "John Doe",
        },
        tripDetails: {
            vesselName: "John Doe",
            voyageNo: "John Doe",
            from: "John Doe",
            to: "John Doe",
            ETD: "John Doe",
            ETA: "John Doe",
        },
        fareDetails: {
            basicPrice: "John Doe",
            taxA: "John Doe",
            taxB: "John Doe",
            commissionExpense: "John Doe",
            commissionIncome: "John Doe",
            markUp: "John Doe",
            discount: "John Doe",
            refundCharges: "John Doe",
            receivableAmount: "John Doe",
            netIncome: "John Doe",
            payableAmount: "John Doe",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            title: "Ticket Details",
                            fields: [
                                {
                                    label: "Ticket No",
                                    value: data.ticketDetails.ticketNo,
                                },
                                {
                                    label: "Cabin",
                                    value: data.ticketDetails.cabin,
                                },
                                {
                                    label: "Ticket Type",
                                    value: data.ticketDetails.ticketType,
                                },
                                {
                                    label: "Service Type",
                                    value: data.ticketDetails.serviceType,
                                },
                                {
                                    label: "Visa Type",
                                    value: data.ticketDetails.visaType,
                                },
                                {
                                    label: "Allowed Weight",
                                    value: data.ticketDetails.allowedWeight,
                                },
                                {
                                    label: "Status",
                                    value: data.ticketDetails.status,
                                },
                            ],
                        },
                        {
                            title: "Cargo Details",
                            fields: [
                                {
                                    label: "Cargo Type",
                                    value: data.cargoDetails.cargoType,
                                },
                                {
                                    label: "Goods Type",
                                    value: data.cargoDetails.goodsType,
                                },
                                {
                                    label: "Qty",
                                    value: data.cargoDetails.Qty,
                                },
                                {
                                    label: "Weight",
                                    value: data.cargoDetails.weight,
                                },
                                {
                                    label: "Dimension",
                                    value: data.cargoDetails.dimension,
                                },
                                {
                                    label: "Goods Description",
                                    value: data.cargoDetails.goodsDescription,
                                },
                            ],
                        },
                        {
                            title: "Consignee Details",
                            fields: [
                                {
                                    label: "Name",
                                    value: data.consigneeDetails.name,
                                },
                                {
                                    label: "Phone",
                                    value: data.consigneeDetails.phone,
                                },
                                {
                                    label: "Id Number",
                                    value: data.consigneeDetails.IdNumber,
                                },
                            ],
                        },
                        {
                            title: "Consignor Details",
                            fields: [
                                {
                                    label: "Name",
                                    value: data.consignorDetails.name,
                                },
                                {
                                    label: "Phone",
                                    value: data.consignorDetails.phone,
                                },
                                {
                                    label: "Id Number",
                                    value: data.consignorDetails.IdNumber,
                                },
                            ],
                        },
                        {
                            title: "Agent Details",
                            fields: [
                                {
                                    label: "Company",
                                    value: data.agentDetails.company,
                                },
                                {
                                    label: "Marine Agent",
                                    value: data.agentDetails.marineAgent,
                                },
                                {
                                    label: "Commercial Agent",
                                    value: data.agentDetails.commercialAgent,
                                },
                                {
                                    label: "Sub Agent",
                                    value: data.agentDetails.subAgent,
                                },
                                {
                                    label: "User Name",
                                    value: data.agentDetails.userName,
                                },
                            ],
                        },
                        {
                            title: "Trip Details",
                            fields: [
                                {
                                    label: "Vessel Name",
                                    value: data.tripDetails.vesselName,
                                },
                                {
                                    label: "Voyage No",
                                    value: data.tripDetails.voyageNo,
                                },
                                {
                                    label: "From",
                                    value: data.tripDetails.from,
                                },
                                {
                                    label: "To",
                                    value: data.tripDetails.to,
                                },
                                {
                                    label: "ETD",
                                    value: data.tripDetails.ETD,
                                },
                                {
                                    label: "ETA",
                                    value: data.tripDetails.ETA,
                                },
                            ],
                        },
                        {
                            title: "Fare Details",
                            fields: [
                                {
                                    label: "Basic",
                                    value: data.fareDetails.basicPrice,
                                },
                                {
                                    label: "Tax A",
                                    value: data.fareDetails.taxA,
                                },
                                {
                                    label: "Tax B",
                                    value: data.fareDetails.taxB,
                                },
                                {
                                    label: "Commission Expense",
                                    value: data.fareDetails.commissionExpense,
                                },
                                {
                                    label: "Commission Income",
                                    value: data.fareDetails.commissionIncome,
                                },
                                {
                                    label: "Mark Up",
                                    value: data.fareDetails.markUp,
                                },
                                {
                                    label: "Discount",
                                    value: data.fareDetails.discount,
                                },
                                {
                                    label: "Refund Charges",
                                    value: data.fareDetails.refundCharges,
                                },
                                {
                                    label: "Receivable Amount",
                                    value: data.fareDetails.receivableAmount,
                                },
                                {
                                    label: "Net Income",
                                    value: data.fareDetails.netIncome,
                                },
                                {
                                    label: "Payable Amount",
                                    value: data.fareDetails.payableAmount,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(`/sales-bookings/tickets/passenger/${id}/edit`)
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this passenger?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Passenger deleted successfully",
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

export default TicketsPassengerViewPage;
