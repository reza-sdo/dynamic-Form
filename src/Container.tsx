import { Box, Paper, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type containerProps = {
  children: ReactNode;
};

function Container({ children }: containerProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ width: 400, padding: 2 }}>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h6">Form Test</Typography>
          {children}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Container;
