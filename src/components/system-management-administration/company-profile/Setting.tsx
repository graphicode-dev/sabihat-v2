import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../config/endpoints";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";
import { SettingType } from "../../../pages/dashboard/system-management-administration/company-profile/types";

const useSetting = () => {
    return useQuery({
        queryKey: ["setting"],
        queryFn: async () => {
            const response = await ENDPOINTS.companySetting.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data;
        },
    });
};

function Setting() {
    const {
        data: settingData = {} as SettingType,
        error,
        isLoading,
    } = useSetting();

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <div>
            {/* Setting Tab - Fourth Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h3 className="text-sm text-gray-500 mb-1">Currency</h3>
                    <p className="text-base font-medium">
                        {settingData.currency.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Setting;
