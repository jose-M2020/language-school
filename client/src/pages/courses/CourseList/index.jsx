import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Header from '../../../layouts/Dashboard/components/Header'
import { Course } from './components/Course'

const myCourses = [
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

const CourseList = () => {
  

  return (
    <>
      <Header title="COURSES" />
      <Grid container spacing={2}>
        <Typography>New courses</Typography>
        {courses.map((course, i) => (
          <Grid key={i} item lg={6}>
            <Course data={course} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CourseList