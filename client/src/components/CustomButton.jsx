import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const CustomButton = ({text, link, loading = false, size = 'md' , ...props}) => {
  const colors = tokens();

  const sizes = {
    sm: {
      padding: "2px 8px",
      fontSize: "12px",
    },
    md: {
      padding: "8px 15px",
      fontSize: "14px",
    },
  }

  const mainStyles = {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 15px",
    ...(sizes[size])
  }

  const styles = {
    primary: {
      ...mainStyles,
      backgroundColor: colors.primary,
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: colors.primary,
        boxShadow: `0 0 8px ${colors.primary}`,
      },
    },
    secondary: {
      ...mainStyles,
      backgroundColor: colors.secondary,
      color: colors.primary,
      '&:hover': {
        backgroundColor: colors.secondary,
        boxShadow: `0 0 8px ${colors.secondary}`,
      },
    },
    // danger: {
    //   ...mainStyles,
    //   backgroundColor: colors.redAccent[500],
    //   color: '#e0e0e0',
    //   '&:hover': {
    //     backgroundColor: colors.redAccent[600],
    //     boxShadow: `0 0 8px ${colors.redAccent[600]}`,
    //   },
    // }
  }
  
  return (
    <Button
      sx={styles[props.btnstyle]}
      {...props}
      {...(loading) && {
        disabled: true,
        startIcon: <CircularProgress color="inherit" size={20} thickness={6}  />
      }}
      {...(link && {
        component: Link,
        to: link
      })}
    >
      {loading ? 'Submitting' : text}
    </Button>
  )
}

export default CustomButton