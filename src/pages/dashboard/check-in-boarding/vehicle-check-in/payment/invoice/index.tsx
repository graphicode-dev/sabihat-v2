import { useNavigate } from "react-router-dom";
import PageLayout from "../../../../../../layout/PageLayout";

function VehicleCheckInPaymentInvoicePage() {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = () => {
        navigate(
            "/check-in-boarding/vehicle-check-in/payment/success/baggage"
        );
    };

    return (
        <PageLayout showBorder className="relative flex flex-col gap-5">
            <h1 className="text-xl text-left font-bold px-5">
                Excess Baggage Ticket
            </h1>

            <div className="relative max-w-[600px] bg-white rounded-3xl shadow-md py-5 px-6 z-40">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-500 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-500 rounded-bl-3xl" />

                {/* Title */}
                <div className="py-4 flex justify-between">
                    <h1 className="text-left font-bold px-5">Ticket Number</h1>

                    <p className="text-primary-500">436257-36</p>
                </div>

                {/* Agent/Customer */}
                <div className="py-4 flex justify-end">
                    <h1 className="text-left text-dark-100 px-5">
                        Agent/Customer:
                    </h1>

                    <p>Eldiwanya</p>
                </div>

                {/* Data */}

                <div className="flex flex-col">
                    {/* Passengers */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Ticket Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Cabin */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Cabin
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Name */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Name
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Vassel Number */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Vassel Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Voyage Number */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Voyage Number
                        </h1>

                        <p>20</p>
                    </div>

                    {/* From */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            From
                        </h1>

                        <p>20</p>
                    </div>

                    {/* To */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            To
                        </h1>

                        <p>20</p>
                    </div>

                    {/* EDT */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            EDT
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Excess Baggage Weight */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Excess Baggage Weight
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Price/Per 1KG */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Price/Per 1KG
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Currency */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Currency
                        </h1>

                        <p>20</p>
                    </div>

                    {/* Amount */}
                    <div className="py-4 flex justify-between">
                        <h1 className="text-left text-dark-100 font-bold px-5">
                            Amount
                        </h1>

                        <p>20</p>
                    </div>
                </div>

                {/* Total */}
                <div className="mt-10 py-4 flex justify-between">
                    <h1 className="text-left font-bold px-5">Total</h1>

                    <p className="text-primary-500">20</p>
                </div>
            </div>

            <div className="mt-10 ps-5 flex justify-start items-center gap-2">
                {/* Cancel Button */}
                <button
                    type="button"
                    onClick={handleCancel}
                    className="form-button-cancel"
                >
                    Cancel
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="form-button-submit"
                    onClick={handleSubmit}
                >
                    Submit To Pay
                </button>
            </div>
        </PageLayout>
    );
}

export default VehicleCheckInPaymentInvoicePage;
