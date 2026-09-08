export const initialUsers = [
  {
    id: "usr-101",
    name: "Alice Cruz",
    email: "alice.cruz@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    likes: 1240,
    projects: 14,
    createdAt: "2025-01-15",
    location: "Germany",
    bio: "Senior Admin overseeing global digital operations and user analytics."
  },
  {
    id: "usr-102",
    name: "Olivia Rhye",
    email: "olivia.rhye@example.com",
    role: "Manager",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    likes: 835,
    projects: 8,
    createdAt: "2025-02-01",
    location: "United Kingdom",
    bio: "Product Manager focusing on user retention and analytics."
  },
  {
    id: "usr-103",
    name: "Phoenix Baker",
    email: "phoenix.baker@example.com",
    role: "Editor",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    likes: 620,
    projects: 6,
    createdAt: "2025-02-10",
    location: "Canada",
    bio: "Content strategy specialist and lead UX reviewer."
  },
  {
    id: "usr-104",
    name: "Lana Steiner",
    email: "lana.steiner@example.com",
    role: "Member",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    likes: 410,
    projects: 4,
    createdAt: "2025-02-22",
    location: "United States",
    bio: "Frontend engineer contributing to core dashboard component system."
  },
  {
    id: "usr-105",
    name: "Demi Wilkinson",
    email: "demi.wilkinson@example.com",
    role: "Member",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    likes: 950,
    projects: 11,
    createdAt: "2025-03-04",
    location: "Australia",
    bio: "Digital strategist analyzing conversion funnels."
  },
  {
    id: "usr-106",
    name: "Candice Wu",
    email: "candice.wu@example.com",
    role: "Manager",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    likes: 280,
    projects: 3,
    createdAt: "2025-03-12",
    location: "Singapore",
    bio: "Operations manager on sabbatical leave."
  },
  {
    id: "usr-107",
    name: "Natali Craig",
    email: "natali.craig@example.com",
    role: "Editor",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    likes: 710,
    projects: 9,
    createdAt: "2025-03-18",
    location: "France",
    bio: "Brand designer overseeing UI kits and visual identity."
  },
  {
    id: "usr-108",
    name: "Drew Cano",
    email: "drew.cano@example.com",
    role: "Member",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    likes: 540,
    projects: 5,
    createdAt: "2025-04-01",
    location: "Spain",
    bio: "Full stack developer maintaining API integrations."
  },
  {
    id: "usr-109",
    name: "Orlando Diggs",
    email: "orlando.diggs@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    likes: 1890,
    projects: 22,
    createdAt: "2025-04-10",
    location: "Netherlands",
    bio: "Infrastructure architect managing cloud services."
  },
  {
    id: "usr-110",
    name: "Andi Lane",
    email: "andi.lane@example.com",
    role: "Member",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    likes: 190,
    projects: 2,
    createdAt: "2025-04-20",
    location: "Sweden",
    bio: "Junior QA engineer testing user flows."
  }
];

export const initialDashboardStats = {
  metrics: [
    {
      title: "Average Likes",
      value: "635",
      change: "+21.01%",
      isPositive: true,
      subtext: "vs. previous 30 days"
    },
    {
      title: "Comments received",
      value: "123",
      change: "+4.39%",
      isPositive: true,
      subtext: "vs. previous 30 days"
    },
    {
      title: "Engagement rate",
      value: "23%",
      change: "-7.9%",
      isPositive: false,
      subtext: "vs. previous 30 days"
    },
    {
      title: "Active Users",
      value: "35.4k",
      change: "+12.5%",
      isPositive: true,
      subtext: "vs. previous 30 days"
    }
  ],
  followersChartData: [
    { date: "25.02", followers: 120, income: 420, outcome: 180 },
    { date: "26.02", followers: 240, income: 510, outcome: 210 },
    { date: "27.02", followers: 310, income: 480, outcome: 290 },
    { date: "28.02", followers: 450, income: 620, outcome: 310 },
    { date: "29.02", followers: 580, income: 710, outcome: 260 },
    { date: "01.03", followers: 690, income: 840, outcome: 340 }
  ],
  activityByDay: [
    { day: "Mon", count: 420 },
    { day: "Tue", count: 780 },
    { day: "Wed", count: 590 },
    { day: "Thu", count: 890 },
    { day: "Fri", count: 640 },
    { day: "Sat", count: 480 },
    { day: "Sun", count: 350 }
  ],
  actionsBreakdown: [
    { name: "Profile visits", value: 250 },
    { name: "Website clicks", value: 115 },
    { name: "Calls", value: 67 },
    { name: "Get direction", value: 164 },
    { name: "Emails", value: 170 }
  ]
};
