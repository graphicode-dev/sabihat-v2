import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import PartnersMasterAddForm from "../../../../../components/business-partners-management/add/PartnersMasterAddForm";
import QuotaManagementAddForm from "../../../../../components/business-partners-management/add/QuotaManagementAddForm";
import ContactInformationAddForm from "../../../../../components/business-partners-management/add/ContactInformationAddForm";
import { useLocation, useNavigate } from "react-router-dom";
import {
    GenericFormProvider,
    useGenericForm,
    TabConfig,
    SubmitConfig,
} from "../../../../../contexts/GenericFormContext";
import { useEffect } from "react";
import { ENDPOINTS } from "../../../../../config/endpoints";


function PartnersAddContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tabsWithErrors, lockTab } = useGenericForm();
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get("tab") || "partnersMaster";

    useEffect(() => {
        if (tabsWithErrors.partnerMaster && currentTab !== "partnersMaster") {
            handleChangeTab("partnersMaster");
        } else if (
            tabsWithErrors.quotaManagement &&
            currentTab !== "quota-management-credit-limit"
        ) {
            handleChangeTab("quota-management-credit-limit");
        } else if (
            tabsWithErrors.contactInformation &&
            currentTab !== "contactInformation"
        ) {
            handleChangeTab("contactInformation");
        }
    }, [tabsWithErrors]);

    const handleChangeTab = (tab: string) => {
        searchParams.set("tab", tab);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    return (
        <PageLayout showBorder>
            <h1 className="text-xl text-left font-bold px-5">Add</h1>
            <Tabs hideBorder disableTabOnClick={lockTab}>
                <Tabs.Item label="Partners Master" value="partnersMaster">
                    <PartnersMasterAddForm handleChangeTab={handleChangeTab} />
                </Tabs.Item>
                <Tabs.Item
                    label="Quota Management & Credit Limit"
                    value="quota-management-credit-limit"
                >
                    <QuotaManagementAddForm handleChangeTab={handleChangeTab} />
                </Tabs.Item>
                <Tabs.Item
                    label="Contact Information"
                    value="contactInformation"
                >
                    <ContactInformationAddForm
                        handleChangeTab={handleChangeTab}
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

// Wrapper component that provides the context
function PartnersAddPage() {
    // Define tab configurations for partner form
    const tabConfigs: TabConfig[] = [
        {
            id: "partnerMaster",
            urlParam: "partnersMaster",
            initialState: {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                address: "",
                layerId: "",
                image: null,
            },
            errorSchema: {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                address: "",
                layerId: "",
                image: "",
            },
        },
        {
            id: "quotaManagement",
            urlParam: "quota-management-credit-limit",
            initialState: {
                limitAmount: "",
                ticketQuota: "",
            },
            errorSchema: {
                limitAmount: "",
                ticketQuota: "",
            },
        },
        {
            id: "contactInformation",
            urlParam: "contactInformation",
            initialState: [
                {
                    name: "",
                    title: "",
                    phoneCode: "",
                    phoneNumber: "",
                    email: "",
                    hotline: "",
                },
            ],
            errorSchema: [],
        },
    ];

    // Define submit configuration
    const submitConfig: SubmitConfig = {
        endpoint: (formData) => ENDPOINTS.partners.add(formData as any),
        successMessage: "Partner added successfully",
        errorMessage: "Failed to add partner",
        successRedirect: "/dashboard/business-partners-management/partners",
    };

    return (
        <GenericFormProvider
            tabConfigs={tabConfigs}
            submitConfig={submitConfig}
        >
            <PartnersAddContent />
        </GenericFormProvider>
    );
}

export default PartnersAddPage;
