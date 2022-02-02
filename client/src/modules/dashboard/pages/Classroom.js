import { Accordion, AccordionDetails, AccordionSummary, Button, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
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

    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>;
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Accordion 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
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