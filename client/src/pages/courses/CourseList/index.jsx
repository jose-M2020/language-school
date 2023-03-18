import { Grid, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import Header from '../../../layouts/Dashboard/components/Header'
import { Course } from './components/Course'
import TabPanel from './components/TabPanel'

const myCourses = [
  {
    name: 'Classes english for kids',
    description: 'A new  funny way to encourage kids to learn english',
    price: 1200,
    discount: 120,
    modality: 'Online',
    levels: [
      {
        name: 'Beginner I',
        description: 'In this level you will learn the basic of english'
      },
      {
        name: 'Beginner II',
        description: 'In this level you will learn the basic of english'
      }
    ]
  },
]

const courses = [
  {
    name: 'Classes english for kids',
    description: 'A new  funny way to encourage kids to learn english',
    price: 1200,
    discount: 120,
    modality: ['Online', 'In-person'],
    levels: [
      {
        name: 'Beginner I',
        description: 'In this level you will learn the basic of english'
      },
      {
        name: 'Beginner II',
        description: 'In this level you will learn the basic of english'
      }
    ]
  },
  {
    name: 'Classes english for teens',
    description: 'A new  funny way to encourage kids to learn english',
    price: 1200,
    discount: 120,
    modality: ['Online', 'In-person'],
    levels: [
      {
        name: 'Beginner I',
        description: 'In this level you will learn the basic of english'
      },
      {
        name: 'Beginner II',
        description: 'In this level you will learn the basic of english'
      }
    ]
  },
]

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CourseList = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Header title="COURSES" />
      <Box mb={8}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value}
            onChange={(_, newValue) => setValue(newValue)} 
            aria-label="basic tabs example"
          >
            <Tab label="My Courses" {...a11yProps(0)} />
            <Tab label="All" {...a11yProps(1)} />
            <Tab label="Upcoming" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {myCourses.map((course, i) => (
              <Grid key={i} item lg={6}>
                <Course data={course} ispurchased={true} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            {courses.map((course, i) => (
              <Grid key={i} item lg={6}>
                <Course data={course} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          No courses
        </TabPanel>
      </Box>
    </>
  )
}

export default CourseList