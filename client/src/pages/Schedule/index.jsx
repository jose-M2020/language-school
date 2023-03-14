import { useState, useEffect, createRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list";
import { Box, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/Dashboard'
import CustomButton from '../../components/CustomButton'
import { getWeekDates, hoursDiff } from '../../helpers';
import { useCreateReservationMutation, useGetReservationsQuery } from '../../redux/api/reservationApi';
import { useSelector } from 'react-redux';
import EventContent from './components/EventContent';
import Header from '../../layouts/Dashboard/components/Header';

// TODO: 
  // 1.- Disabled the selection of ceills to book a class
  // 2.- Get all the user reservations and show them in the calendar
  // 3.- Send a second request to get the available reservations if the user hasn't superated the allowed hours of the current week
  // 4.- Show a message to the user that it'is checking the available reservations
  // 5.- Allow the selection of reservation

  // TODO:Add status field to the schema model in mongoose, to check if the class is available or reservation

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
  const { data: reservations = [], isLoading } = useGetReservationsQuery(userId);
  const [createReservation, { 
    isLoading: loadingPost,
    isError: isPostError,
    isSuccess: isPostSuccess,
    data
  }] = useCreateReservationMutation();
  
  const fullCalendarRef = createRef();
  const [canBook, setCanBook] = useState(false);
  const limitHoursPerWeek = 8;
  const [selectedReservations, setSelectedReservations] = useState([])
  
  useEffect(() => {
    setTimeout(() => {
      setCanBook(true)
    }, 1000);
  }, [])

  useEffect(() => {
    if(isPostError){
      toast.error('There was an error!');
    }
    if(isPostSuccess){
      const calendarApi = fullCalendarRef.current.getApi();
      const events = calendarApi.getEvents()

      events.forEach(event => (
        (event.extendedProps.status === 'processing') && event.remove() 
      ))
      setSelectedReservations([]);
      toast.success('Reservation added successfully!');
    }
  }, [loadingPost])

  useEffect(() => {
    if(data){
      const calendarApi = fullCalendarRef.current.getApi();

      data?.forEach(item => {
        calendarApi.addEvent({
          ...item,
          id: item._id,
          startStr: item.date,
        })
    });
    }
  }, [data])
  

  // FullCalendar Functions
  
  const handleDateClick = (selected) =>{
    const datesOfWeek = getWeekDates(selected.startStr)
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    
    const totalReservationsPerWeek = reservations.filter(item => {
      const belongsToWeek = datesOfWeek.some(date => (
        new Date(date).toDateString()  === new Date(item.startStr).toDateString()
      ));

      return item.status !== 'cancelled' && belongsToWeek
    })?.length;
    
    const totalSelectedPerWeek = selectedReservations.filter(item => {
      return datesOfWeek.some(date => (
        new Date(date).toDateString()  === new Date(item.startStr).toDateString()
      ));
    })?.length

    if((totalReservationsPerWeek + totalSelectedPerWeek) >= limitHoursPerWeek){
      return toast.info("You've exceeded the limit of hours per week!");
    }
    if(
      reservations?.some(item => item.startStr === selected.startStr) ||
      selectedReservations?.some(item => item.startStr === selected.startStr)
    ){
      return;
    }
    
    setSelectedReservations([
      ...selectedReservations,
      selected
    ])
    
    calendarApi.addEvent({
      start: selected.startStr,
      status: 'processing'
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
    if(loadingPost) return;
    if(!selectedReservations.length){
      return toast.error('Select at least one reservation');
    }
    // Example code for fullcalendar functions (IT'S WORKING)
    // const findedItem = calendarApi.getEventById('6407f46364dba2c2b108206f');
    // calendarApi.addEvent({});
    // findedItem.remove()

    const payload = selectedReservations.map(item => {
      return {
        date: item.startStr,
        studentId: userId,
        modality: 'In-person'
      }
    })

    setCanBook(false);
    await createReservation({
      userId,
      payload
    })
    setCanBook(true);
  }

  return (
    <DashboardLayout>
      <Header title="RESERVATIONS" />
        <Box>
          {!isLoading ? (
            <FullCalendar
              ref={fullCalendarRef}
              // height="75vh"
              initialEvents={reservations}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              customButtons={{
                myCustomButton: {
                  text: loadingPost ? 'Booking...' : 'Book classes',
                  click: () => {handleAddReservations()},
                }
              }}
              headerToolbar={{
                left: "myCustomButton",
                center: "prev,title,next",
                right: "timeGridWeek,listMonth",
              }}
              hiddenDays={[0]}
              unselectAuto={false}
              slotDuration='01:00'
              slotMinTime='07:00:00'
              slotMaxTime='21:00:00'
              firstDay={(new Date()).getDay()}
              allDaySlot={false}
              titleFormat={{
                month: 'long', year: 'numeric', day: 'numeric'
              }}
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
              validRange={(nowDate) => {
                const limitDate = new Date();
                limitDate.setDate(limitDate.getDate() + 13)

                return {
                  start: nowDate,
                  end: limitDate
                }
              }}

              select={handleDateClick}
              eventClick={handleEventClick}
              eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} calendarRef={fullCalendarRef} />}
              longPressDelay={1}
              
              contentHeight='auto'
              stickyHeaderDates={true}
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
    </DashboardLayout>
  )
}

export default Schedule