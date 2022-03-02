import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

    const addQuestion = () => {
        props.addQuestionToQuiz({ question, firstChoice, secondChoice, thirdChoice, fourthChoice, correctChoice }, props.state)
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
    const handleCorrectChoice = e => setCorrectChoice(e.target.value);

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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Correct Choice</InputLabel>
                    <Select
                        value={correctChoice}
                        label="Correct Choice"
                        onChange={handleCorrectChoice}
                    >
                        <MenuItem value={1}>First Choice</MenuItem>
                        <MenuItem value={2}>Second Choice</MenuItem>
                        <MenuItem value={3}>Third Choice</MenuItem>
                        <MenuItem value={4}>Fourth Choice</MenuItem>
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addQuestion}>Add Question</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialogue;