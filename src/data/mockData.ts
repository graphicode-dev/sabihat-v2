import { TableColumn, TableData } from "../types/table";
import { faker } from "@faker-js/faker";

export const columns: TableColumn[] = [
    { id: "col1", header: "Name", accessorKey: "name", sortable: true },
    { id: "col2", header: "Status", accessorKey: "status", sortable: true },
    { id: "col3", header: "Role", accessorKey: "role", sortable: true },
    { id: "col4", header: "Team", accessorKey: "team", sortable: true },
    { id: "col5", header: "Project", accessorKey: "project", sortable: true },
    { id: "col6", header: "Email", accessorKey: "email", sortable: true },
    { id: "col7", header: "Phone", accessorKey: "phone", sortable: true },
    { id: "col8", header: "Location", accessorKey: "location", sortable: true },
];

// Define possible values for certain fields
const roles = [
    "Developer",
    "Designer",
    "Product Manager",
    "QA Engineer",
    "DevOps Engineer",
    "Data Analyst",
];
const teams = [
    "Engineering",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Support",
];
const projects = [
    "Dashboard UI",
    "Mobile App",
    "API Integration",
    "Landing Page",
    "Authentication",
    "Analytics Platform",
    "E-commerce Site",
    "CRM System",
];
const statuses = ["Active", "Inactive", "On Leave", "Pending"];
const groups = ["Design", "Product", "Engineering", "Marketing", "Sales"];

// Generate mock data using Faker
export const mockData: TableData[] = Array.from({ length: 100 }, (_, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const group = faker.helpers.arrayElement(groups);

    return {
        id: (index + 1).toString(),
        avatar: faker.image.avatar(),
        columns: {
            name: fullName,
            status: faker.helpers.arrayElement(statuses),
            role: faker.helpers.arrayElement(roles),
            team: faker.helpers.arrayElement(teams),
            project: faker.helpers.arrayElement(projects),
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            phone: faker.phone.number(),
            location: faker.location.city(),
        },
        group,
    };
});
