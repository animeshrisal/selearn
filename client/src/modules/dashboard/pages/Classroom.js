import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Classroom = (props) => {
    const { classroomId } = useParams();
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(["classroom", classroomId], () =>
        dashboardService.getClassroom(classroomId)
    );

    const { isLoading: isLoadingEnrollmentStatus, data: enrollmentStatus, refetch } = useQuery(["enrollment", classroomId],
        () => dashboardService.getEnrollmentStatus(classroomId)
    )

    const isEnrolled = enrollmentStatus?.enrolled

    const { data: dataLesson, isSuccess } = useQuery(["lessons"], () =>
        dashboardService.getUserLessons(classroomId), {
        //Get lessons if user is enrolled
        enabled: !!isEnrolled
    }
    );

    const mutation = useMutation(
        () => dashboardService.createEnrollment(classroomId),
        {
            onSuccess: () => {
                refetch()
            },
        }
    );

    const createEnrollment = () => {
        mutation.mutate()
    }

    const goToUserQuiz = () => {
        navigate(`quiz_list/`)
    }

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
                            enrollmentStatus.enrolled || enrollmentStatus.enrolled_at
                                ? <Button>Enrolled</Button>
                                : <Button onClick={createEnrollment}>Enroll</Button>}
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
                            isEnrolled ? isSuccess ? dataLesson.results.map((lesson) => (
                                <Accordion key={lesson.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Grid container direction="row"
                                            justifyContent="space-between"
                                            alignItems="center">
                                            <Grid item>
                                                <Typography>{lesson.name}</Typography>
                                            </Grid>
                                            <Grid item>
                                                {lesson.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                                            </Grid>

                                        </Grid>
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
                            )) : <CircularProgress /> :
                                <Box>Please enroll in the class to see the lessons</Box>
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
                        <Grid >
                            <Button onClick={goToUserQuiz}>Take Quiz</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default Classroom;