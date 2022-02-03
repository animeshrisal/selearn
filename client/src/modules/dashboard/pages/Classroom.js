import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Classroom = (props) => {
    const { classroomId } = useParams();
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(["classroom", classroomId], () =>
        dashboardService.getClassroom(classroomId)
    );

    const { isLoading: isLoadingEnrollmentStatus, data: enrollmentStatus } = useQuery(["enrollment", classroomId],
        () => dashboardService.getEnrollmentStatus(classroomId)
    )

    const { isLoading: isLoadingLesson, data: dataLesson } = useQuery(["lessons"], () =>
        dashboardService.getLessons(classroomId)
    );

    const goToLessonPage = (id) => {
        navigate(`lesson/${id}`);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (data) {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                        {isLoadingEnrollmentStatus ? <CircularProgress /> :
                            enrollmentStatus.enrolled || enrollmentStatus.enrolled_at ? <Button>Enrolled</Button> : <Button>Enroll</Button>}
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
                                        <Button onClick={() => goToLessonPage(lesson.id)}>
                                            Go to Lesson
                                        </Button>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345, height: 200 }}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                title="Teacher"
                                subheader="Toast boi"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {props.subject}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {props.description}
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default Classroom;