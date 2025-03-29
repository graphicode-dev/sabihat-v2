import PageLayout from "../../components/layout/PageLayout";
import CompaniesTable from "../../components/tables/CompaniesTable";
import { TableGroup } from "../../context/TableContext";

function DashboardHome() {
    // Sample data for the table
    const companiesData: TableGroup[] = [
        {
            id: "group1",
            title: "Group1",
            value: "********",
            rows: [
                {
                    id: "1",
                    name: "Company Name",
                    email: "info@companyname.com",
                    phone: "+1 234 567 890",
                    address: "123 Street Name, City, Country",
                },
                {
                    id: "2",
                    name: "Another Company",
                    email: "contact@anothercompany.com",
                    phone: "+1 987 654 321",
                    address: "456 Avenue Name, City, Country",
                },
                {
                    id: "3",
                    name: "Third Company",
                    email: "hello@thirdcompany.com",
                    phone: "+1 555 123 456",
                    address: "789 Boulevard, City, Country",
                },
            ],
        },
        {
            id: "group2",
            title: "Group2",
            value: "********",
            rows: [
                {
                    id: "4",
                    name: "Fourth Company",
                    email: "info@fourthcompany.com",
                    phone: "+1 111 222 333",
                    address: "101 Main Street, City, Country",
                },
                {
                    id: "5",
                    name: "Fifth Company",
                    email: "contact@fifthcompany.com",
                    phone: "+1 444 555 666",
                    address: "202 Second Avenue, City, Country",
                },
            ],
        },
    ];

    return (
        <PageLayout>
            <CompaniesTable 
                initialGroups={companiesData} 
                initialExpandedGroups={["group1"]} 
            />
        </PageLayout>
    );
}

export default DashboardHome;
