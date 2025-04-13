import React, { ReactNode } from "react";

export type ViewCardVariant = "user" | "vessel" | "default";

interface ViewCardSectionProps {
  title: string;
  children: ReactNode;
}

const ViewCardSection: React.FC<ViewCardSectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-sm font-medium text-primary-500 mb-2">{title}</h3>
    {children}
  </div>
);

interface ViewCardFieldProps {
  label: string;
  value?: string | number;
}

const ViewCardField: React.FC<ViewCardFieldProps> = ({ label, value }) => (
  <div className="mb-4">
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    <p className="mt-1 text-sm text-gray-900">{value || "••••••••••••••••"}</p>
  </div>
);

interface ViewCardProps {
  title: string;
  subtitle?: string;
  variant?: ViewCardVariant;
  image?: string;
  data?: Record<string, any>;
  actions?: ReactNode;
}

const ViewCard: React.FC<ViewCardProps> = ({
  title,
  subtitle,
  variant = "default",
  image,
  data = {},
  actions,
}) => {
  // Render different layouts based on variant
  const renderContent = () => {
    switch (variant) {
      case "user":
        return (
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative">
                {image ? (
                  <div className="w-24 h-24 rounded-full bg-primary-100 overflow-hidden border-4 border-primary-100">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-500">
                    {title.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-0">
              {Object.entries(data).map(([key, value], index) => (
                <ViewCardField key={index} label={key} value={value} />
              ))}
            </div>
          </div>
        );

      case "vessel":
        return (
          <div className="flex flex-col gap-6">
            {/* Vessel Header with Image */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {image && (
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-primary-500">{subtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {Object.entries(data)
                    .slice(0, 3)
                    .map(([key, value], index) => (
                      <ViewCardField key={index} label={key} value={value} />
                    ))}
                </div>
              </div>
              
              {actions && (
                <div className="mt-2 md:mt-0">
                  {actions}
                </div>
              )}
            </div>

            {/* Sections */}
            <div className="mt-6">
              <ViewCardSection title="Passengers Cabins">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ViewCardField label="Cabin Name" value={data.cabinName} />
                  <ViewCardField label="Number of Adults Available" value={data.adultsAvailable} />
                  <ViewCardField label="Number of Children Available" value={data.childrenAvailable} />
                  <ViewCardField label="Agent" value={data.agent} />
                </div>
              </ViewCardSection>

              <ViewCardSection title="Cargo Compartments">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ViewCardField label="Cabin Name" value={data.cargoName} />
                  <ViewCardField label="Available Weight" value={data.availableWeight} />
                  <ViewCardField label="Available Size" value={data.availableSize} />
                  <ViewCardField label="Available Quantity" value={data.availableQuantity} />
                  <ViewCardField label="Agent" value={data.cargoAgent} />
                </div>
              </ViewCardSection>

              <ViewCardSection title="Vehicles Parking's">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ViewCardField label="Cabin Name" value={data.vehicleName} />
                  <ViewCardField label="Available Weight" value={data.vehicleWeight} />
                  <ViewCardField label="Available Size" value={data.vehicleSize} />
                  <ViewCardField label="Available Quantity" value={data.vehicleQuantity} />
                </div>
              </ViewCardSection>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {actions && <div>{actions}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(data)
                .slice(0, 9)
                .map(([key, value], index) => (
                  <ViewCardField key={index} label={key} value={value} />
                ))}
            </div>

            <ViewCardSection title="Passengers Cabins">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ViewCardField label="Cabin Name" value={data.cabinName} />
                <ViewCardField label="Number of Adults" value={data.adultsCount} />
                <ViewCardField label="Number of Children" value={data.childrenCount} />
              </div>
            </ViewCardSection>

            <ViewCardSection title="Cargo Compartments">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ViewCardField label="Cabin Name" value={data.cargoName} />
                <ViewCardField label="Weight" value={data.cargoWeight} />
                <ViewCardField label="Size" value={data.cargoSize} />
                <ViewCardField label="Quantity" value={data.cargoQuantity} />
              </div>
            </ViewCardSection>

            <ViewCardSection title="Vehicles Parking's">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ViewCardField label="Cabin Name" value={data.vehicleName} />
                <ViewCardField label="Weight" value={data.vehicleWeight} />
                <ViewCardField label="Size" value={data.vehicleSize} />
                <ViewCardField label="Quantity" value={data.vehicleQuantity} />
              </div>
            </ViewCardSection>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow w-full">
      {renderContent()}
    </div>
  );
};

export { ViewCard, ViewCardField, ViewCardSection };
export default ViewCard;
