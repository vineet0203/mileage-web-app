import React from "react";
import type { Route } from "../../pages/RouteConfiguration";

interface RoutesListProps {
  routes: Route[];
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
            key={`${route.id}-${route.mileageRate}`}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
          >
            {/* Left content */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {route.id}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {route.title}
              </p>
            </div>

            {/* Right badge */}
            <div className="ml-3 shrink-0 rounded-full bg-blue-100 px-3 py-1 flex items-center justify-center gap-1 text-black">
              <span className="text-lg font-medium leading-none">
                ${route.mileageRate}
              </span>
              <span className="text-xs leading-none">Per Mileage</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesList;
