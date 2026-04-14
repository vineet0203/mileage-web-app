import React from "react";
import type { TravelRoute } from "../../lib/api/routes";

interface RoutesListProps {
  routes: TravelRoute[];
}

const RoutesList: React.FC<RoutesListProps> = ({ routes }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Routes List
      </h2>

      {/* List */}
      <div className="space-y-3 pr-1">
        {routes.map((route) => (
          <div
            key={route.id}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
          >
            {/* Left content */}
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {route.name}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5 whitespace-normal">
                {route.start_destination} - {route.end_destination}
              </p>
            </div>

            {/* Right badge - Showing the rate */}
            <div className="ml-3 shrink-0 rounded-full bg-blue-100 px-4 py-1.5 flex items-center justify-center gap-1">
              <span className="text-sm font-black text-slate-900 leading-none">${route.rate}</span>
              <span className="text-[10px] text-slate-500 leading-none">/Per Mileage</span>
            </div>
          </div>
        ))}
        
        {routes.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">No routes found.</p>
        )}
      </div>
    </div>
  );
};

export default RoutesList;

