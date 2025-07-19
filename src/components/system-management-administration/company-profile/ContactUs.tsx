import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../config/endpoints";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";
import { ContactUsType } from "../../../pages/dashboard/system-management-administration/company-profile/types";

const useContactUs = () => {
    return useQuery({
        queryKey: ["contactUs"],
        queryFn: async () => {
            const response = await ENDPOINTS.companyContactUs.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data;
        },
    });
};

function ContactUs() {
    const {
        data: contactUsData = {} as ContactUsType,
        error,
        isLoading,
    } = useContactUs();

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <div>
            {/* Contact Us Tab - Second Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Facebook</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Whatsapp</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Instagram</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">LinkedIn</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Twitter</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Snapchat</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">
                        Email Address
                    </h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Hotline</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Phone Number</h3>
                    <p className="text-base font-medium">••••••••••••••••</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
