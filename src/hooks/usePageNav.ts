import { useNavigate } from 'react-router-dom';

export const usePageNav = () => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  const navigateToSignup = () => {
    navigate('/auth/register');
  };

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToMypage = () => {
    navigate('/mypage/myprofile');
  };

  const navigateToRoleBasedPage = (role: string) => {
    switch (role) {
      case 'NORMAL':
        navigate('/search');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      case 'IDOL':
        navigate('/main/idol');
        break;
      case 'MANAGER':
        navigate('/main/manager');
        break;
      default:
        navigate('/');
    }
  };

  return {
    navigateToLanding,
    navigateToLogin,
    navigateToSignup,
    navigateToSearch,
    navigateToMypage,
    navigateToRoleBasedPage,
  };
};
