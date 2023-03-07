import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list";
import { Avatar, Box, Chip, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import FilePresentIcon from '@mui/icons-material/FilePresent';
import PersonIcon from '@mui/icons-material/Person';
import DomainIcon from '@mui/icons-material/Domain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/Dashboard'
import CustomButton from '../../components/CustomButton'
import CustomModal from '../../components/CustomModal'
import { tokens } from '../../theme';
import { hoursDiff } from '../../helpers';
import { useCreateReservationMutation, useGetReservationsQuery, useUpdateReservationMutation } from '../../redux/api/reservationApi';
import { useSelector } from 'react-redux';

// TODO: 
  // 1.- Disabled the selection of ceills to book a class
  // 2.- Get all the user reservations and show them in the calendar
  // 3.- Send a second request to get the available reservations if the user hasn't superated the allowed hours of the current week
  // 4.- Show a message to the user that it'is checking the available reservations
  // 5.- Allow the selection of reservation

  // TODO:Add status field to the schema model in mongoose, to check if the class is available or reservation

const colors = tokens()
// const reservations = [
//   {
//     id: "12315",
//     status: 'cancelled',
//     topic: 'Verbs in present simple',
//     teacher: 'Jhonne',
//     date: "2023-03-07T09:00:00-06:00",
//     color: reservationStatus('cancelled').color,
//     textColor: colors.primary
//   },
//   {
//     id: "12315",
//     status: 'attended',
//     topic: 'Verbs in past simple',
//     teacher: 'Jhonne',
//     date: "2023-03-07T12:00:00-06:00",
//     color: reservationStatus('attended').color
//   },
//   {
//     id: "5123",
//     status: 'confirmed',
//     topic: 'Verbs in present perfect',
//     teacher: 'Jhonne',
//     date: "2023-03-07T14:00:00-06:00",
//     color: reservationStatus('confirmed').color
//   },
// ];

const allowedDates = [
  "2023-03-04T07:00:00-06:00",
  "2023-03-04T08:00:00-06:00",
  "2023-03-04T09:00:00-06:00",
  "2023-03-04T10:00:00-06:00",
  "2023-03-04T11:00:00-06:00",
]

const Schedule = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const { data: reservations = [], isLoading, isError, error } = useGetReservationsQuery(userId);
  const [createReservation, { isLoading: loadingPost, isError: postError  }] = useCreateReservationMutation();
  const [updateReservation, { isLoading: loadingPatch, isError: patchError  }] = useUpdateReservationMutation();
  
  const [canBook, setCanBook] = useState(false);
  
  const selectedReservations = [];
  
  const limitHoursPerWeek = 8
  // const [modal, setModal] = useState(false)
    
  useEffect(() => {
    setTimeout(() => {
      setCanBook(true)
    }, 1000);
  }, [])
  console.log(reservations)
  // FullCalendar Functions

  const renderEventContent = (eventInfo) => {
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
    
    return (
      (status ? (
        <Stack 
          sx={{
            position: 'relative',
            padding: '7px',
            '&:hover .dialog': {
                display: 'block',
              }
          }}>
          <Typography variant='span' fontWeight='bold'>{timeText}</Typography>
          <Typography noWrap={true}>Topic: {topic}</Typography>
          <Typography noWrap={true}>Teacher: {teacher}</Typography>
          {/* {eventInfo.event.id === 'wait' && } */}
          {
            canCancel && (
              <CustomButton
                id={_id}
                text='Cancel'
                btnstyle='danger'
                size='sm'
                mt={7}
                onClick={() => handleChangeReservation(_id)}
              />
            )
          }

          {(status !== 'processing' && (
            <Stack 
              className='dialog'
              spacing='6px' 
              sx={{ 
                display: 'none',
                padding: '10px',
                background: '#ecf1f4',
                boxShadow: '0 0 6px #817d7d',
                borderRadius: '6px',
                color: colors.primary,
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '200px',
                zIndex: 1000000
              }}
            >
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
            </Stack>
          ))}
        </Stack>
      ): (
        <Box bgcolor='#dae4e9'></Box>
      ))
    )
  }

  const handleDateClick = (selected) =>{
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    const filteredItems = reservations.filter(item => (
      item.status !== 'cancelled'
    ))

    if((filteredItems?.length + selectedReservations?.length) >= limitHoursPerWeek){
      return toast.info("You've exceeded the limit of hours per week!");
    }
    if(
      reservations?.some(item => item.date === selected.startStr) ||
      selectedReservations?.some(item => item.date === selected.startStr)
    ){
      return;
    }

    selectedReservations.push(selected);
    
    calendarApi.addEvent({
      start: selected.startStr,
      status: 'processing',
      color: '#dae4e9',
      textColor: colors.primary,
    });
  }

  const handleEventClick = (selectedEvent) => {
    const {
      startStr,
      extendedProps: { status },
    } = selectedEvent.event;
    
    if(status === 'processing'){
      const index = selectedReservations.findIndex(item => (
        item.startStr === startStr
      ));

      const removedItem = index > -1 && selectedReservations.splice(index, 1);
      if(removedItem?.length) selectedEvent.event.remove()   
    }
  }

  // Api Calls

  const handleAddReservations = async () => {
    if(!selectedReservations.length){
      return toast.error('Select at least one reservation');
    }

    const payload = selectedReservations.map(item => {
      // item.event.remove();
      // const calendarApi = item.view.calendar;
      return {
        date: item.startStr,
        studentId: userId,
        modality: 'In-person'
      }
    })

    setCanBook(false);

    await createReservation({
      userId,
      payload: selectedReservations
    })
    
    toast.success('Reservation added successfully!');
    setCanBook(true);
  }
  
  const handleChangeReservation = (id) => {
    updateReservation({
      data: {userId, reservationId: id},
      payload: {status: 'cancelled'}
    })
  }

  return (
    <DashboardLayout>
        <CustomButton text='Book classes' onClick={handleAddReservations}></CustomButton>
        <ToastContainer />
        <Box>
          {!isLoading ? (
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek,listMonth",
              }}
              hiddenDays={[0]}
              unselectAuto={false}
              slotDuration='01:00'
              slotMinTime='07:00:00'
              slotMaxTime='21:00:00'
              firstDay={(new Date()).getDay()}
              allDaySlot={false}
              dayCellClassNames='row'
              selectAllow={(selectInfo) => {
                if(!canBook) return false;
                if(hoursDiff(selectInfo.start, selectInfo.end) > 1 ){
                  return false;
                }
                return allowedDates.includes(selectInfo.startStr) ? false : true
              }}
              initialView="timeGridWeek"
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={1}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
              longPressDelay={1}
            //   initialEvents={data?.events.map(({_id, ...props}) => (
              initialEvents={reservations}
                // {id: _id, ...props}
            //   ))}
            />
          ): (
            <Typography 
              variant='h4'
              fontSize='2rem'
              fontWeight='bold'
              textAlign='center'
              mt={6}
            >Getting reservations...</Typography>
          )}
        </Box>

      {/* <CustomModal
        title='Booking details'
        open={modal}
        handleClose={() => setModal(!modal)}
      > */}
        

        {/* <List sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar>
                <FilePresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Topic" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Teacher" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar>
                <DomainIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Classroom" secondary="July 20, 2014" />
          </ListItem>
        </List> */}
      {/* </CustomModal> */}
    </DashboardLayout>
  )
}

export default Schedule