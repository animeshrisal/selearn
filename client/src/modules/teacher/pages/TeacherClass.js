import { Button, CardContent, CardMedia, CircularProgress, Container, FormControlLabel, FormGroup, Grid, IconButton, Paper, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { teacherDashboardService } from '../TeacherDashboardService';
import EditIcon from '@mui/icons-material/Edit';

const TeacherClass = (props) => {
    const { classroomId } = useParams();
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(["classroom", classroomId], () =>
        teacherDashboardService.getClassroom(classroomId)
    );

    const { data: dataLesson, isSuccess } = useQuery(["lessons"], () =>
        teacherDashboardService.getLessons(classroomId)
    );

    const goToAddLessonPage = (action = "post", id = 0) => {
        navigate(`add_lesson/`, { state: { action, id } });
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (data) {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />} label="Active" />
                        </FormGroup>
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
                    <Grid item xs={4}>
                        <Button onClick={() => goToAddLessonPage()}>Add new lesson</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {isSuccess ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Lesson Name</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataLesson.results.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => goToAddLessonPage("edit", row.id)} color="primary" component="span">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
                            <Skeleton animation="wave" />
                        }
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default TeacherClass;