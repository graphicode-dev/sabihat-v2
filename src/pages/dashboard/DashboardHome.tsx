import HomeBg from "../../assets/images/HomeBg.png";
import { buildDynamicNavigation } from "../../config/navigationConfig";
import { useEffect, useState } from "react";
import { TabLink } from "../../types";
import Loading from "../../components/ui/Loading";

function DashboardHome() {
    const [navigationLinks, setNavigationLinks] = useState<TabLink[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                const navConfig = await buildDynamicNavigation();
                console.log("Navigation config in DashboardHome:", navConfig);
                setNavigationLinks(navConfig);
            } catch (error) {
                console.error("Failed to load navigation:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavigation();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div
            style={{
                backgroundImage: `url(${HomeBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            className="w-full h-full"
        >
            <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                    {navigationLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.path}
                            className="flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105"
                        >
                            <div className="bg-white/[0.23] rounded-full p-4 mb-2 w-32 h-32 flex items-center justify-center shadow-lg shadow-black/25 border border-white">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary-500">
                                    {link.icon ? (
                                        <img
                                            src={link.icon}
                                            alt={link.title}
                                            width={60}
                                            height={60}
                                            onError={(e) => {
                                                console.log(
                                                    `Failed to load icon for ${link.title}:`,
                                                    link.icon
                                                );
                                                // Instead of hiding the image, replace with fallback
                                                e.currentTarget.style.display =
                                                    "none";
                                                // Add fallback initial as text
                                                const parent =
                                                    e.currentTarget
                                                        .parentElement;
                                                if (parent) {
                                                    const fallback =
                                                        document.createElement(
                                                            "div"
                                                        );
                                                    fallback.className =
                                                        "text-white text-3xl font-bold";
                                                    fallback.textContent =
                                                        link.title.charAt(0);
                                                    parent.appendChild(
                                                        fallback
                                                    );
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-white text-3xl font-bold">
                                            {link.title.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-center text-sm font-bold mt-2 max-w-[150px]">
                                {link.title}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
