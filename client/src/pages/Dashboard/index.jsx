import { Box } from '@mui/system'
import DashboardLayout from '../../layouts/Dashboard'
import Header from '../../layouts/Dashboard/components/Header'
import StatCard from './components/StatCard'
import SchoolIcon from '@mui/icons-material/School';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import PaidIcon from '@mui/icons-material/Paid';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Alert, AlertTitle, Grid } from '@mui/material';
import ReservationList from './components/ReservationList';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

const Dashboard = () => {
  // const isNonMediumScreens = useMediaQuery("(min-width: 800px)");

  return (
    <DashboardLayout>
      <Header title="OVERVIEW" />
      <Alert severity="info" sx={{ mb: '22px' }}>
        <AlertTitle><b>Your current membership is paused.</b></AlertTitle>
        Please go to our facilities or contact us to reactivate your account again.
      </Alert>
      <Grid container spacing={2}>
        {/* Stadistics card */}
        <Grid item xs={12} lg={8}>
          {/* Cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <StatCard 
                title='Classes Taken'
                icon={<FilterNoneIcon sx={{ fontSize: '3rem' }} />}
                value='23 hrs'
                value2='1000hrs'
                description='In 3 months'
              />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard 
                title={'Down payment' ?? 'Advance payment'}
                icon={<PaidIcon sx={{ fontSize: '3rem' }} />}
                value='$11,000'
                value2='$40,000'
                description='For 3 months'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard 
                title='Certificates Earned'
                icon={<WorkspacePremiumIcon sx={{ fontSize: '3rem' }} />}
                value='0'
                description='Per month'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard 
                title='Courses'
                icon={<SchoolIcon sx={{ fontSize: '3rem' }} />}
                value='1'
                description='Per month'
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Next clases */}
        <Grid item xs={12} lg={4}>
          <ReservationList 
            reservations={[
              {
                hour: '7:00 am',
                topic: 'Present perfect continuous',
                teacher: 'Julano de Mar'
              },
              {
                hour: '7:00 am',
                topic: 'Present perfect continuous and future continuous',
                teacher: 'Julano de Mar'
              },
              {
                hour: '7:00 am',
                topic: 'Present perfect continuous',
                teacher: 'Julano de Mar'
              },
              {
                hour: '7:00 am',
                topic: 'Present perfect continuous',
                teacher: 'Julano de Mar'
              },
            ]}
          />
        </Grid>
      </Grid>
      <Box height="60vh">
        <BarChart />
      </Box>
      <Box height="60vh">
        <LineChart />
      </Box>
    </DashboardLayout>
  )
}

export default Dashboard