import { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Card, 
  Typography, 
  Button, 
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PollIcon from '@mui/icons-material/Poll';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';
import { notifications } from '../data/notifications';
import { speakers } from '../data/speakers';

function NotificationCard({ notification, onViewDetails, onScanQR }) {
  const getIcon = (type) => {
    switch (type) {
      case 'change': return <NotificationsIcon color="error" />;
      case 'reminder': return <ScheduleIcon color="primary" />;
      case 'poll': return <PollIcon color="secondary" />;
      default: return <NotificationsIcon />;
    }
  };

  const getTimeString = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getSpeakerDetails = (speakerName) => {
    return speakers.find(s => s.name === speakerName);
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ mr: 2 }}>{getIcon(notification.type)}</Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {notification.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {notification.message}
          </Typography>
          {notification.session && (
            <Box sx={{ mt: 2 }}>
              {notification.type === 'change' && (
                <Stack direction="column" spacing={1}>
                  {notification.session.newRoom && (
                    <Typography variant="body2">
                      <RoomIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Room: {notification.session.oldRoom} → {notification.session.newRoom}
                    </Typography>
                  )}
                  {notification.session.newTime && (
                    <Typography variant="body2">
                      <ScheduleIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Time: {notification.session.oldTime} → {notification.session.newTime}
                    </Typography>
                  )}
                </Stack>
              )}
              {notification.type === 'reminder' && (
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">
                    <ScheduleIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {notification.session.time}
                  </Typography>
                  <Typography variant="body2">
                    <RoomIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {notification.session.room}
                  </Typography>
                </Stack>
              )}
            </Box>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary">
          {getTimeString(notification.timestamp)}
        </Typography>
      </Box>
      
      {(notification.type === 'reminder' || notification.type === 'change') && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => {
              const speakerDetails = getSpeakerDetails(notification.session.speaker);
              onViewDetails({ ...notification.session, speakerDetails });
            }}
          >
            View Session Details
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<QrCodeIcon />}
            onClick={() => onScanQR(notification.session)}
          >
            Scan Attendance QR
          </Button>
        </Stack>
      )}
      
      {notification.type === 'poll' && notification.isActive && (
        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth 
          sx={{ mt: 1 }}
        >
          Take Poll ({new Date(notification.expiresAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })})
        </Button>
      )}
    </Card>
  );
}

function Notifications() {
  const [tab, setTab] = useState(0);
  const [qrDialog, setQrDialog] = useState({ open: false, session: null });
  const [detailsDialog, setDetailsDialog] = useState({ open: false, session: null });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const getFilteredNotifications = () => {
    switch (tab) {
      case 0: // All
        return [
          ...notifications.changes,
          ...notifications.reminders,
          ...notifications.polls
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 1: // Changes
        return notifications.changes;
      case 2: // Reminders
        return notifications.reminders;
      case 3: // Polls
        return notifications.polls;
      default:
        return [];
    }
  };

  const handleViewDetails = (session) => {
    setDetailsDialog({ open: true, session });
  };

  const handleScanQR = (session) => {
    setQrDialog({ open: true, session });
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Tabs 
        value={tab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Changes" />
        <Tab label="Reminders" />
        <Tab label="Polls" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {getFilteredNotifications().map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onViewDetails={handleViewDetails}
            onScanQR={handleScanQR}
          />
        ))}
      </Box>

      <Dialog 
        open={qrDialog.open} 
        onClose={() => setQrDialog({ open: false, session: null })}
      >
        <DialogTitle>Scan Attendance QR Code</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', p: 3 }}>
          {qrDialog.session && (
            <>
              <QRCode 
                value={`session:${qrDialog.session.id}`}
                size={200}
              />
              <Typography sx={{ mt: 2 }}>
                {qrDialog.session.title}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialog({ open: false, session: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, session: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Session Details</Typography>
            <IconButton onClick={() => setDetailsDialog({ open: false, session: null })}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {detailsDialog.session && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>{detailsDialog.session.title}</Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={detailsDialog.session.speakerDetails?.image}
                  sx={{ width: 100, height: 100, mr: 2 }}
                >
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {detailsDialog.session.speaker}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {detailsDialog.session.speakerDetails?.title}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                bgcolor: 'background.paper', 
                p: 2, 
                borderRadius: 1,
                border: 1,
                borderColor: 'divider'
              }}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="body1">
                    <ScheduleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Time: {detailsDialog.session.time}
                  </Typography>
                  <Typography variant="body1">
                    <RoomIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Room: {detailsDialog.session.room}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Notifications;
