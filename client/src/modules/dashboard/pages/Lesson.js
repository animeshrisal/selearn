import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import ReactMarkdown from 'react-markdown'
import "./Lesson.scss";

const Lesson = (props) => {
    const { classroomId, lessonId } = useParams();
    const { isLoading, data, refetch } = useQuery(["lesson", lessonId], () =>
        dashboardService.getLesson(classroomId, lessonId)
    );

    const navigate = useNavigate();

    const completeLessonMutation = useMutation(
        () => dashboardService.completeLesson(classroomId, lessonId), {
        onSuccess: () => {
            refetch()
        }
    }
    );

    const completeLesson = () => {
        completeLessonMutation.mutate()
    }

    const goToNextLesson = () => {
        navigate(`/dashboard/classroom/${classroomId}/lesson/${data.next}`);
    };

    const goToPreviousLesson = () => {
        navigate(`/dashboard/classroom/${classroomId}/lesson/${data.previous}`);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (data) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography gutterBottom variant="h3" component="div"> {data.name} </Typography>
                </Grid>
                <Grid item xs={4}>
                    {data.previous && <Button onClick={goToPreviousLesson}>
                        Previous lesson
                    </Button>}
                    {data.next && <Button onClick={goToNextLesson}>
                        Next lesson
                    </Button>}
                </Grid>
                <Grid item xs={12}>
                    {data.description}
                </Grid>
                <Grid item xs={12}>
                    <Paper variant="outlined"
                        className="markdown-content"
                        sx={{
                            padding: 5,
                            width: '60rem'
                        }}
                    >
                        <ReactMarkdown>{data.body}</ReactMarkdown>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    {!data.completed && <Button onClick={completeLesson}>Complete lesson</Button>}
                </Grid>
            </Grid>
        )
    }


}

export default Lesson