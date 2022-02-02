import { Container, Fab, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import ClassroomCard from '../components/ClassroomPaper';
import AddIcon from '@mui/icons-material/Add';
import { useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { dashboardService } from '../DashboardService';

const Classroom = () => {

    const { isLoading, data } = useQuery("getFeed", dashboardService.getClassrooms);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <Grid item xs={8}>
                        {data.results.map((classroom) => (
                            <ClassroomCard key={Classroom.id} {...classroom} />
                        ))}
                    </Grid>
                </Container>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default Classroom

