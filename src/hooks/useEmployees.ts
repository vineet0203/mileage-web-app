import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { employeesApi } from '../lib/api/employees';

export const useEmployees = (search?: string) => {
  return useQuery({
    queryKey: ['employees', search],
    queryFn: () => employeesApi.getEmployees(search),
    select: (data) => data.data,
  });
};

export const useInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => employeesApi.getInvitations(),
    select: (data) => data.data,
  });
};

export const useInviteEmployee = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: employeesApi.inviteEmployee,
    onSuccess: () => {
      enqueueSnackbar('Invitation sent successfully', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to send invitation', { variant: 'error' });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => employeesApi.updateEmployee(id, data),
    onSuccess: () => {
      enqueueSnackbar('Employee updated successfully', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Update failed', { variant: 'error' });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: employeesApi.deleteEmployee,
    onSuccess: () => {
      enqueueSnackbar('Employee removed successfully', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Deletion failed', { variant: 'error' });
    },
  });
};
