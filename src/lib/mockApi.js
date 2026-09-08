import { initialUsers, initialDashboardStats } from './mockData';

const STORAGE_KEY = 'admin_dashboard_users_v1';

let errorSimulationEnabled = false;

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStoredUsers() {
  if (typeof window === 'undefined') return [...initialUsers];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return [...initialUsers];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [...initialUsers];
  }
}


function saveUsers(users) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
}

export const mockApi = {
  toggleErrorSimulation(enable) {
    errorSimulationEnabled = typeof enable === 'boolean' ? enable : !errorSimulationEnabled;
    return errorSimulationEnabled;
  },

  isErrorSimulationActive() {
    return errorSimulationEnabled;
  },

  async getDashboardStats() {
    await delay(350);
    if (errorSimulationEnabled) {
      throw new Error('Failed to load dashboard metrics. Network server error (500).');
    }
    return initialDashboardStats;
  },


  async getUsers(params = {}) {
    await delay(450);

    if (errorSimulationEnabled) {
      throw new Error('Simulated API Error: Unable to retrieve users list.');
    }

    const {
      search = '',
      role = 'All',
      status = 'All',
      page = 1,
      limit = 5,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    let users = getStoredUsers();

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.location && u.location.toLowerCase().includes(query))
      );
    }


    if (role && role !== 'All') {
      users = users.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    }

    if (status && status !== 'All') {
      users = users.filter((u) => u.status.toLowerCase() === status.toLowerCase());
    }


    users.sort((a, b) => {
      let valA = a[sortBy] ?? '';
      let valB = b[sortBy] ?? '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const totalCount = users.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * limit;
    const paginatedUsers = users.slice(startIndex, startIndex + limit);

    return {
      data: paginatedUsers,
      meta: {
        totalCount,
        totalPages,
        currentPage,
        limit,
      },
    };
  },


  async getUserById(id) {
    await delay(300);
    if (errorSimulationEnabled) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const users = getStoredUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return user;
  },


  async createUser(userData) {
    await delay(500);
    if (errorSimulationEnabled) {
      throw new Error('Failed to create user record.');
    }

    const users = getStoredUsers();
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'Member',
      status: userData.status || 'Active',
      avatar: userData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      likes: Number(userData.likes) || 0,
      projects: Number(userData.projects) || 0,
      createdAt: new Date().toISOString().split('T')[0],
      location: userData.location || 'United States',
      bio: userData.bio || '',
    };

    const updatedUsers = [newUser, ...users];
    saveUsers(updatedUsers);
    return newUser;
  },


  async updateUser(id, userData) {
    await delay(500);
    if (errorSimulationEnabled) {
      throw new Error('Failed to save user updates.');
    }

    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`Cannot update: User with ID ${id} not found.`);
    }

    const updatedUser = {
      ...users[index],
      ...userData,
    };

    users[index] = updatedUser;
    saveUsers(users);
    return updatedUser;
  },


  async deleteUser(id) {
    await delay(400);
    if (errorSimulationEnabled) {
      throw new Error(`Failed to delete user with ID ${id}.`);
    }

    const users = getStoredUsers();
    const filtered = users.filter((u) => u.id !== id);
    saveUsers(filtered);
    return { success: true, deletedId: id };
  },

  async resetData() {
    await delay(300);
    saveUsers(initialUsers);
    return initialUsers;
  }
};
