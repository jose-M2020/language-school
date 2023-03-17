import { Box, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

export const Course = ({ data }) => {
  return (
    <Card 
      sx={{
        display: 'flex',
        borderRadius: '10px',
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: 151,
        }}
        image="https://media.istockphoto.com/id/1170111117/vector/illustration-of-children-taking-english-class.jpg?s=612x612&w=0&k=20&c=8rFss7Z4ioOIunu55IQRVUlaYQpTER1vBQmTIO7NR6g="
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" fontWeight='bold'>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.description}
          </Typography>
          <Stack direction="row" spacing={1}>
            {data.modality.map((item, i) => (
              <Chip key={i} label={item} />
            ))}
          </Stack>
        </CardContent>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 2,
          }}
        >
          <Typography>${data.price}</Typography>
          <CustomButton text='Add' />
        </Box>
      </Box>
    </Card>
  )
}
