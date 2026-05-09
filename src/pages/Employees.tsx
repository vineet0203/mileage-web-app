import React, { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { ColumnDef } from '../components/ui/DataTable'
import { Button } from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'
import Avatar from '../components/ui/Avatar'
import AddEmployeeModal from '../components/employees/AddEmployeeModal'
import EmployeeDetailsModal from '../components/employees/EmployeeDetailsModal'
import Search from '../components/ui/Search'
import { useEmployees, useDeleteEmployee } from '../hooks/useEmployees'
import { useAuthStore } from '../store/useAuthStore'
import { cn } from '../lib/utils'

interface EmployeeRow extends Record<string, unknown> {
  id: string
  fullname: string
  email: string
  role: string
  designation: string
  ssn: string
  phone: string
  manager_id: number | null
  manager_name: string | null
  is_verified: number
  created_at: string
  profile_image: string | null
}

const Employees: React.FC = () => {
  const { user } = useAuthStore()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRow | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  
  const { data, isLoading } = useEmployees(searchQuery, page, pageSize)
  const employees = data?.employees || []
  const totalItems = data?.pagination?.count || 0
  
  const deleteMutation = useDeleteEmployee()

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      deleteMutation.mutate(id)
    }
  }

  const getManagerDisplay = (row: EmployeeRow) => {
    if (row.role === 'ADMIN') return 'Itself'
    if (row.role === 'MANAGER') return 'Admin'
    return row.manager_name || 'N/A'
  }

  const columns: ColumnDef<EmployeeRow>[] = [
    {
      key: 'id',
      header: 'Emp. ID',
      accessor: 'id',
      render: (id: any) => <span className="text-slate-500 font-medium">#{id}</span>,
      headerClassName: 'w-24',
    },
    {
      key: 'name',
      header: 'Employee Name',
      accessor: 'fullname',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.profile_image} name={value as string} />
          <span className="font-bold text-slate-900">{value as string}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      accessor: 'role',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary capitalize">
          {value as string}
        </span>
      ),
    },
    {
      key: 'skills',
      header: 'Skills / Services',
      accessor: 'designation',
      render: (value) => <span className="text-slate-600 capitalize">{value as string || 'N/A'}</span>,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: 'email',
      className: 'text-slate-600 font-medium',
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
      accessor: 'id',
      render: (_, row) => (
        <span className="text-slate-600 font-medium">{getManagerDisplay(row)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'is_verified',
      render: (value) => (
        <span className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
          value === 1 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-amber-100 text-amber-700"
        )}>
          {value === 1 ? 'Active' : 'Pending'}
        </span>
      ),
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
      align: 'right',
      render: (id, row) => {
        const canEdit = user?.role === 'ADMIN' || (user?.role === 'MANAGER' && Number(user?.id) === row.manager_id)
        const isSelf = Number(user?.id) === Number(id)

        return (
          <div className="flex items-center justify-end gap-2">
            {(canEdit || isSelf) && (
              <Button variant="ghost" size="icon" onClick={() => setSelectedEmployee(row)}>
                <Pencil className="w-4 h-4 text-slate-900" />
              </Button>
            )}
            {user?.role === 'ADMIN' && !isSelf && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDelete(id as string)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Employee Master</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button size="md" className="inline-flex items-center gap-2" onClick={() => setIsAddOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Employees
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Employes</h2>
            <Search 
              placeholder="Search employees..." 
              onSearch={setSearchQuery}
              className="w-full md:max-w-md"
            />
         </div>

         <DataTable<EmployeeRow>
            columns={columns}
            data={employees}
            title=""
            pagination={{ 
              pageSize, 
              totalItems, 
              currentPage: page,
              onPageChange: (newPage) => setPage(newPage)
            }}
            isLoading={isLoading}
            hideHeader // We are using our own header above
          />
      </div>

      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <EmployeeDetailsModal
        isOpen={!!selectedEmployee}
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  )
}

export default Employees