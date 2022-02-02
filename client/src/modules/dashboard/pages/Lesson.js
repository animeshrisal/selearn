import { CircularProgress, Container } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';

const Lesson = (props) => {
    const { classroomId, lessonId } = useParams();
    const { isLoading, data } = useQuery(["lesson", lessonId], () =>
        dashboardService.getLesson(classroomId, lessonId)
    );

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            Lesson
        </Container>
    )


}

export default Lesson