import { Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
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

    if (isLoading) {
        return <CircularProgress />;
    }

    if (data) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography gutterBottom variant="h3" component="div"> {data.name} </Typography>
                </Grid>
                <Grid item xs={2}>
                    {data.next && <Button onClick={goToNextLesson}>
                        Go to next lesson
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
                            width: 100
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