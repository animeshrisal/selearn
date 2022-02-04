import { Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import ReactMarkdown from 'react-markdown'
import "./Lesson.scss";

const Lesson = (props) => {
    const { classroomId, lessonId } = useParams();
    const { isLoading, data } = useQuery(["lesson", lessonId], () =>
        dashboardService.getLesson(classroomId, lessonId)
    );

    const completeLessonMutation = useMutation(
        () => dashboardService.completeLesson(classroomId, lessonId)
    );

    const completeLesson = () => {
        completeLessonMutation.mutate()
    }

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
                    <Button>
                        Go to next lesson
                    </Button>
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