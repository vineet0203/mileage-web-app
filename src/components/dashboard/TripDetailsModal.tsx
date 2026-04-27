import React, { useState } from "react";
import { Calendar, MapPin, Navigation, DollarSign, Edit2, Route } from "lucide-react";
import Modal from "../ui/Modal";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/useAuthStore";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { tripsApi, type Trip } from "../../lib/api/trips";
import { baseURL } from "../../lib/axios";
import EditMetricsModal from "./EditMetricsModal";

interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId?: number | null;
  onApprove?: () => void;
  onReject?: () => void;
}

const getImgUrl = (path: string | undefined | null) => {
  if (!path) return null;
  try {
    // Full URL — extract just the pathname so stale hosts are stripped
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const { pathname } = new URL(path);
      return `${baseURL}${pathname}`;
    }
    // Relative path — prepend base URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseURL}${cleanPath}`;
  } catch {
    return path;
  }
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-brand-primary shadow-sm">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-brand-primary shrink-0" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
    <span className="text-sm font-bold text-slate-800">{value}</span>
  </div>
);

const HistoryItem = ({
  trip,
}: {
  trip: Trip;
}) => (
  <div className="flex items-start justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="space-y-0.5">
      <p className="text-[10px] text-slate-400 font-bold uppercase">{format(new Date(trip.created_at), 'MMMM dd, yyyy')}</p>
      <p className="text-sm font-bold text-slate-800 truncate max-w-[140px]">{trip.title}</p>
      <p className="text-[10px] text-slate-400 font-medium">{Number(trip.distance).toFixed(1)} km covered</p>
    </div>
    <div className="flex flex-col items-end gap-1 ml-4 shrink-0">
      <span className="text-sm font-black text-slate-900">${Number(trip.total_price).toFixed(2)}</span>
      <span
        className={cn(
          "text-[9px] font-black uppercase tracking-tighter",
          trip.status === "APPROVED" ? "text-green-500" :
            trip.status === "REJECTED" ? "text-red-500" :
              trip.status === "IN_PROGRESS" ? "text-blue-500" : "text-amber-500",
        )}
      >
        {trip.status === 'COMPLETED_PENDING' ? 'Pending' : trip.status.replace('_', ' ')}
      </span>
    </div>
  </div>
);

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({
  isOpen,
  onClose,
  tripId,
  onApprove,
  onReject,
}) => {
  const { user } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch current trip details
  const { data: tripResponse, isLoading: isTripLoading } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => tripsApi.getTripDetails(tripId!),
    enabled: !!tripId && isOpen,
  });

  const trip = tripResponse?.data;

  const isManagerOrAdmin = user?.role === 'MANAGER' || user?.role === 'ADMIN';
  const canAction = isManagerOrAdmin && trip?.status === 'COMPLETED_PENDING';

  // Fetch employee's other trips
  const { data: historyResponse } = useQuery({
    queryKey: ['trips', 'history', trip?.user_id],
    queryFn: () => tripsApi.getTrips({ user_id: trip?.user_id, limit: 10 }),
    enabled: !!trip?.user_id && isOpen,
  });

  const history = (historyResponse?.data || []).filter((t: Trip) => t.id !== trip?.id);

  const handleApprove = () => {
    onApprove?.();
  };

  const handleReject = () => {
    onReject?.();
  };

  return (
    <>
      <EditMetricsModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        trip={trip || null}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Trip Details"
        className="max-w-5xl"
      >
        {isTripLoading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row min-h-0 bg-slate-50">
            <div className="flex-1 p-6 space-y-6 border-r border-slate-100">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Trip Date</p>
                    <span className="text-base font-black text-slate-800">
                      {trip?.created_at ? format(new Date(trip.created_at), 'MMMM dd, yyyy') : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 font-bold text-slate-400">
                    {trip?.employee_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Employee</p>
                    <span className="text-sm font-bold text-slate-800">{trip?.employee_name}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Metrics</h4>
                    {canAction && (
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-brand-primary hover:text-brand-dark flex items-center gap-1 text-[10px] font-bold uppercase"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit Metrics
                      </button>
                    )}
                  </div>
                  
                  <InfoRow
                    icon={MapPin}
                    label="Starting Location"
                    value={trip?.start_location_address || "N/A"}
                  />
                  <InfoRow
                    icon={MapPin}
                    label="Destination"
                    value={trip?.end_location_address || "Pending..."}
                  />
                  <InfoRow
                    icon={Navigation}
                    label="Total Distance"
                    value={`${Number(trip?.distance || 0).toFixed(1)} km`}
                  />
                  <InfoRow
                    icon={DollarSign}
                    label="Total Price"
                    value={`$${Number(trip?.total_price || 0).toFixed(2)}`}
                  />
                  {/* Odometer Reading — start & end in a single box */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-brand-primary shadow-sm">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-4 h-4 text-brand-primary shrink-0" />
                      <span className="text-sm text-slate-500">Odometer Reading</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Start</span>
                        <span>{Number(trip?.start_mileage ?? 0).toLocaleString()}</span>
                      </div>
                      <span className="text-slate-300 text-xs font-normal">→</span>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">End</span>
                        <span>
                          {trip?.end_mileage != null
                            ? Number(trip.end_mileage).toLocaleString()
                            : <span className="text-slate-400 text-xs font-normal italic">Pending</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Odometer Proofs</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          {trip?.start_odometer_img ? (
                            <img src={getImgUrl(trip.start_odometer_img)!} alt="Start" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                          )}
                        </div>
                        <p className="text-[10px] text-center font-bold text-slate-500 uppercase">Start</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          {trip?.end_odometer_img ? (
                            <img src={getImgUrl(trip.end_odometer_img)!} alt="End" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                          )}
                        </div>
                        <p className="text-[10px] text-center font-bold text-slate-500 uppercase">End</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trip Title</h4>
                    <p className="text-sm font-bold text-slate-800">{trip?.title || "No title"}</p>
                    <p className="text-xs text-slate-500 mt-1">{trip?.description || "No description provided."}</p>
                  </div>

                  {/* Route Details Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Route className="w-3.5 h-3.5 text-brand-primary" />
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Route</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800">{trip?.route_name || "N/A"}</p>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black">
                        <DollarSign className="w-3 h-3" />
                        {Number(trip?.route_rate ?? 0).toFixed(2)} / km
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {canAction && (
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleApprove} variant="primary" className="flex-1 py-4">
                    Approve Trip
                  </Button>
                  <Button onClick={handleReject} variant="outline" className="flex-1 py-4 text-red-500 hover:bg-red-50 hover:border-red-200">
                    Reject Trip
                  </Button>
                </div>
              )}

              {!canAction && trip?.status !== 'IN_PROGRESS' && (
                <div className={cn(
                  "p-4 rounded-xl text-center font-bold text-sm",
                  trip?.status === 'APPROVED' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                  This trip has been {trip?.status?.toLowerCase()}
                </div>
              )}
            </div>

            <div className="w-full lg:w-80 p-6 flex flex-col gap-4 shrink-0 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-800">Employee Ride History</h3>

              <div className="space-y-3 overflow-y-auto pr-1 max-h-[600px] custom-scrollbar">
                {history.map((t: Trip) => (
                  <HistoryItem key={t.id} trip={t} />
                ))}

                {history.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                      <Navigation className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">No other trips found <br /> for this employee.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TripDetailsModal;
