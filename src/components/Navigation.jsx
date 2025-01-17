import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPathValue = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return 0;
      case '/speakers': return 1;
      case '/sponsors': return 2;
      case '/notifications': return 3;
      case '/more': return 4;
      default: return 0;
    }
  };

  return (
    <BottomNavigation
      value={getPathValue()}
      onChange={(_, newValue) => {
        switch (newValue) {
          case 0: navigate('/'); break;
          case 1: navigate('/speakers'); break;
          case 2: navigate('/sponsors'); break;
          case 3: navigate('/notifications'); break;
          case 4: navigate('/more'); break;
        }
      }}
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <BottomNavigationAction label="Agenda" icon={<CalendarTodayIcon />} />
      <BottomNavigationAction label="Speakers" icon={<PeopleIcon />} />
      <BottomNavigationAction label="Sponsors" icon={<BusinessIcon />} />
      <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
    </BottomNavigation>
  );
}
