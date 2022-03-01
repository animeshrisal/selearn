import { Button, CardContent, CardMedia, CircularProgress, Container, Fab, Grid, IconButton, Paper, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { teacherDashboardService } from '../TeacherDashboardService';
import EditIcon from '@mui/icons-material/Edit';
import AddClassroomDialogue from '../components/AddClassroomDialogue';


const TeacherClass = (props) => {
    const queryClient = useQueryClient()
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

    const mutation = useMutation(
        ({classroom, state}) => {
            if(state === 'Add') return teacherDashboardService.postClassroom(classroom)
            else if (state === 'Edit') return teacherDashboardService.updateClassroom(classroom, classroomId)
        },         {
            onSuccess: (mutation) => {
                queryClient.invalidateQueries(['classroom', classroomId])
            },
        }
    );

    const [openModal, setOpenModal] = useState(false)

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const addClassroom = (classroom, state) => {
        console.log(state)
        mutation.mutate({classroom, state})
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    if (data) {
        return (
            <Container>
                <Grid container spacing={2}>
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
                <AddClassroomDialogue
                    state = 'Edit'
                    classroomId={data.id}
                    openModal={openModal}
                    addClassroom={addClassroom}
                    handleClose={handleClose}
                />
                <Fab onClick={handleClickOpen} onClose={handleClose} color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
            </Container>
        )
    }

}

export default TeacherClass;