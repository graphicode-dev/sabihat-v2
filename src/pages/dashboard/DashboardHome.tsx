import HomeBg from "../../assets/images/HomeBg.png";
import { navigationConfig } from "../../config/navigationConfig";

function DashboardHome() {
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
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                    {navigationConfig.map((link, index) => (
                        <a
                            key={index}
                            href={link.path}
                            className="flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105"
                        >
                            <div className="bg-white/[0.23] rounded-full p-4 mb-2 w-32 h-32 flex items-center justify-center shadow-lg shadow-black/25 border border-white">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary-500">
                                    <link.icon width={60} height={60} />
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
