import { ENDPOINTS } from "../../../config/endpoints";
import { CompanyType } from "../../../pages/dashboard/system-management-administration/company-profile/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";

const useCompanyInfo = () => {
    return useQuery({
        queryKey: ["companyInfo"],
        queryFn: async () => {
            const response = await ENDPOINTS.companyInfo.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data;
        },
    });
};

function CompanyInfo() {
    const {
        data: companyInfoData = {} as CompanyType,
        error,
        isLoading,
    } = useCompanyInfo();

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <div>
            {/* Company Info Tab - First Image */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={companyInfoData.companyLogo}
                    alt="company logo"
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                />
                <h2 className="text-lg font-medium">{companyInfoData.name}</h2>
            </div>

            <div className="separator" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Address</h3>
                    <p className="text-base font-medium">
                        {companyInfoData.city}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Tax Id</h3>
                    <p className="text-base font-medium">
                        {companyInfoData.taxId}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CompanyInfo;
