import React, { useState, useMemo } from "react";
import RoutesList from "../components/routeconfig/RoutesList";
import CreateRouteForm from "../components/routeconfig/CreateRouteForm";
import Search from "../components/ui/Search";

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
    id: "RT102",
    title: "Sector 17 - Sector 22 Chd",
    startingDestination: "Sector 17",
    arrivalDestinations: "Sector 22",
    mileageRate: 20,
  },
  {
    id: "RT103",
    title: "Sector 22 - Sector 35 Chd",
    startingDestination: "Sector 22",
    arrivalDestinations: "Sector 35",
    mileageRate: 5,
  },
  {
    id: "RT104",
    title: "Sector 43 - Sector 17 Chd",
    startingDestination: "Sector 43",
    arrivalDestinations: "Sector 17",
    mileageRate: 2,
  },
  {
    id: "RT105",
    title: "Mohali Ph 7 - Chd Sec 17",
    startingDestination: "Mohali Ph 7",
    arrivalDestinations: "Chd Sec 17",
    mileageRate: 15,
  },
  {
    id: "RT106",
    title: "Zirakpur - Panchkula",
    startingDestination: "Zirakpur",
    arrivalDestinations: "Panchkula",
    mileageRate: 12,
  },
  {
    id: "RT107",
    title: "Sec 22 - Sec 17",
    startingDestination: "Sec 22",
    arrivalDestinations: "Sec 17",
    mileageRate: 8,
  },
  {
    id: "RT108",
    title: "Sec 35 - Sec 34",
    startingDestination: "Sec 35",
    arrivalDestinations: "Sec 34",
    mileageRate: 5,
  },
  {
    id: "RT109",
    title: "Sec 43 - Sec 35",
    startingDestination: "Sec 43",
    arrivalDestinations: "Sec 35",
    mileageRate: 6,
  },
  {
    id: "RT110",
    title: "Sec 17 - Industrial Area",
    startingDestination: "Sec 17",
    arrivalDestinations: "Industrial Area",
    mileageRate: 25,
  },
];

const RouteConfiguration: React.FC = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>(INITIAL_ROUTES);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateRoute = (formData: Omit<Route, "id">) => {
    const newRoute: Route = {
      id: `RT${Math.floor(Math.random() * 1000)}`,
      ...formData,
    };
    setAllRoutes((prev) => [newRoute, ...prev]);
  };

  const filteredRoutes = useMemo(() => {
    if (!searchQuery) return allRoutes;
    const q = searchQuery.toLowerCase();
    return allRoutes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.startingDestination.toLowerCase().includes(q) ||
        r.arrivalDestinations.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }, [allRoutes, searchQuery]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Title and Search section - Sticky at top */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 bg-[#F8FAFC] z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Route Configuration
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage routes, mileage rates, and destination mappings.
          </p>
        </div>
        
        <Search 
          placeholder="Search routes..." 
          onSearch={setSearchQuery}
          className="w-full md:max-w-md"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[40%_60%] items-start flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
          <RoutesList routes={filteredRoutes} />
        </div>
        <div className="lg:sticky lg:top-0">
          <CreateRouteForm onSubmit={handleCreateRoute} />
        </div>
      </div>
    </div>
  );
};

export default RouteConfiguration;
