import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import Modal from "../ui/Modal";
import { useUpdateEmployee } from "../../hooks/useEmployees";
import { useAuthStore } from "../../store/useAuthStore";
import { User, Briefcase, IdCard, Phone, Mail, Shield } from "lucide-react";

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const { user } = useAuthStore();
  const updateMutation = useUpdateEmployee();
  const [formData, setFormData] = useState({
    fullname: "",
    role: "",
    designation: "",
    ssn: "",
    phone: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.fullname || "",
        role: employee.role || "EMPLOYEE",
        designation: employee.designation || "",
        ssn: employee.ssn || "",
        phone: employee.phone || "",
      });
    }
  }, [employee]);

  const isEditingSelf = user?.id === employee?.id;
  const isAdmin = user?.role === 'ADMIN';
  const canChangeRole = isAdmin && !isEditingSelf;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee?.id) return;

    updateMutation.mutate(
      { id: employee.id, data: formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "MANAGER", label: "Manager" },
    { value: "EMPLOYEE", label: "Employee" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Employee Details"
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Full Name *"
            placeholder="e.g. Jhon Smith"
            icon={<User className="w-5 h-5 text-slate-400" />}
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            required
          />

          <Select
            label="Role"
            options={roleOptions}
            icon={<Shield className="w-5 h-5 text-slate-400" />}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={!canChangeRole}
          />

          <Input
            label="Designation"
            placeholder="e.g. AC Expert"
            icon={<Briefcase className="w-5 h-5 text-slate-400" />}
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
          />

          <Input
            label="SSN Number"
            placeholder="e.g. 1587"
            icon={<IdCard className="w-5 h-5 text-slate-400" />}
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
          />

          <Input
            label="Phone"
            placeholder="e.g. 9123456761"
            icon={<Phone className="w-5 h-5 text-slate-400" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input
            label="Email (View Only)"
            value={employee?.email || ""}
            disabled
            icon={<Mail className="w-5 h-5 text-slate-400" />}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving Changes..." : "Update Employee"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeDetailsModal;
