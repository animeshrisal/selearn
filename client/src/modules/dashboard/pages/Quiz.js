import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { dashboardService } from '../DashboardService';

const StudentQuiz = () => {
    const { classroomId, quizId } = useParams();

    const { isLoading, data } = useQuery(["getQuestions"], () => dashboardService.getQuestions(classroomId, quizId), {
        onSuccess: (data) => {
        }
    });

    const [quizState, setQuizState] = useState({});

    if(isLoading) {
        return <div> Loading Quiz.... </div>
    }

    return (
        <React.Fragment>
            {
                data.results.map((question) => (
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                ))
            }
        </React.Fragment>
    )
}

export default StudentQuiz