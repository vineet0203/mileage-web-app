import React, { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { NewEmployeeFormValues } from '../components/employees/AddEmployeeModal'
import type { ColumnDef } from '../components/ui/DataTable'
import { Button } from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'
import AddEmployeeModal from '../components/employees/AddEmployeeModal'
import Search from '../components/ui/Search'

interface EmployeeRow extends Record<string, unknown> {
  id: string
  name: string
  avatar: string
  designation: string
  email: string
  ssn: string
  manager: string
  phone: string
}

const INITIAL_EMPLOYEES: EmployeeRow[] = Array.from({ length: 16 }, (_, index) => ({
  id: `#${2300 + index}`,
  name: `Jhon Smith ${index + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Employee-${index + 1}`,
  designation: 'AC Expert',
  email: `jhon${54 + index}@gmail.com`,
  ssn: `158${index}`,
  manager: 'Dinesh Yadav',
  phone: `91234567${60 + index}`,
}))

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeRow[]>(INITIAL_EMPLOYEES)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddEmployee = (values: NewEmployeeFormValues) => {
    const nextId = `#${2300 + employees.length}`
    setEmployees(prev => [
      ...prev,
      {
        id: nextId,
        name: `${values.firstName} ${values.lastName}`.trim() || 'New Employee',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.firstName}${values.lastName}`,
        designation: values.designation || 'N/A',
        email: values.email || 'N/A',
        ssn: values.ssn || 'N/A',
        manager: values.manager || 'N/A',
        phone: values.phone || 'N/A',
      },
    ])
  }

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees
    const q = searchQuery.toLowerCase()
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q)
    )
  }, [employees, searchQuery])

  const columns: ColumnDef<EmployeeRow>[] = [
    {
      key: 'id',
      header: 'Emp. ID',
      accessor: 'id',
      className: 'font-semibold text-slate-800',
      headerClassName: 'w-24',
    },
    {
      key: 'name',
      header: 'Employee Name',
      accessor: 'name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={value as string}
            className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100"
          />
          <div>
            <p className="font-medium text-slate-900">{value as string}</p>
            <p className="text-xs text-slate-400">{row.designation}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      accessor: 'email',
      className: 'text-slate-600',
    },
    {
      key: 'ssn',
      header: 'SSN Number',
      accessor: 'ssn',
      className: 'text-slate-600',
    },
    {
      key: 'manager',
      header: 'Reporting Manager',
      accessor: 'manager',
      className: 'text-slate-600',
    },
    {
      key: 'phone',
      header: 'Phone',
      accessor: 'phone',
      className: 'text-slate-600',
    },
    {
      key: 'action',
      header: 'Action',
      accessor: 'id',
      align: 'center',
      render: () => (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon">
            <Pencil className="w-4 h-4 text-slate-900" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="w-4 h-4 text-slate-900" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Master</h1>
          <p className="mt-2 text-sm text-slate-500">Manage employees, contact details, and reporting assignments.</p>
        </div>

        <div className="flex items-center gap-4">
          <Search 
            placeholder="Search employees..." 
            onSearch={setSearchQuery}
            className="hidden md:flex w-64"
          />
          <Button size="md" className="inline-flex items-center gap-2" onClick={() => setIsAddOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Employees
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        <Search 
          placeholder="Search employees..." 
          onSearch={setSearchQuery}
          className="w-full"
        />
      </div>

      <DataTable<EmployeeRow>
        columns={columns}
        data={filteredEmployees}
        title="Employees"
        pagination={{ pageSize: 8 }}
      />

      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  )
}

export default Employees