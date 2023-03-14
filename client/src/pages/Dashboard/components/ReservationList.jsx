import { Box, Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { tokens } from '../../../theme'

const ReservationList = ({reservations}) => {
  const colors = tokens();

  return (
    <Box>
      <Typography
        variant='h4'
        fontWeight='bolder'
        mb='8px'
      >
        Next classes
      </Typography>
      <Stack spacing='12px'>
        {reservations.map((item, i) => (
          <Box
            key={i}
            display='flex'
            justifyContent='between'
            padding='12px'
            sx={{
              ...(i === 0 ? {
                backgroundColor: colors.greenAccent
              } : {
                boxShadow: '0 0 8px #d8d8d8'
              })
            }}
          >
            <Typography
              alignSelf='center'
              fontSize='1.2rem'
              fontWeight='bolder'
              whiteSpace='nowrap'
            >
              {item.hour}
            </Typography>
            <Typography
              variant='span'
              width='1px'
              backgroundColor='#cdcdcd'
              mx='12px'
            > 
            </Typography>
            <Box
              overflow='hidden'
            >
              <Typography 
                noWrap={true}
                title={item.topic}
              > 
                {item.topic}
              </Typography>
              <Typography 
                noWrap={true}
                title={item.topic}
              >
                <PersonIcon sx={{ verticalAlign: '-3px', fontSize: '20px' }} /> {item.teacher}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

    </Box>
  )
}

export default ReservationList