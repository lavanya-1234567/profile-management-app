import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import ProfileDisplay from '../components/ProfileDisplay';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile-form" replace />} />
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile-form/edit" element={<ProfileForm />} />
      <Route path="/profile" element={<ProfileDisplay />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
