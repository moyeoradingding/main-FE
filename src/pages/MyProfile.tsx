import { useState } from 'react';

import FavoriteIdols from '@/components/mypage/FavoriteIdols';
import PasswordEdit from '@/components/mypage/PasswordEdit';
import Profile from '@/components/mypage/Profile';
import ProfileEdit from '@/components/mypage/ProfileEdit';

type ProfileViewMode = 'view' | 'edit' | 'password_edit';

export default function MyProfile() {
  const [currentView, setCurrentView] = useState<ProfileViewMode>('view');

  const handleSwitchToEdit = () => {
    setCurrentView('edit');
  };

  const handleSwitchToPasswordEdit = () => {
    setCurrentView('password_edit');
  };

  const handleCancelEdit = () => {
    setCurrentView('view');
  };

  const renderView = () => {
    switch (currentView) {
      case 'view':
        return (
          <>
            <Profile onEditClick={handleSwitchToEdit} />
            <FavoriteIdols />
          </>
        );
      case 'edit':
        return (
          <ProfileEdit
            onCancelEdit={handleCancelEdit}
            onSwitchToPasswordEdit={handleSwitchToPasswordEdit}
          />
        );
      case 'password_edit':
        return <PasswordEdit onCancelEdit={handleCancelEdit} />;
      default:
        return null;
    }
  };

  return <>{renderView()}</>;
}
