import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';

const AddQuestionDialogue = (props) => {

    const [question, setQuestion] = useState('')
    const [firstChoice, setFirstChoice] = useState('')
    const [secondChoice, setSecondChoice] = useState('')
    const [thirdChoice, setThirdChoice] = useState('')
    const [fourthChoice, setFourthChoice] = useState('')
    const [correctChoice, setCorrectChoice] = useState('')

    
    const handleClose = () => {
        props.handleClose()
    };

    const addClassroom = () => {
        props.addQuiz({ question, firstChoice, secondChoice, thirdChoice, fourthChoice, correctChoice }, props.state)
        setQuestion('')
        setFirstChoice('')
        setSecondChoice('')
        setThirdChoice('')
        setFourthChoice('')
        setCorrectChoice('')
        handleClose()
    }

    useQuery(["quiz", props.id], () =>
        teacherDashboardService.getQuestion(props.classroomId), {
        refetchOnWindowFocus: false,
        enabled: props.state === "Add" ? false : true,
        onSuccess: (question) => {
            setQuestion(question.question)
            setFirstChoice(question.firstChoice)
            setSecondChoice(question.secondChoice)
            setThirdChoice(question.thirdChoice)
            setFourthChoice(question.fourthChoice)
            setCorrectChoice(question.correctChoice)
            }
        }
    );

    const handleQuestion = e => setQuestion(e.target.value);
    const handleFirstChoice = e => setFirstChoice(e.target.value);
    const handleSecondChoice = e => setSecondChoice(e.target.value);
    const handleThirdChoice = e => setThirdChoice(e.target.value);
    const handleFourthChoice = e => setFourthChoice(e.target.value);

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>{props.state} Question</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    value={question}
                    onChange={handleQuestion}
                    required
                    fullWidth
                    id="question"
                    label="Question"
                    name="question"
                    autoComplete="question"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    value={firstChoice}
                    onChange={handleFirstChoice}
                    required
                    fullWidth
                    id="firstChoice"
                    label="First Choice"
                    name="firstChoice"
                    autoComplete="firstChoice"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    value={secondChoice}
                    onChange={handleSecondChoice}
                    required
                    fullWidth
                    id="secondChoice"
                    label="Second Choice"
                    name="secondChoice"
                    autoComplete="secondChoice"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    value={thirdChoice}
                    onChange={handleThirdChoice}
                    required
                    fullWidth
                    id="thirdChoice"
                    label="Third Choice"
                    name="thirdChoice"
                    autoComplete="thirdChoice"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    value={fourthChoice}
                    onChange={handleFourthChoice}
                    required
                    fullWidth
                    id="fourthChoice"
                    label="Fourth Choice"
                    name="fourthChoice"
                    autoComplete="fourthChoice"
                    autoFocus
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addClassroom}>Add Question</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialogue;