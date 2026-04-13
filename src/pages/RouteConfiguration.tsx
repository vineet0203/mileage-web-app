import React, { useState } from "react";
import RoutesList from "../components/routeconfig/RoutesList";
import CreateRouteForm from "../components/routeconfig/CreateRouteForm";

export interface Route {
  id: string;
  title: string;
  startingDestination: string;
  arrivalDestinations: string;
  mileageRate: number;
}

const INITIAL_ROUTES: Route[] = [
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 10,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 20,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 5,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 2,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 9,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 9,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 9,
  },
  {
    id: "RT101",
    title: "Sector 35 - Sector 43 Chd",
    startingDestination: "Sector 35",
    arrivalDestinations: "Sector 43",
    mileageRate: 9,
  },
];

const RouteConfiguration: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES);

  const handleCreateRoute = (formData: Omit<Route, "id">) => {
    const newRoute: Route = {
      id: `RT${Math.floor(Math.random() * 1000)}`,
      ...formData,
    };
    setRoutes((prev) => [newRoute, ...prev]);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Route Configuration
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage routes, mileage rates, and destination mappings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[40%_60%]">
        <div>
          <RoutesList routes={routes} />
        </div>
        <div>
          <CreateRouteForm onSubmit={handleCreateRoute} />
        </div>
      </div>
    </div>
  );
};

export default RouteConfiguration;
