import PageLayout from "../../../../../../layout/PageLayout";
import { PrinterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QrCodeIcon } from "../../../../../../components/ui/icons";

function PassengerCheckInPaymentSuccessBaggagePage() {
    const navigate = useNavigate();

    const onPrintButton = () => {
        console.log("Print Button Clicked");
    };

    const onBoardingPassButton = () => {
        navigate(
            "/check-in-boarding/passenger-check-in/payment/success/boarding-pass"
        );
        console.log("Boarding Pass Button Clicked");
    };

    return (
        <PageLayout showBorder>
            {/* Header */}
            <div className="flex justify-between items-center gap-2 mb-10">
                <h1 className="text-xl font-bold">Print Baggage Labels</h1>

                <div className="flex gap-2">
                    <div
                        className="text-white px-3 py-3 border border-dark-50 rounded-full"
                        onClick={onPrintButton}
                    >
                        <PrinterIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <button
                        type="button"
                        className="bg-primary-500 text-white px-4 py-3 rounded-full"
                        onClick={onBoardingPassButton}
                    >
                        Boarding Pass
                    </button>
                </div>
            </div>

            {/* Qr Code */}
            <QrCodeIcon />

            {/* Data */}
            <div className="relative max-w-[600px] py-5 px-6 z-40">
                <div className="flex flex-col">
                    {/* Voyage Number */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Voyage Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* ship name */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Ship Name
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Port To */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Port To
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Passenger Name */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Passenger Name
                        </h1>

                        <p>20</p>
                    </div>

                    {/* phone no */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            phone no
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Tag Number */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Tag Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Trolly Number */}
                    <div className="py-4 flex justify-between border-custom-pattern">
                        <h1 className="text-left text-dark-100 font-bold">
                            Trolly Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* ETD */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold">
                            ETD
                        </h1>

                        <p className="text-primary-500">20</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default PassengerCheckInPaymentSuccessBaggagePage;
