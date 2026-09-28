import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, EmergencyAlert, RoadsideRequest, Vehicle, DriverStats, PaymentTransaction, User } from '../types';
import { MOCK_BOOKINGS, MOCK_EMERGENCIES, MOCK_ROADSIDE_REQUESTS, MOCK_VEHICLES, MOCK_TRANSACTIONS, MOCK_DRIVERS_LIST, MOCK_USERS_LIST } from '../mockData';
import {
  bookingsApi,
  emergenciesApi,
  roadsideApi,
  vehiclesApi,
  driversApi,
  usersApi,
  paymentsApi,
} from '../services/api';

interface AppContextType {
  bookings: Booking[];
  emergencies: EmergencyAlert[];
  roadsideRequests: RoadsideRequest[];
  vehicles: Vehicle[];
  transactions: PaymentTransaction[];
  drivers: typeof MOCK_DRIVERS_LIST;
  usersList: User[];
  driverStats: DriverStats;
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'date' | 'time' | 'paymentStatus'>) => Booking;
  cancelBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  triggerEmergency: (type: EmergencyAlert['type'], location: string) => EmergencyAlert;
  cancelEmergency: (id: string) => void;
  createRoadsideRequest: (serviceType: RoadsideRequest['serviceType'], location: string, description: string) => RoadsideRequest;
  cancelRoadsideRequest: (id: string) => void;
  toggleDriverOnline: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  addDriver: (driver: { name: string; phone: string; vehicle: string; status: string }) => void;
  deleteDriver: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('roadbuddy_bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [emergencies, setEmergencies] = useState<EmergencyAlert[]>(() => {
    const saved = localStorage.getItem('roadbuddy_emergencies');
    return saved ? JSON.parse(saved) : MOCK_EMERGENCIES;
  });

  const [roadsideRequests, setRoadsideRequests] = useState<RoadsideRequest[]>(() => {
    const saved = localStorage.getItem('roadbuddy_roadside');
    return saved ? JSON.parse(saved) : MOCK_ROADSIDE_REQUESTS;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('roadbuddy_vehicles');
    return saved ? JSON.parse(saved) : MOCK_VEHICLES;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('roadbuddy_txns');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const [drivers, setDrivers] = useState<typeof MOCK_DRIVERS_LIST>(() => {
    const saved = localStorage.getItem('roadbuddy_drivers');
    return saved ? JSON.parse(saved) : MOCK_DRIVERS_LIST;
  });

  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem('roadbuddy_users_list');
    return saved ? JSON.parse(saved) : MOCK_USERS_LIST;
  });

  const [driverStats, setDriverStats] = useState<DriverStats>({
    todayEarnings: 3450,
    weeklyEarnings: 18400,
    monthlyEarnings: 72000,
    completedTrips: 18,
    rating: 4.92,
    isOnline: true,
  });

  // Polling mechanism to sync state periodically from backend
  const refreshBackendData = async () => {
    try {
      const [
        fetchedBookings,
        fetchedEmergencies,
        fetchedRoadside,
        fetchedVehicles,
        fetchedDrivers,
        fetchedUsers,
        fetchedTxns,
      ] = await Promise.allSettled([
        bookingsApi.getAll(),
        emergenciesApi.getAll(),
        roadsideApi.getAll(),
        vehiclesApi.getAll(),
        driversApi.getAll(),
        usersApi.getAll(),
        paymentsApi.getTransactions(),
      ]);

      if (fetchedBookings.status === 'fulfilled' && fetchedBookings.value?.length) {
        setBookings(fetchedBookings.value);
      }
      if (fetchedEmergencies.status === 'fulfilled' && fetchedEmergencies.value?.length) {
        setEmergencies(fetchedEmergencies.value);
      }
      if (fetchedRoadside.status === 'fulfilled' && fetchedRoadside.value?.length) {
        setRoadsideRequests(fetchedRoadside.value);
      }
      if (fetchedVehicles.status === 'fulfilled' && fetchedVehicles.value?.length) {
        setVehicles(fetchedVehicles.value);
      }
      if (fetchedDrivers.status === 'fulfilled' && fetchedDrivers.value?.length) {
        setDrivers(fetchedDrivers.value);
      }
      if (fetchedUsers.status === 'fulfilled' && fetchedUsers.value?.length) {
        setUsersList(fetchedUsers.value);
      }
      if (fetchedTxns.status === 'fulfilled' && fetchedTxns.value?.length) {
        setTransactions(fetchedTxns.value);
      }
    } catch (err) {
      console.warn('Backend polling sync skipped:', err);
    }
  };

  useEffect(() => {
    refreshBackendData();
    const interval = setInterval(refreshBackendData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('roadbuddy_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('roadbuddy_emergencies', JSON.stringify(emergencies));
  }, [emergencies]);

  useEffect(() => {
    localStorage.setItem('roadbuddy_roadside', JSON.stringify(roadsideRequests));
  }, [roadsideRequests]);

  useEffect(() => {
    localStorage.setItem('roadbuddy_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('roadbuddy_txns', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('roadbuddy_drivers', JSON.stringify(drivers));
  }, [drivers]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'date' | 'time' | 'paymentStatus'>): Booking => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const timeStr = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'accepted',
      driverId: 'drv_1',
      driverName: 'Rahul Verma',
      driverPhone: '+91 98470 11223',
      driverRating: 4.92,
      driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      vehicleNumber: 'KL 01 BT 8890',
      date: dateStr,
      time: timeStr,
      paymentStatus: 'paid',
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Async call to FastAPI backend
    bookingsApi.create(bookingData).then(() => refreshBackendData()).catch(() => {});

    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
    bookingsApi.cancel(id).then(() => refreshBackendData()).catch(() => {});
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    bookingsApi.updateStatus(id, status).then(() => refreshBackendData()).catch(() => {});
  };

  const triggerEmergency = (type: EmergencyAlert['type'], location: string): EmergencyAlert => {
    const today = new Date();
    const timestampStr = today.toLocaleDateString() + ' ' + today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAlert: EmergencyAlert = {
      id: `EMG-${Math.floor(100 + Math.random() * 900)}`,
      passengerId: 'usr_1',
      passengerName: 'Gautham S.',
      passengerPhone: '+91 98765 43210',
      type,
      location,
      timestamp: timestampStr,
      status: 'Notified',
      assignedResponder: `Kerala Emergency Response Unit #${Math.floor(10 + Math.random() * 90)}`,
    };

    setEmergencies((prev) => [newAlert, ...prev]);
    emergenciesApi.trigger(type, location).then(() => refreshBackendData()).catch(() => {});
    return newAlert;
  };

  const cancelEmergency = (id: string) => {
    setEmergencies((prev) => prev.map((e) => (e.id === id ? { ...e, status: 'Cancelled' } : e)));
    emergenciesApi.cancel(id).then(() => refreshBackendData()).catch(() => {});
  };

  const createRoadsideRequest = (
    serviceType: RoadsideRequest['serviceType'],
    location: string,
    description: string
  ): RoadsideRequest => {
    const today = new Date();
    const timestampStr = today.toLocaleDateString() + ' ' + today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReq: RoadsideRequest = {
      id: `RS-${Math.floor(100 + Math.random() * 900)}`,
      passengerId: 'usr_1',
      passengerName: 'Gautham S.',
      serviceType,
      location,
      description,
      status: 'assigned',
      providerName: 'Kochi Express Roadside Mechanics',
      providerPhone: '+91 98950 44556',
      eta: '12 mins',
      timestamp: timestampStr,
      cost: 500,
    };

    setRoadsideRequests((prev) => [newReq, ...prev]);
    roadsideApi.create(serviceType, location, description).then(() => refreshBackendData()).catch(() => {});
    return newReq;
  };

  const cancelRoadsideRequest = (id: string) => {
    setRoadsideRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r)));
    roadsideApi.cancel(id).then(() => refreshBackendData()).catch(() => {});
  };

  const toggleDriverOnline = () => {
    setDriverStats((prev) => ({ ...prev, isOnline: !prev.isOnline }));
    driversApi.toggleOnline('drv_1').then(() => refreshBackendData()).catch(() => {});
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVeh: Vehicle = {
      ...vehicleData,
      id: `v_${Date.now()}`,
    };
    setVehicles((prev) => [...prev, newVeh]);
    vehiclesApi.create(vehicleData).then(() => refreshBackendData()).catch(() => {});
  };

  const updateVehicle = (id: string, updated: Partial<Vehicle>) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
    vehiclesApi.update(id, updated).then(() => refreshBackendData()).catch(() => {});
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    vehiclesApi.delete(id).then(() => refreshBackendData()).catch(() => {});
  };

  const addDriver = (driverData: { name: string; phone: string; vehicle: string; status: string }) => {
    const newDrv = {
      id: `drv_${Date.now()}`,
      name: driverData.name,
      phone: driverData.phone,
      vehicle: driverData.vehicle,
      status: driverData.status,
      rating: 5.0,
      trips: 0,
    };
    setDrivers((prev) => [...prev, newDrv]);
    driversApi.create(driverData).then(() => refreshBackendData()).catch(() => {});
  };

  const deleteDriver = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    driversApi.delete(id).then(() => refreshBackendData()).catch(() => {});
  };

  return (
    <AppContext.Provider
      value={{
        bookings,
        emergencies,
        roadsideRequests,
        vehicles,
        transactions,
        drivers,
        usersList,
        driverStats,
        addBooking,
        cancelBooking,
        updateBookingStatus,
        triggerEmergency,
        cancelEmergency,
        createRoadsideRequest,
        cancelRoadsideRequest,
        toggleDriverOnline,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addDriver,
        deleteDriver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
