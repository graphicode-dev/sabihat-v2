import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import PartnersMasterEditForm from "../../../../../components/business-partners-management/PartnersMasterEditForm";
import QuotaManagementEditForm from "../../../../../components/business-partners-management/QuotaManagementEditForm";
import ContactInformationEditForm from "../../../../../components/business-partners-management/ContactInformationEditForm";
import UsersEditForm from "../../../../../components/business-partners-management/UsersEditForm";

function PartnersEditPage() {
    return (
        <PageLayout showBorder>
            <h1 className="text-xl text-left font-bold px-5">Edit</h1>
            <Tabs hideBorder>
                <Tabs.Item label="Partners Master" value="partnersMaster">
                    <PartnersMasterEditForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Quota Management & Credit Limit"
                    value="quota-management-credit-limit"
                >
                    <QuotaManagementEditForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Contact Information"
                    value="contactInformation"
                >
                    <ContactInformationEditForm />
                </Tabs.Item>
                <Tabs.Item label="Users" value="users">
                    <UsersEditForm />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default PartnersEditPage;
