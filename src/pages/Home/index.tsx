// pages/Home.tsx
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { Stack } from '@mui/material';
import PrincipalSkeleton from '../../skeletons/Principal';
import Search from '../../components/Search/Search';

const Home = () => {
  const { inProgress } = useMsal();

  if (inProgress !== InteractionStatus.None) {
    return <PrincipalSkeleton />;
  }

  return (
    <Stack sx={{ backgroundColor: "#f2f2f2", minHeight: "100vh", display: "flex" }}>
      <Search placeholder={'Nunca dejes de buscar'} onSearch={(textFilter: string) => {
        // Implementa tu lógica de búsqueda aquí
      }} />
    </Stack>
  );
};

export default Home;
