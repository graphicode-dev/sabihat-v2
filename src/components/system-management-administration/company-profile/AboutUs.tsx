import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../config/endpoints";
import { AboutUsType } from "../../../pages/dashboard/system-management-administration/company-profile/types";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";

const useAboutUs = () => {
    return useQuery({
        queryKey: ["aboutUs"],
        queryFn: async () => {
            const response = await ENDPOINTS.companyAboutUs.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data;
        },
    });
};

function AboutUs() {
    const {
        data: aboutUsData = {} as AboutUsType,
        error,
        isLoading,
    } = useAboutUs();

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <div>
            {/* About Us Tab - Third Image */}
            <div className="flex flex-col gap-8 w-full">
                <div className="text-left">
                    <h3 className="text-sm text-gray-500 mb-1">
                        {aboutUsData.name}
                    </h3>
                    <p className="text-base font-medium break-all">
                        {aboutUsData.value}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
