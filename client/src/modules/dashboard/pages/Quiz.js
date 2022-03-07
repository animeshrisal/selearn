import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';
import { Grid } from '@mui/material';

const StudentQuiz = () => {
    const { classroomId, quizId } = useParams();
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery(["getQuestions"], () => dashboardService.getQuestions(classroomId, quizId), {
        onSuccess: (data) => {
        }
    });


    const [quizState, setQuizState] = useState({});

    const testRadio = (e, questionId) => {
        setQuizState({ ...quizState, [questionId]: parseInt(e.target.value) })
    }

    const mutation = useMutation(
        () => dashboardService.completeQuiz(classroomId, quizId, quizState)
    );

    const completeQuiz = () => {
        mutation.mutate()
    }

    if (isLoading) {
        return <div> Loading Quiz.... </div>
    }

    return (
        <Grid container>
            {
                data.results.map((question) => (
                    <Grid xs={12}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">{question.question}</FormLabel>
                            <RadioGroup key={question.id} onChange={(e) => testRadio(e, question.id)}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={question.firstChoice} />
                                <FormControlLabel value="2" control={<Radio />} label={question.secondChoice} />
                                <FormControlLabel value="3" control={<Radio />} label={question.thirdChoice} />
                                <FormControlLabel value="4" control={<Radio />} label={question.fourthChoice} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                ))
            }
            <Button onClick={completeQuiz}>Complete Quiz </Button>
        </Grid>
    )
}

export default StudentQuiz