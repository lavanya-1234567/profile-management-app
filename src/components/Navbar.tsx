import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);

  const fullName = (() => {
    const first = profile?.firstName?.trim();
    const last = profile?.lastName?.trim();

    if (first && last) return `${first} ${last}`;
    if (first) return first;
    if (last) return last;
    return 'Guest';
  })();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Profile App - {fullName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
