import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, EmergencyAlert, RoadsideRequest, Vehicle, DriverStats, PaymentTransaction, User } from '../types';
import { MOCK_BOOKINGS, MOCK_EMERGENCIES, MOCK_ROADSIDE_REQUESTS, MOCK_VEHICLES, MOCK_TRANSACTIONS, MOCK_DRIVERS_LIST, MOCK_USERS_LIST } from '../mockData';

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
      paymentStatus: 'paid'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Add transaction
    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingId: newBooking.id,
      description: `Ride: ${newBooking.pickup} to ${newBooking.destination}`,
      amount: newBooking.fare,
      date: dateStr,
      method: newBooking.paymentMethod,
      status: 'Successful',
      type: 'ride'
    };
    setTransactions(prev => [newTxn, ...prev]);

    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
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
      assignedResponder: `Kerala Emergency Response Unit #${Math.floor(10 + Math.random() * 90)}`
    };

    setEmergencies(prev => [newAlert, ...prev]);
    return newAlert;
  };

  const cancelEmergency = (id: string) => {
    setEmergencies(prev => prev.map(e => e.id === id ? { ...e, status: 'Cancelled' } : e));
  };

  const createRoadsideRequest = (serviceType: RoadsideRequest['serviceType'], location: string, description: string): RoadsideRequest => {
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
      cost: 500
    };

    setRoadsideRequests(prev => [newReq, ...prev]);

    // Add transaction
    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingId: newReq.id,
      description: `Roadside Assistance: ${serviceType}`,
      amount: 500,
      date: today.toISOString().split('T')[0],
      method: 'UPI',
      status: 'Successful',
      type: 'roadside'
    };
    setTransactions(prev => [newTxn, ...prev]);

    return newReq;
  };

  const cancelRoadsideRequest = (id: string) => {
    setRoadsideRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
  };

  const toggleDriverOnline = () => {
    setDriverStats(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVeh: Vehicle = {
      ...vehicleData,
      id: `v_${Date.now()}`
    };
    setVehicles(prev => [...prev, newVeh]);
  };

  const updateVehicle = (id: string, updated: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const addDriver = (driverData: { name: string; phone: string; vehicle: string; status: string }) => {
    const newDrv = {
      id: `drv_${Date.now()}`,
      name: driverData.name,
      phone: driverData.phone,
      vehicle: driverData.vehicle,
      status: driverData.status,
      rating: 5.0,
      trips: 0
    };
    setDrivers(prev => [...prev, newDrv]);
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
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
        deleteDriver
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
