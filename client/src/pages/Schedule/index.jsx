import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list";
import { Box, Stack, Typography } from '@mui/material'
import DashboardLayout from '../../layouts/Dashboard'
import CutomButtom from '../../components/CustomButton'
import { useState } from 'react';
import { useEffect } from 'react';
import { tokens } from '../../theme';
import { hoursDiff, reservationStatus } from '../../helpers';

// TODO: 
  // 1.- Disabled the selection of ceills to book a class
  // 2.- Get all the user reservations and show them in the calendar
  // 3.- Send a second request to get the available reservations if the user hasn't superated the allowed hours of the current week
  // 4.- Show a message to the user that it'is checking the available reservations
  // 5.- Allow the selection of reservation

  // TODO:Add status field to the schema model in mongoose, to check if the class is available or reservation


const Schedule = () => {
  const [canBook, setCanBook] = useState(false);
  const colors = tokens()
  const selectedDates = [];
  const reservations = [
    {
      id: "12315",
      title: "Reservation",
      status: 'cancelled',
      date: "2023-03-07T09:00:00-06:00",
      color: reservationStatus('cancelled').color,
      textColor: colors.primary
    },
    {
      id: "12315",
      title: "Reservation",
      status: 'attended',
      date: "2023-03-07T12:00:00-06:00",
      color: reservationStatus('attended').color
    },
    {
      id: "5123",
      title: "Reservation",
      status: 'confirmed',
      date: "2023-03-07T14:00:00-06:00",
      color: reservationStatus('confirmed').color
    },
  ];

  const allowedDates = [
    "2023-03-04T07:00:00-06:00",
    "2023-03-04T08:00:00-06:00",
    "2023-03-04T09:00:00-06:00",
    "2023-03-04T10:00:00-06:00",
    "2023-03-04T11:00:00-06:00",
  ]

  useEffect(() => {
    setTimeout(() => {
      setCanBook(true)
    }, 1000);
  }, [])

  const renderEventContent = (eventInfo) => {
    const {
      timeText,
      event: {title},
      event: {extendedProps: {
        status
      }}
    } = eventInfo;

    console.log(eventInfo.event.extendedProps.status)

    const canCancel = status === 'pending' || status === 'confirmed';

    return (
      <Stack spacing={1}>
        <Typography variant='span' fontWeight='bold'>{timeText}</Typography>
        <Typography variant='span'>{title}</Typography>
        {/* {eventInfo.event.id === 'wait' && } */}
        {
          canCancel && (
            <CutomButtom 
              text='Cancel'
              btnstyle='secondary'
              size='sm'
            />
          )
        }
        {
          !canCancel && (
            <Typography>{status}</Typography>
          )
        }
      </Stack>
    )
  }

  const handleDateClick = (selected) =>{
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    console.log(calendarApi.getEvents())



    if(reservations.some(item => item.date === selected.startStr)){
      alert('Date has already been selected');
      return;
    }
    if(!selectedDates.includes(selected.startStr)){
      selectedDates.push(selected.startStr);
      calendarApi.addEvent({
        id: 'wait',
        title: 'Waiting',
        start: selected.startStr,
        status: 'pending',
        color: reservationStatus('pending').color,
        textColor: colors.secondary
      });
    }

    console.log(selected)
  }

  const handleEventClick = (event) => {
    console.log(event)
  }

  return (
    <DashboardLayout>
        <Box>
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
              eventaft
              initialView="timeGridWeek"
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={2}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
            //   initialEvents={data?.events.map(({_id, ...props}) => (
              initialEvents={reservations}
                // {id: _id, ...props}
            //   ))}
            />
          </Box>
    </DashboardLayout>
  )
}

export default Schedule