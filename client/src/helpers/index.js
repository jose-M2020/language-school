import { tokens } from "../theme"

const colors = tokens()

export const hoursDiff = (dt1, dt2) => {
 const diffTime =(dt2.getTime() - dt1.getTime());
 const hoursDiff = diffTime / (1000 * 3600); 
 return hoursDiff;
}

export const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const reservationStatus = (status) => {
  const statusArray = [
    {
      title: 'processing',
      bgColor: '#dae4e9',
      color: colors.primary,
      canCancel: false
    },
    {
      title: 'pending',
      bgColor: hexToRgba(colors.primary, 0.5),
      color: colors.white,
      canCancel: true
    },
    {
      title: 'confirmed',
      bgColor: hexToRgba(colors.primary, 0.8),
      color: colors.white,
      canCancel: true
    },
    {
      title: 'attended',
      bgColor: colors.primary,
      color: colors.white,
      canCancel: false
    },
    {
      title: 'cancelled',
      bgColor: '#fdd2c7',
      color: colors.primary,
      canCancel: false
    }
  ]

  return status ? (
    statusArray.find(item => item.title === status)
  ) : statusArray;
}

export const getWeekDates = (date) => {  
  date = new Date(date ?? '');

  // Determine the start date of the current week (Sunday)
  let firstDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(), 
    date.getDate() - (date.getDay() - 1)
  );
  let datesOfWeek = [];

  // Loop through the week, adding each day to the array
  for (let i = 0; i < 7; i++) {
    let date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    datesOfWeek.push(date);
  }

  return datesOfWeek;
}