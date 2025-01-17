export const notifications = {
  changes: [
    {
      id: 'ch1',
      type: 'change',
      title: 'Room Change: "The Future of AI in Business"',
      message: 'Session moved from Main Hall to Innovation Lab',
      timestamp: '2024-02-15T08:30:00',
      session: {
        title: 'The Future of AI in Business',
        speaker: 'Dr. Sarah Chen',
        oldRoom: 'Main Hall',
        newRoom: 'Innovation Lab',
        time: '09:00-10:30'
      }
    },
    {
      id: 'ch2',
      type: 'change',
      title: 'Time Change: "Enterprise Blockchain Adoption"',
      message: 'Session rescheduled to 11:00-12:30',
      timestamp: '2024-02-15T07:45:00',
      session: {
        title: 'Enterprise Blockchain Adoption',
        speaker: 'Lisa Zhang',
        room: 'Innovation Lab',
        oldTime: '09:00-10:30',
        newTime: '11:00-12:30'
      }
    }
  ],
  reminders: [
    {
      id: 'rm1',
      type: 'reminder',
      title: 'Upcoming Session: The Future of AI in Business',
      message: 'Starting in 15 minutes',
      timestamp: '2024-02-15T08:45:00',
      session: {
        id: 1,
        title: 'The Future of AI in Business',
        speaker: 'Dr. Sarah Chen',
        time: '09:00-10:30',
        room: 'Innovation Lab',
        isFavorite: true
      }
    },
    {
      id: 'rm2',
      type: 'reminder',
      title: 'Upcoming Session: Enterprise Security',
      message: 'Starting in 15 minutes',
      timestamp: '2024-02-15T15:45:00',
      session: {
        id: 4,
        title: 'Enterprise Security in 2024',
        speaker: 'James Mitchell',
        time: '16:00-17:30',
        room: 'Security Center'
      }
    }
  ],
  polls: [
    {
      id: 'pl1',
      type: 'poll',
      title: 'Live Poll: Rate the Session',
      message: 'The Future of AI in Business',
      timestamp: '2024-02-15T10:15:00',
      expiresAt: '2024-02-15T10:45:00',
      isActive: true,
      session: {
        title: 'The Future of AI in Business',
        speaker: 'Dr. Sarah Chen'
      }
    },
    {
      id: 'pl2',
      type: 'poll',
      title: 'Live Poll: Session Feedback',
      message: 'Enterprise Blockchain Adoption',
      timestamp: '2024-02-15T12:15:00',
      expiresAt: '2024-02-15T12:45:00',
      isActive: true,
      session: {
        title: 'Enterprise Blockchain Adoption',
        speaker: 'Lisa Zhang'
      }
    }
  ]
};
