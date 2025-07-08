import PageLayout from "../../../../../../layout/PageLayout";
import { PrinterIcon } from "lucide-react";
import { QrCodeIcon } from "../../../../../../components/ui/icons";
import { printDocument } from "../../../../../../utils";

function VehicleCheckInPaymentSuccessBoardingPassPage() {
    const onPrintButton = () => {
        printDocument({
            title: "Boarding Pass",
            printOnly: ".print-section",
        });
    };

    return (
        <PageLayout showBorder>
            {/* Header */}
            <div className="flex justify-between items-center gap-2 mb-10">
                <h1 className="text-xl font-bold">Print Boarding Pass</h1>

                <div className="flex gap-2">
                    <div
                        className="text-white px-3 py-3 border border-dark-50 rounded-full cursor-pointer"
                        onClick={onPrintButton}
                    >
                        <PrinterIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Data */}
            <div className="print-section">
                <div className="flex flex-col justify-center items-start print:items-center">
                    <h1 className="text-xl font-bold my-10 print:block hidden">
                        Boarding Pass
                    </h1>

                    {/* Qr Code */}
                    <div className="w-full flex justify-start print:justify-center items-center">
                        <QrCodeIcon />
                    </div>

                    {/* Data */}
                    <div className="w-full relative max-w-[600px] py-5 px-6 z-40">
                        <div className="flex flex-col">
                            {/* Ticket Number */}
                            <div className="py-4 flex justify-between border-custom-pattern">
                                <h1 className="text-left text-dark-100 font-bold">
                                    Ticket Number
                                </h1>

                                <p>20</p>
                            </div>

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
                </div>
            </div>
        </PageLayout>
    );
}

export default VehicleCheckInPaymentSuccessBoardingPassPage;
