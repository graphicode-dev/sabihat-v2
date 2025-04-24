export const statuses = {
    "In Transit": "orange",
    Active: "green",
    Maintenance: "red",
    Docked: "teal",
};

export default function BgColorClass({ status }: { status: string }) {
    let bgColorClass = "";
    switch (status) {
        case "In Transit": // Orange/Peach
            bgColorClass = "bg-orange-200 text-orange-800";
            break;
        case "Active": // Green
            bgColorClass = "bg-green-200 text-green-800";
            break;
        case "Maintenance": // Red
            bgColorClass = "bg-red-200 text-red-800";
            break;
        case "Docked": // Teal
            bgColorClass = "bg-teal-200 text-teal-800";
            break;
        default:
            bgColorClass = "bg-gray-200 text-gray-800";
    }

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${bgColorClass}`}
        >
            {status}
        </span>
    );
}
