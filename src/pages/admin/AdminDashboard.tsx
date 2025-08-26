import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountActions from './sections/AccountActions';
import DashboardHeader from './sections/DashboardHeader';
import MemberActions from './sections/MemberActions';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleCreateIdol = useCallback(() => {
    navigate('/admin/accounts/new?role=idol');
  }, [navigate]);

  const handleCreateManager = useCallback(() => {
    navigate('/admin/accounts/new?role=manager');
  }, [navigate]);

  const handleOpenMembers = useCallback(() => {
    navigate('/admin/users');
  }, [navigate]);

  return (
    <div className="py-16 md:pt-20 md:pb-28">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-16 md:px-12">
        <AccountActions
          onCreateIdol={handleCreateIdol}
          onCreateManager={handleCreateManager}
        />
        <MemberActions onOpenMembers={handleOpenMembers} />
      </div>
    </div>
  );
}
