import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';

const AddQuizDialogue = (props) => {

    const [name, setName] = useState('')

    const handleClose = () => {
        props.handleClose()
    };

    const addQuiz = () => {
        props.addQuestionToQuiz({ name }, props.state)
        setName('')
        handleClose()
    }

    useQuery(["quiz", props.id], () =>
        teacherDashboardService.getQuiz(props.quizId), {
        refetchOnWindowFocus: false,
        enabled: props.state === "Add" ? false : true,
        onSuccess: (quiz) => {
            setName(quiz.name)
        }
    }
    );

    const handleName = e => setName(e.target.value);

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>{props.state} Quiz</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    value={name}
                    onChange={handleName}
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    autoComplete="subject"
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addQuiz}>Add Quiz</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuizDialogue;