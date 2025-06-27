import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import PartnersMasterAddForm from "../../../../../components/business-partners-management/add/PartnersMasterAddForm";
import QuotaManagementAddForm from "../../../../../components/business-partners-management/add/QuotaManagementAddForm";
import ContactInformationAddForm from "../../../../../components/business-partners-management/add/ContactInformationAddForm";
import UsersAddForm from "../../../../../components/business-partners-management/add/UsersAddForm";

function PartnersAddPage() {
    return (
        <PageLayout showBorder>
            <h1 className="text-xl text-left font-bold px-5">Add</h1>
            <Tabs hideBorder>
                <Tabs.Item label="Partners Master" value="partnersMaster">
                    <PartnersMasterAddForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Quota Management & Credit Limit"
                    value="quota-management-credit-limit"
                >
                    <QuotaManagementAddForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Contact Information"
                    value="contactInformation"
                >
                    <ContactInformationAddForm />
                </Tabs.Item>
                <Tabs.Item label="Users" value="users">
                    <UsersAddForm />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default PartnersAddPage;
