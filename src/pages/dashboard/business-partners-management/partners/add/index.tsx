import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import PartnersMasterAddForm from "../../../../../components/business-partners-management/add/PartnersMasterAddForm";
import QuotaManagementAddForm from "../../../../../components/business-partners-management/add/QuotaManagementAddForm";
import ContactInformationAddForm from "../../../../../components/business-partners-management/add/ContactInformationAddForm";
import { useLocation, useNavigate } from "react-router-dom";
import {
    PartnerFormProvider,
    usePartnerForm,
} from "../../../../../contexts/PartnerFormContext";
import { useEffect } from "react";

function PartnersAddContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tabsWithErrors, lockTab } = usePartnerForm();
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
    return (
        <PartnerFormProvider>
            <PartnersAddContent />
        </PartnerFormProvider>
    );
}

export default PartnersAddPage;
