import { Container, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import ClassroomCard from '../components/ClassroomPaper';

const Classroom = () => {
    return (
        <Container maxWidth="sm">
            <Grid item xs={8}>
                <ClassroomCard />
            </Grid>
        </Container>
    )
}

export default Classroom