import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddQuestionDialogue from '../components/AddQuestionDialogue';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

const SetQuizAsActiveModal = (props) => {

    const handleClose = () => {
        props.handleClose()
    }

    const setQuizAsActive = () => {
        props.setQuizAsActive()
    }

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
                Are you sure you want to set this quiz as active ? You will be unable to later edit it.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={setQuizAsActive}>Set Active</Button>
            </DialogActions>
        </Dialog>
    )
}

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const editRow = (id) => {
        props.selectedRow(id)
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>
                    <IconButton onClick={() => editRow(row.id)}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Choices</TableCell>
                                        <TableCell>Answer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{row.firstChoice}</TableCell>
                                        <TableCell>{row.correctChoice === 1 ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{row.secondChoice}</TableCell>
                                        <TableCell>{row.correctChoice === 2 ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell>{row.thirdChoice}</TableCell>
                                        <TableCell>{row.correctChoice === 3 ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{row.fourthChoice}</TableCell>
                                        <TableCell>{row.correctChoice === 4 ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const Quiz = (props) => {

    const queryClient = useQueryClient()
    const { classroomId, quizId } = useParams();

    const { isLoading, data } = useQuery(["getQuestions"], () => teacherDashboardService.getQuestions(classroomId, quizId), {
        onSuccess: (data) => {
        }
    });

    const [openModal, setOpenModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(0)
    const [selectedState, setSelectedState] = useState('Add')
    const [openQuizActiveModal, setOpenQuizActiveModal] = useState(false)

    const handleClickOpen = () => {
        setSelectedRow(0)
        setSelectedState('Add')
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSelectedRow = (id) => {
        setSelectedRow(id)
        setSelectedState('Edit')
        setOpenModal(true);
    };

    const mutation = useMutation(
        ({ question, selectedState }) => {
            if (selectedState === 'Add') return teacherDashboardService.postQuestion(classroomId, quizId, question)
            else if (selectedState === 'Edit') return teacherDashboardService.updateQuestion(classroomId, quizId, selectedRow, question)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getQuestions'])
                queryClient.invalidateQueries(['quiz', selectedRow])
            },
        }
    );

    const quizStateMutation = useMutation(
        () => teacherDashboardService.setQuizAsActive(classroomId, quizId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getQuestions'])
            },
        }

    )

    const addQuestionToQuiz = (question) => {
        mutation.mutate({ question, selectedState })
    }

    const setQuizAsActive = () => {
        quizStateMutation.mutate()
    }

    const handleOpenQuizActiveModal = () => {
        setOpenQuizActiveModal(true)
    }

    const handleCloseQuizActiveModal = () => {
        setOpenQuizActiveModal(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Button onClick={() => handleOpenQuizActiveModal()}>Set as active</Button>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Question</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.results.map((row) => (
                                <Row key={row.id} row={row} selectedRow={handleSelectedRow} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AddQuestionDialogue
                    openModal={openModal}
                    addQuestionToQuiz={addQuestionToQuiz}
                    handleClose={handleClose}
                    state={selectedState}
                    classroomId={classroomId}
                    quizId={quizId}
                    selectedRow={selectedRow}
                />

                <SetQuizAsActiveModal
                    openModal={openQuizActiveModal}
                    handleClose={handleCloseQuizActiveModal}
                    setQuizAsActive={setQuizAsActive}
                />

                <Fab onClick={handleClickOpen} onClose={handleClose} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default Quiz;

