import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const CustomButton = ({text, link, loading = false , ...props}) => {
  const colors = tokens();

  const mainStyles = {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 15px",
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
    // secondary: {
    //   ...mainStyles,
    //   backgroundColor: colors.primary,
    //   color: colors.grey[100],
    //   '&:hover': {
    //     color: colors.grey[100],
    //     boxShadow: `0 0 8px ${colors.primary}`,
    //   },
    // },
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