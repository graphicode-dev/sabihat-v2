import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../layout/PageLayout";

interface FeaturePlaceholderProps {
    featureName?: string;
    activityName?: string;
}

const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
    featureName,
    activityName,
}) => {
    const location = useLocation();
    const [pathInfo, setPathInfo] = useState({
        feature: featureName || "",
        activity: activityName || "",
        action: "",
    });

    useEffect(() => {
        // Extract feature and activity names from the URL path if not provided as props
        const pathParts = location.pathname.split("/").filter(Boolean);

        if (pathParts.length > 0) {
            const extractedFeature =
                featureName || pathParts[0].replace(/-/g, " ");
            let extractedActivity = activityName || "";
            let extractedAction = "";

            if (pathParts.length > 1) {
                extractedActivity = pathParts[1].replace(/-/g, " ");

                if (pathParts.length > 2) {
                    extractedAction = pathParts[2];
                }
            }

            setPathInfo({
                feature: extractedFeature,
                activity: extractedActivity,
                action: extractedAction,
            });
        }
    }, [location.pathname, featureName, activityName]);

    return (
        <PageLayout className="flex items-center justify-center">
            <div>
                <div className="text-2xl font-bold text-gray-500 mb-4">
                    Coming Soon
                </div>
                <p className="text-gray-600">
                    This feature is currently under development and will be
                    available soon.
                </p>
            </div>
        </PageLayout>
    );
};

export default FeaturePlaceholder;
