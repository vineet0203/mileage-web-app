import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import Modal from "../ui/Modal";
import { useUpdateEmployee, useEmployees } from "../../hooks/useEmployees";
import { useAuthStore } from "../../store/useAuthStore";
import { User, Briefcase, IdCard, Phone, Mail, Shield, Users } from "lucide-react";

interface Employee {
  id: string | number;
  fullname: string;
  email: string;
  role: string;
  designation?: string;
  ssn?: string;
  phone?: string;
  manager_id?: string | number | null;
  [key: string]: any;
}

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
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
    manager_id: "",
  });

  const { data } = useEmployees();
  const employees = data?.employees || [];

  const managers = useMemo(() => {
    return (employees as Employee[]).filter(emp => emp.role === 'MANAGER' || emp.role === 'ADMIN');
  }, [employees]);

  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.fullname || "",
        role: employee.role || "EMPLOYEE",
        designation: employee.designation || "",
        ssn: employee.ssn || "",
        phone: employee.phone || "",
        manager_id: employee.manager_id?.toString() || "",
      });
    }
  }, [employee]);

  const isEditingSelf = user?.id === employee?.id;
  const isAdmin = user?.role === 'ADMIN';
  const isTargetAdmin = formData.role === 'ADMIN';
  const canChangeRole = isAdmin && !isEditingSelf && !isTargetAdmin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee?.id) return;

    if (!isTargetAdmin && !formData.manager_id) {
       // Manual validation check if needed, but 'required' on select will handle it
       return;
    }

    updateMutation.mutate(
      { id: employee.id.toString(), data: formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const roleOptions = [
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
            id="fullname"
            label="Full Name"
            placeholder="e.g. Jhon Smith"
            icon={<User className="w-5 h-5 text-slate-400" />}
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            required
          />

          <Select
            id="role"
            label="Role"
            options={isTargetAdmin ? [{ value: "ADMIN", label: "Admin" }, ...roleOptions] : roleOptions}
            icon={<Shield className="w-5 h-5 text-slate-400" />}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={!canChangeRole}
            required
          />

          <Input
            id="designation"
            label="Skills / Services (Designation)"
            placeholder="e.g. AC Expert"
            icon={<Briefcase className="w-5 h-5 text-slate-400" />}
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
          />

          <Input
            id="ssn"
            label="SSN Number"
            placeholder="e.g. 1587"
            icon={<IdCard className="w-5 h-5 text-slate-400" />}
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
          />

          <Input
            id="phone"
            label="Phone"
            placeholder="e.g. 9123456761"
            icon={<Phone className="w-5 h-5 text-slate-400" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {isTargetAdmin ? (
            <Input
              id="reporting-itself"
              label="Reporting Manager"
              value="Itself"
              disabled
              icon={<Users className="w-5 h-5 text-slate-400" />}
            />
          ) : (
            <Select
              id="manager_id"
              label="Reporting Manager"
              options={managers.map((m: Employee) => ({ 
                value: m.id.toString(), 
                label: `${m.fullname} (${m.email})` 
              }))}
              icon={<Users className="w-5 h-5 text-slate-400" />}
              value={formData.manager_id}
              onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
              required
            />
          )}

          <Input
            id="email-view"
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
