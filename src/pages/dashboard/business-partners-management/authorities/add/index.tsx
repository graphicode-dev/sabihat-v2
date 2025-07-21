import { useLocation, useNavigate } from "react-router-dom";
import AuthoritiesContactInformationAddForm from "../../../../../components/business-partners-management/add/AuthoritiesContactInformationAddForm";
import AuthorityAddForm from "../../../../../components/business-partners-management/add/AuthorityAddForm";
import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import {
    GenericFormProvider,
    SubmitConfig,
    TabConfig,
    useGenericForm,
} from "../../../../../contexts/GenericFormContext";
import { useEffect } from "react";
import { ENDPOINTS } from "../../../../../config/endpoints";

function AuthoritiesAddContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tabsWithErrors, lockTab } = useGenericForm();
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get("tab") || "authority";

    useEffect(() => {
        if (tabsWithErrors.authority && currentTab !== "authority") {
            handleChangeTab("authority");
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
        <PageLayout>
            <Tabs disableTabOnClick={lockTab}>
                <Tabs.Item label="Authorities Master" value="authority">
                    <AuthorityAddForm handleChangeTab={handleChangeTab} />
                </Tabs.Item>
                <Tabs.Item
                    label="Contact Information"
                    value="contactInformation"
                >
                    <AuthoritiesContactInformationAddForm
                        handleChangeTab={handleChangeTab}
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

function AuthoritiesAddPage() {
    // Define tab configurations for partner form
    const tabConfigs: TabConfig[] = [
        {
            id: "authority",
            urlParam: "authority",
            initialState: {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                address: "",
            },
            errorSchema: {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                address: "",
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
            errorSchema: {
                name: "",
                title: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                hotline: "",
            },
        },
    ];

    // Define submit configuration
    const submitConfig: SubmitConfig = {
        endpoint: (formData) => ENDPOINTS.authorities.add(formData as any),
        successMessage: "Authority added successfully",
        errorMessage: "Failed to add authority",
        successRedirect: "/dashboard/business-partners-management/authorities",
    };

    return (
        <GenericFormProvider
            tabConfigs={tabConfigs}
            submitConfig={submitConfig}
        >
            <AuthoritiesAddContent />
        </GenericFormProvider>
    );
}

export default AuthoritiesAddPage;
