import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import { Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StudentQuiz = () => {
    const { classroomId, quizId } = useParams();
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery(["getQuestions"], () => dashboardService.getQuestions(classroomId, quizId), {
        onSuccess: (data) => {
        }
    });


    const [quizState, setQuizState] = useState({});
    const [showAnswer, setShowAnswer] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState([])
    const [score, setScore] = useState(0)


    const testRadio = (e, questionId) => {
        setQuizState({ ...quizState, [questionId]: parseInt(e.target.value) })
    }

    const mutation = useMutation(
        () => dashboardService.completeQuiz(classroomId, quizId, quizState), {
        onSuccess: (result) => {
            console.log(result.score)
            setCorrectAnswer(result.userInput)
            setScore(result.score)
            setShowAnswer(true)

        }
    }
    );

    const completeQuiz = () => {
        mutation.mutate()
    }

    const showCorrectAnswer = (id) => {
        const obj = correctAnswer.find(o => o.id === id)
        return obj.result
    }

    if (isLoading) {
        return <div> Loading Quiz.... </div>
    }

    return (
        <Grid container>
            {
                data.results.map((question) => (
                    <Grid container key={question.id} >
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">{question.question}</FormLabel>
                                <RadioGroup key={question.id} onChange={(e) => testRadio(e, question.id)}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <Stack direction="row" spacing={2}>
                                        <FormControlLabel value="1" control={<Radio />} label={question.firstChoice} />
                                    </Stack>
                                    <FormControlLabel value="2" control={<Radio />} label={question.secondChoice} />
                                    <FormControlLabel value="3" control={<Radio />} label={question.thirdChoice} />
                                    <FormControlLabel value="4" control={<Radio />} label={question.fourthChoice} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {showAnswer ? showCorrectAnswer(question.id) ? <CheckIcon /> : <ClearIcon /> : ''}
                        </Grid>
                    </Grid>

                ))
            }
            <Button onClick={completeQuiz}>Complete Quiz </Button>
            {showAnswer && <div> Score: {score.score}</div>}
        </Grid>
    )
}

export default StudentQuiz