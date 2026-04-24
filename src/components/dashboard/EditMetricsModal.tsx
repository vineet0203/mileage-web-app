import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/Button";
import { Navigation, DollarSign } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsApi, type Trip } from "../../lib/api/trips";
import { useSnackbar } from "notistack";

interface EditMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

const EditMetricsModal: React.FC<EditMetricsModalProps> = ({ isOpen, onClose, trip }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [distance, setDistance] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");

  useEffect(() => {
    if (trip) {
      setDistance(String(trip.distance));
      setTotalPrice(String(trip.total_price));
    }
  }, [trip, isOpen]);

  const updateMetricsMutation = useMutation({
    mutationFn: (data: { distance: number; total_price: number }) => 
      tripsApi.updateTripMetrics(trip!.id, data),
    onSuccess: () => {
      enqueueSnackbar('Trip metrics updated successfully', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['tripStats'] });
      // Also invalidate details if we had a specific details query
      queryClient.invalidateQueries({ queryKey: ['trip', trip?.id] });
      onClose();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to update metrics', { variant: 'error' });
    }
  });

  const handleDistanceChange = (val: string) => {
    setDistance(val);
    const distNum = parseFloat(val);
    if (!isNaN(distNum) && trip?.route_rate) {
      const calculatedPrice = (distNum * Number(trip.route_rate)).toFixed(2);
      setTotalPrice(calculatedPrice);
    }
  };

  const handlePriceChange = (val: string) => {
    setTotalPrice(val);
  };

  const handleSave = () => {
    const distNum = parseFloat(distance);
    const priceNum = parseFloat(totalPrice);

    if (isNaN(distNum) || isNaN(priceNum)) {
      enqueueSnackbar('Please enter valid numbers', { variant: 'warning' });
      return;
    }

    updateMetricsMutation.mutate({
      distance: distNum,
      total_price: priceNum
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Trip Metrics" className="max-w-md">
      <div className="p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Total Distance (km)
          </label>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              value={distance}
              onChange={(e) => handleDistanceChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-slate-800"
              placeholder="0.0"
              step="0.1"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 ml-1 italic">
            Updating distance will automatically recalculate price based on route rate (${trip?.route_rate}/km).
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Total Price ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-slate-800"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1 py-3" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 py-3" 
            onClick={handleSave}
            loading={updateMetricsMutation.isPending}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditMetricsModal;
