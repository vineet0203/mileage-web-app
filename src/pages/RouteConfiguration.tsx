import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import RoutesList from "../components/routeconfig/RoutesList";
import CreateRouteForm from "../components/routeconfig/CreateRouteForm";
import Search from "../components/ui/Search";
import { routesApi, type TravelRoute, } from "../lib/api/routes";
import { useAuthStore } from "../store/useAuthStore";
import { cn } from "../lib/utils";

const RouteConfiguration: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthStore()

  // Handle Search Debouncing (delay api call for 300ms while user types)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch routes from the Backend API using name parameter for the search pattern
  const { data: routesResponse, isLoading, isError } = useQuery({
    queryKey: ['routes', debouncedSearch],
    queryFn: () => routesApi.getRoutes(debouncedSearch ? { name: debouncedSearch } : undefined),
  });

  const routes: TravelRoute[] = routesResponse?.data || [];

  // Create Route Mutation hook
  const createMutation = useMutation({
    mutationFn: routesApi.createRoute,
    onSuccess: () => {
      enqueueSnackbar('Route created successfully', { variant: 'success' });
      // Invalidate to eagerly update our route list
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to create route', { variant: 'error' });
    }
  });

  const handleCreateRoute = (formData: { name: string; rate: number; startDestination: string; endDestination: string }) => {
    createMutation.mutate(formData);
  };

  const isEmployee = user?.role === "EMPLOYEE";

  return (
    <div className="flex flex-col">
      {/* Title and Search section - Sticky at top */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 bg-[#F8FAFC] z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Route Configuration
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage routes and destination mappings.
          </p>
        </div>

        <Search
          placeholder="Search routes..."
          onSearch={setSearchQuery}
          className="w-full md:max-w-md"
        />
      </div>

      <div className={cn(
        "grid gap-6 items-start flex-1 overflow-hidden min-h-0",
        isEmployee ? "grid-cols-1 max-w-3xl mx-auto w-full" : "lg:grid-cols-[40%_60%]"
      )}>
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading routes...</div>
          ) : isError ? (
            <div className="text-center py-10 text-red-500">Failed to load routes.</div>
          ) : (
            <RoutesList routes={routes} />
          )}
        </div>
        {!isEmployee && (
          <div className="lg:sticky lg:top-0">
            <CreateRouteForm onSubmit={handleCreateRoute} isPending={createMutation.isPending} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteConfiguration;
