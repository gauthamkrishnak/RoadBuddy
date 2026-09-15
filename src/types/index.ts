export type UserRole = 'passenger' | 'driver' | 'fleet' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  rating?: number;
  emergencyContacts?: EmergencyContact[];
  status?: 'active' | 'inactive' | 'pending';
  joinedDate?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export type VehicleType = 'Taxi' | 'Rental Car' | 'Traveller Van' | 'Tourist Bus';

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  registrationNumber: string;
  capacity: number;
  pricePerKm: number;
  baseFare: number;
  image: string;
  eta: string;
  status: 'available' | 'in_transit' | 'maintenance' | 'offline';
  driverName?: string;
  location?: string;
  rating?: number;
}

export type BookingStatus = 'pending' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  pickup: string;
  destination: string;
  vehicleType: VehicleType;
  vehicleName: string;
  fare: number;
  distance: string;
  eta: string;
  status: BookingStatus;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  driverPhoto?: string;
  vehicleNumber?: string;
  date: string;
  time: string;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Wallet' | 'Cash';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  isScheduled?: boolean;
  recurringFrequency?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface EmergencyAlert {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  type: 'Ambulance' | 'Police' | 'Fire & Rescue' | 'Other Emergency';
  location: string;
  timestamp: string;
  status: 'Notified' | 'Dispatched' | 'Resolved' | 'Cancelled';
  lat?: number;
  lng?: number;
  assignedResponder?: string;
}

export type RoadsideServiceType = 'Towing' | 'Fuel Delivery' | 'Flat Tyre' | 'Battery Support' | 'Mechanical Repair';

export interface RoadsideRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  serviceType: RoadsideServiceType;
  location: string;
  description: string;
  status: 'finding' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  providerName?: string;
  providerPhone?: string;
  eta?: string;
  timestamp: string;
  cost?: number;
}

export interface PaymentTransaction {
  id: string;
  bookingId?: string;
  description: string;
  amount: number;
  date: string;
  method: 'UPI' | 'Credit/Debit Card' | 'Wallet' | 'Cash';
  status: 'Successful' | 'Pending' | 'Failed';
  type: 'ride' | 'rental' | 'roadside' | 'refund';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButtons?: { label: string; route: string }[];
}

export interface DriverStats {
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  completedTrips: number;
  rating: number;
  isOnline: boolean;
}
