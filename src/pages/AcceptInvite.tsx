import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { authApi } from '../lib/api/auth';

const AcceptInvite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const acceptMutation = useMutation({
    mutationFn: (data: any) => authApi.acceptInvite(data),
    onSuccess: () => {
      setIsSuccess(true);
      enqueueSnackbar('Account activated successfully!', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to activate account', { variant: 'error' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar('Invalid invitation link', { variant: 'error' });
      return;
    }
    if (password.length < 6) {
      enqueueSnackbar('Password must be at least 6 characters', { variant: 'warning' });
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }

    acceptMutation.mutate({ inviteToken: token, password });
  };

  if (!token && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Invalid Link</h2>
          <p className="text-slate-500 mb-8">This invitation link is invalid or has expired.</p>
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Welcome Aboard!</h2>
          <p className="text-slate-500 mb-8">Your account has been activated. You can now log in to the platform.</p>
          <Button onClick={() => navigate('/login')} className="w-full py-6 text-lg">
            Go to Login <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-brand-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/20">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Set Your Password</h1>
          <p className="text-slate-500 mt-2">Finish setting up your account to get started.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full py-6 text-lg"
              disabled={acceptMutation.isPending}
            >
              {acceptMutation.isPending ? 'Activating Account...' : 'Complete Setup'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvite;
