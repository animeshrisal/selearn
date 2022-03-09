import { Fab, Grid, IconButton, Paper } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { dashboardService } from '../DashboardService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const StudentQuizList = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { classroomId } = useParams();

    const { isLoading, data } = useQuery(["getQuiz"], () => dashboardService.getQuizzes(classroomId), {
        onSuccess: (data) => {
        }
    });

    const mutation = useMutation(
        (quiz) => dashboardService.postQuiz(classroomId, quiz),
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
        navigate(`${id}/`);
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
                                            {row.score === null && <IconButton onClick={() => goToQuizPage(row.id)} sx={{ p: 0 }}>
                                                <ArrowForwardIcon />
                                            </IconButton>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Fab onClick={handleClickOpen} onClose={handleClose} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default StudentQuizList

