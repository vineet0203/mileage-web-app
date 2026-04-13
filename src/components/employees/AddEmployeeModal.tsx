import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Modal from "../ui/Modal";

export interface NewEmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  designation: string;
  manager: string;
  address: string;
  mileageRate: string;
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEmployeeFormValues) => void;
}

const initialFormState: NewEmployeeFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  ssn: "",
  designation: "",
  manager: "",
  address: "",
  mileageRate: "",
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formValues, setFormValues] =
    useState<NewEmployeeFormValues>(initialFormState);

  useEffect(() => {
    if (isOpen) {
      setFormValues(initialFormState);
    }
  }, [isOpen]);

  const handleChange = (key: keyof NewEmployeeFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Employee"
      className="max-w-4xl"
    >
      <div className="space-y-6 px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <Input
            label="Email ID"
            placeholder="Email ID"
            type="email"
            value={formValues.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            type="tel"
            value={formValues.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="SSN Number"
            placeholder="SSN Number"
            value={formValues.ssn}
            onChange={(e) => handleChange("ssn", e.target.value)}
          />
          <Input
            label="Designation"
            placeholder="Designation"
            value={formValues.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
          <Input
            label="Reporting Manager"
            placeholder="Reporting Manager"
            value={formValues.manager}
            onChange={(e) => handleChange("manager", e.target.value)}
          />
          <Input
            label="Address"
            placeholder="Address"
            value={formValues.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            label="Mileage Rate"
            placeholder="Mileage Rate"
            value={formValues.mileageRate}
            onChange={(e) => handleChange("mileageRate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;
