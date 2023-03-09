import { Box, Popover, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton';
import { tokens } from '../../../theme';

const EventContent = ({eventInfo}) => {
  const colors = tokens();
  const {
    timeText,
    event: {extendedProps: {
      _id,
      status,
      topic,
      teacher,
      classroom
    }}
  } = eventInfo;
  const canCancel = status === 'pending' || status === 'confirmed';
  
  console.log('EventContent render')
  
  // Constants Popover  

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  
  return (
    (status ? (
        <>
          <Stack
            sx={{
              height: '100%',
              position: 'relative',
              padding: '7px',
            }}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Typography variant='span' fontWeight='bold'>{timeText}</Typography>
            <Typography noWrap={true}>Topic: {topic}</Typography>
            <Typography noWrap={true}>Teacher: {teacher}</Typography>
            {/* {eventInfo.event.id === 'wait' && } */}
            {canCancel && (
                <CustomButton
                  id={_id}
                  text='Cancel'
                  btnstyle='danger'
                  size='sm'
                  mt={7}
                //   onClick={() => handleChangeReservation(_id)}
                />
            )}

          </Stack>
          {(status !== 'processing' && (
            <Popover
              id="mouse-over-popover"
              sx={{ pointerEvents: 'none' }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Box sx={{ minWidth: '200px', padding: '10px' }}>
                <Box display='flex' alignItems='center'>
                    <Box
                    sx={{
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary,
                        mr: '8px'
                    }}
                    ></Box>
                    <Typography 
                    variant='span'
                    >{ status }</Typography>
                </Box>
                <Typography fontSize='1.5rem' fontWeight='bold'>{ timeText }</Typography>
                <Stack spacing='3px'>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Topic: { topic }</Typography>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Teacher: { teacher }</Typography>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Classroom: { classroom }</Typography>
                </Stack>
              </Box>
            </Popover>
          ))}
        </>
      ): (
        <Box bgcolor='#dae4e9'></Box>
      ))
  )
}

export default EventContent