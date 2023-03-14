import { Box, Typography } from '@mui/material'
import React from 'react'
import { hexToRgba } from '../../../helpers'
import { tokens } from '../../../theme'

const StatCard = ({ title, value, value2, icon, description }) => {
  const colors = tokens()

  return (
    <Box
      display='flex'
      justifyContent="space-between"
      alignItems='center'
      p="1.25rem 1rem"
      backgroundColor={colors.primary}
      borderRadius="0.55rem"
    >
      <Box
        display="flex"
        flexDirection='column'
        gap='8px'
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" sx={{ color: colors.secondary }}>
            {title}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: colors.secondary }}
          >
            {value}
          </Typography>
          {value2 && (
            <Typography
              variant="span"
              fontSize='.8rem'
              ml={1}
              sx={{ color: hexToRgba(colors.secondary, .8) }}
            >
              / {value2}
            </Typography>
          )}
        </Box>
        <Box 
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
        >
          <Typography
            variant="h5"
            sx={{ color: colors.secondary }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ color: colors.secondary }}
      >
          {icon}
      </Box>
    </Box>
  )
}

export default StatCard