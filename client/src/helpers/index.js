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
      title: 'pending',
      color: hexToRgba(colors.primary, 0.5),
      canCancel: true
    },
    {
      title: 'confirmed',
      color: hexToRgba(colors.primary, 0.8),
      canCancel: true
    },
    {
      title: 'attended',
      color: colors.primary,
      canCancel: false
    },
    {
      title: 'cancelled',
      color: '#fdd2c7',
      canCancel: false
    }
  ]

  return status ? (
    statusArray.find(item => item.title === status)
  ) : statusArray;
}