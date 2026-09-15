import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Passenger Pages
import { PassengerDashboard } from './pages/passenger/PassengerDashboard';
import { BookRidePage } from './pages/passenger/BookRidePage';
import { LiveTrackingPage } from './pages/passenger/LiveTrackingPage';
import { ScheduledRidesPage } from './pages/passenger/ScheduledRidesPage';
import { BookingHistoryPage } from './pages/passenger/BookingHistoryPage';
import { AIAssistantPage } from './pages/passenger/AIAssistantPage';
import { EmergencySOSPage } from './pages/passenger/EmergencySOSPage';
import { RoadsideAssistancePage } from './pages/passenger/RoadsideAssistancePage';
import { PaymentsPage } from './pages/passenger/PaymentsPage';
import { PassengerProfilePage } from './pages/passenger/PassengerProfilePage';

// Driver Pages
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { DriverRequestsPage } from './pages/driver/DriverRequestsPage';
import { DriverActiveTripPage } from './pages/driver/DriverActiveTripPage';
import { DriverEarningsPage } from './pages/driver/DriverEarningsPage';
import { DriverProfilePage } from './pages/driver/DriverProfilePage';

// Fleet Pages
import { FleetDashboard } from './pages/fleet/FleetDashboard';
import { FleetVehiclesPage } from './pages/fleet/FleetVehiclesPage';
import { FleetDriversPage } from './pages/fleet/FleetDriversPage';
import { FleetReportsPage } from './pages/fleet/FleetReportsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminDriversPage } from './pages/admin/AdminDriversPage';
import { AdminVehiclesPage } from './pages/admin/AdminVehiclesPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminEmergenciesPage } from './pages/admin/AdminEmergenciesPage';
import { AdminRoadsidePage } from './pages/admin/AdminRoadsidePage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Passenger Portal */}
            <Route element={<DashboardLayout />}>
              <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
              <Route path="/passenger/book-ride" element={<BookRidePage />} />
              <Route path="/passenger/tracking" element={<LiveTrackingPage />} />
              <Route path="/passenger/scheduled-rides" element={<ScheduledRidesPage />} />
              <Route path="/passenger/history" element={<BookingHistoryPage />} />
              <Route path="/passenger/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/passenger/emergency" element={<EmergencySOSPage />} />
              <Route path="/passenger/roadside" element={<RoadsideAssistancePage />} />
              <Route path="/passenger/payments" element={<PaymentsPage />} />
              <Route path="/passenger/profile" element={<PassengerProfilePage />} />

              {/* Driver Portal */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/requests" element={<DriverRequestsPage />} />
              <Route path="/driver/active-trip" element={<DriverActiveTripPage />} />
              <Route path="/driver/earnings" element={<DriverEarningsPage />} />
              <Route path="/driver/profile" element={<DriverProfilePage />} />

              {/* Fleet Portal */}
              <Route path="/fleet/dashboard" element={<FleetDashboard />} />
              <Route path="/fleet/vehicles" element={<FleetVehiclesPage />} />
              <Route path="/fleet/drivers" element={<FleetDriversPage />} />
              <Route path="/fleet/reports" element={<FleetReportsPage />} />

              {/* Admin Portal */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/drivers" element={<AdminDriversPage />} />
              <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
              <Route path="/admin/bookings" element={<AdminBookingsPage />} />
              <Route path="/admin/emergencies" element={<AdminEmergenciesPage />} />
              <Route path="/admin/roadside" element={<AdminRoadsidePage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
