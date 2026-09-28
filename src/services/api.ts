const API_BASE_URL = '/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('roadbuddy_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({ detail: 'Network response error' }));
    throw new Error(errData.detail || `API request failed with status ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (credentials: { email: string; password?: string; role?: string }) =>
    apiRequest<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: credentials.email, password: credentials.password || 'password123' }),
    }),
  register: (userData: any) =>
    apiRequest<{ access_token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  getMe: () => apiRequest<any>('/auth/me'),
  updateProfile: (data: any) =>
    apiRequest<any>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Bookings API
export const bookingsApi = {
  getAll: () => apiRequest<any[]>('/bookings'),
  create: (bookingData: any) =>
    apiRequest<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  updateStatus: (id: string, status: string) =>
    apiRequest<any>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  cancel: (id: string) =>
    apiRequest<any>(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),
};

// Emergencies API
export const emergenciesApi = {
  getAll: () => apiRequest<any[]>('/emergencies'),
  trigger: (type: string, location: string, passengerId = 'usr_1', passengerName = 'Gautham S.', passengerPhone = '+91 98765 43210') =>
    apiRequest<any>('/emergencies', {
      method: 'POST',
      body: JSON.stringify({ passengerId, passengerName, passengerPhone, type, location }),
    }),
  cancel: (id: string) =>
    apiRequest<any>(`/emergencies/${id}/cancel`, {
      method: 'PUT',
    }),
};

// Roadside Assistance API
export const roadsideApi = {
  getAll: () => apiRequest<any[]>('/roadside'),
  create: (serviceType: string, location: string, description: string, passengerId = 'usr_1', passengerName = 'Gautham S.') =>
    apiRequest<any>('/roadside', {
      method: 'POST',
      body: JSON.stringify({ passengerId, passengerName, serviceType, location, description }),
    }),
  cancel: (id: string) =>
    apiRequest<any>(`/roadside/${id}/cancel`, {
      method: 'PUT',
    }),
};

// Vehicles API
export const vehiclesApi = {
  getAll: () => apiRequest<any[]>('/vehicles'),
  create: (vehicleData: any) =>
    apiRequest<any>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    }),
  update: (id: string, vehicleData: any) =>
    apiRequest<any>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    }),
  delete: (id: string) =>
    apiRequest<any>(`/vehicles/${id}`, {
      method: 'DELETE',
    }),
};

// Drivers API
export const driversApi = {
  getAll: () => apiRequest<any[]>('/drivers'),
  create: (driverData: any) =>
    apiRequest<any>('/drivers', {
      method: 'POST',
      body: JSON.stringify(driverData),
    }),
  update: (id: string, driverData: any) =>
    apiRequest<any>(`/drivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(driverData),
    }),
  toggleOnline: (id: string) =>
    apiRequest<any>(`/drivers/${id}/toggle-online`, {
      method: 'PUT',
    }),
  delete: (id: string) =>
    apiRequest<any>(`/drivers/${id}`, {
      method: 'DELETE',
    }),
};

// Users API
export const usersApi = {
  getAll: () => apiRequest<any[]>('/users'),
  update: (id: string, userData: any) =>
    apiRequest<any>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  delete: (id: string) =>
    apiRequest<any>(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Payments API
export const paymentsApi = {
  getTransactions: () => apiRequest<any[]>('/payments/transactions'),
};

// AI Assistant API
export const aiApi = {
  chat: (message: string) =>
    apiRequest<{ text: string; actionButtons?: { label: string; route: string }[] }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};
