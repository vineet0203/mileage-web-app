import React, { useState, useMemo } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import Modal from "../ui/Modal";
import { useInviteEmployee, useEmployees } from "../../hooks/useEmployees";
import { useAuthStore } from "../../store/useAuthStore";
import { Mail, Building2, User as UserIcon, Briefcase, IdCard, Phone, Users } from "lucide-react";

interface FormState {
  email: string;
  fullname: string;
  role: string;
  designation: string;
  ssn: string;
  phone: string;
  manager_id: string;
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user: currentUser } = useAuthStore();
  const { data: employees } = useEmployees();

  const managers = useMemo(() => {
    return employees?.filter(emp => emp.role === 'MANAGER') || [];
  }, [employees]);

  const [formData, setFormData] = useState<FormState>({
    email: "",
    fullname: "",
    role: "EMPLOYEE",
    designation: "",
    ssn: "",
    phone: "",
    manager_id: "",
  });

  const inviteMutation = useInviteEmployee();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.role) return;

    // Send invitation with role and email. 
    inviteMutation.mutate(
      { 
        email: formData.email, 
        role: formData.role as 'MANAGER' | 'EMPLOYEE',
        manager_id: formData.role === 'EMPLOYEE' ? (formData.manager_id || undefined) : undefined
      },
      {
        onSuccess: () => {
          setFormData({
            email: "",
            fullname: "",
            role: "EMPLOYEE",
            designation: "",
            ssn: "",
            phone: "",
            manager_id: "",
          });
          onClose();
        },
      }
    );
  };

  const roleOptions = [
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'MANAGER', label: 'Manager / Team Lead' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Team Member"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 px-8 py-8">
        <p className="text-sm text-slate-500">
          Invite a team member by email. You can pre-fill their profile information below.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Email Address *"
              placeholder="colleague@company.com"
              type="email"
              icon={<Mail className="w-5 h-5 text-slate-400" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Full Name"
              placeholder="e.g. Jhon Smith"
              icon={<UserIcon className="w-5 h-5 text-slate-400" />}
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />

            <Select
              label="Assign Role *"
              options={roleOptions}
              icon={<Building2 className="w-5 h-5 text-slate-400" />}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />

            {formData.role === 'EMPLOYEE' && currentUser?.role === 'ADMIN' && (
              <Select
                label="Reporting Manager"
                options={[
                  { value: '', label: 'None (Reports to Admin)' },
                  ...managers.map(m => ({ value: m.id.toString(), label: m.fullname }))
                ]}
                icon={<Users className="w-5 h-5 text-slate-400" />}
                value={formData.manager_id}
                onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
              />
            )}

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
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={inviteMutation.isPending}>
            {inviteMutation.isPending ? 'Sending Invitation...' : 'Send Invitation'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEmployeeModal;
