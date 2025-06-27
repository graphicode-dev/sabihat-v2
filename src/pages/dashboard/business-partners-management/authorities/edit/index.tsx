import AuthoritiesContactInformationEditForm from "../../../../../components/business-partners-management/edit/AuthoritiesContactInformationEditForm";
import AuthoritiesMasterEditForm from "../../../../../components/business-partners-management/edit/AuthoritiesMasterEditForm";
import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";

function AuthoritiesEditPage() {
    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item label="Authorities Master" value="authoritiesMaster">
                    <AuthoritiesMasterEditForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Contact Information"
                    value="contactInformation"
                >
                    <AuthoritiesContactInformationEditForm />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default AuthoritiesEditPage;
