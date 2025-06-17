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
            bgColorClass = "bg-[#FFE5C9]";
            break;
        case "Active": // Green
            bgColorClass = "bg-[#C7FFC8]";
            break;
        case "Maintenance": // Red
            bgColorClass = "bg-[#FFC8C8]";
            break;
        case "Docked": // Teal
            bgColorClass = "bg-[#BEFFF8]";
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
