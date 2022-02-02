import { Accordion, AccordionDetails, AccordionSummary, Button, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Classroom = (props) => {
    const { classroomId } = useParams();
    const { isLoading, data } = useQuery(["classroom", classroomId], () =>
        dashboardService.getClassroom(classroomId)
    );

    const { isLoading: isLoadingLesson, data: dataLesson } = useQuery(["lessons"], () =>
        dashboardService.getLessons(classroomId)
    );

    if (isLoading) {
        return <CircularProgress />;
    }
    if (data) {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                        <Button variant="contained">
                            Enroll
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`${data.banner}`}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data.description}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={8}>
                        {
                            isLoadingLesson ? <CircularProgress /> : dataLesson.results.map((lesson) => (
                                <Accordion key={lesson.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{lesson.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {lesson.description}
                                        </Typography>
                                        <Button>
                                            Go to Lesson
                                        </Button>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Grid>
                    <Grid item xs={4}>
                        AA
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default Classroom;