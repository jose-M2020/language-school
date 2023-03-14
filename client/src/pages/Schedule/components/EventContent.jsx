import { Box, Popover, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CustomButton from '../../../components/CustomButton';
import { reservationStatus } from '../../../helpers';
import { useUpdateReservationMutation } from '../../../redux/api/reservationApi';
import { tokens } from '../../../theme';

const EventContent = ({eventInfo, calendarRef}) => {
  const userId = useSelector((state) => state.auth.user._id);
  const colors = tokens();
  const {
    timeText,
    event: {
      id,
      extendedProps: {
        _id,
        status,
        topic,
        teacher,
        classroom
      }
    }
  } = eventInfo;
  const canCancel = status === 'pending' || status === 'confirmed';

  const [updateReservation, { 
    isLoading,
    isError,
    isSuccess
  }] = useUpdateReservationMutation();

  useEffect(() => {
    if(isError){
      toast.error('There was an error!');
    }
    if(isSuccess){
      toast.success('The reservation has been cancelled!');
    }
  }, [isLoading])

  const handleCancelReservation = async () => {
    if(window.confirm('Are you sure you want to cancel?')){
      const calendarApi = calendarRef.current?.getApi();
      handlePopoverClose();
      
      const res = await updateReservation({
        data: {userId, reservationId: id },
        payload: {status: 'cancelled'}
      })

      if(res?.data){
        calendarApi.getEventById(id)
                   .setExtendedProp('status', 'cancelled');
      }

    }
  }

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
              backgroundColor: reservationStatus(status)?.bgColor,
              color: reservationStatus(status)?.color,
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
                  text='Cancel'
                  btnstyle='danger'
                  size='sm'
                  mt={7}
                  onClick={() => handleCancelReservation(_id)}
                  loading={isLoading}
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
              <Stack spacing={1} sx={{ minWidth: '200px', padding: '10px' }}>
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
                <Stack spacing='1px'>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Topic: { topic }</Typography>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Teacher: { teacher }</Typography>
                    <Typography sx={{ overflowWrap: 'break-word' }}>Classroom: { classroom }</Typography>
                </Stack>
              </Stack>
            </Popover>
          ))}
        </>
      ): (
        <Box bgcolor='#dae4e9'></Box>
      ))
  )
}

export default EventContent