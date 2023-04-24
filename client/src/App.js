import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import InsuranceProviders from './pages/admin/InsuranceProviders';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import Insurance from './pages/Insurance';
import ApplyInsuranceProvider from './pages/ApplyInsuranceProvider';
import DoctorState from './context/doctor/DoctorState';
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <DoctorState>
        <BrowserRouter>
          {loading ? (
            <Spinner />
          ) : (
            <Routes>
              <Route
                path='/apply-doctor'
                element={
                  <ProtectedRoute>
                    <ApplyDoctor />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/apply-insuranceProvider'
                element={
                  <ProtectedRoute>
                    <ApplyInsuranceProvider />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/users'
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/doctors'
                element={
                  <ProtectedRoute>
                    <Doctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/insuranceProviders'
                element={
                  <ProtectedRoute>
                    <InsuranceProviders />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/doctor/profile/:id'
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/insurance'
                element={
                  <ProtectedRoute>
                    <Insurance />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/doctor/book-appointment/:doctorId'
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/notification'
                element={
                  <ProtectedRoute>
                    <NotificationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/login'
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path='/register'
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path='/appointments'
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/doctor-appointments'
                element={
                  <ProtectedRoute>
                    <DoctorAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/'
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </BrowserRouter>
      </DoctorState>
    </>
  );
}

export default App;
