import { Chip, Fab, Grid, IconButton, Paper } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import AddQuizDialogue from '../components/AddQuizDialgoue';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const stateChip = (state) => {
    if (state === 0) {
        return <Chip label="To Review" color="primary" />
    } else if (state === 1) {
        return <Chip label="Active" color="primary" />
    } else {
        return <Chip label='Archived' color='primary' />
    }
}

const QuizList = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { classroomId } = useParams();

    const { isLoading, data } = useQuery(["getQuiz"], () => teacherDashboardService.getQuizzes(classroomId), {
        onSuccess: (data) => {
        }
    });

    const mutation = useMutation(
        (quiz) => teacherDashboardService.postQuiz(classroomId, quiz),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getQuiz'])
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

    const addQuiz = (classroom) => {
        mutation.mutate(classroom)
    }

    const goToQuizPage = (id) => {
        navigate(`${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return (
            <React.Fragment>
                <Grid container spacing={2}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quiz</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.results.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {stateChip(row.state)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => goToQuizPage(row.id)} sx={{ p: 0 }}>
                                                <ArrowForwardIcon />
                                            </IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <AddQuizDialogue
                        openModal={openModal}
                        addQuiz={addQuiz}
                        handleClose={handleClose}
                        state='Add'
                    />
                </Grid>
                <Fab onClick={handleClickOpen} onClose={handleClose} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default QuizList

