// skeletons/Principal.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const PrincipalSkeleton = () => {
  return (
    <main>
      <Skeleton
        data-testid="main-skeleton"
        height={'3rem'}
        variant="text"
        width="50vw"
        sx={{
          backgroundColor: "#f2f2f2",
      }}
      />
    </main>
  );
};

export default PrincipalSkeleton;
