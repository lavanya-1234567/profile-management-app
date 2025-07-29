import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import ProfileDisplay from '../components/ProfileDisplay';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to profile form */}
      <Route path="/" element={<Navigate to="/profile-form" replace />} />

      {/* Profile form routes */}
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile-form/edit" element={<ProfileForm />} />

      {/* Display profile */}
      <Route path="/profile" element={<ProfileDisplay />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

