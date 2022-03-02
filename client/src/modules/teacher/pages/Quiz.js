import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import AddQuestionDialogue from '../components/AddQuestionDialogue';

const Quiz = (props) => {

    const queryClient = useQueryClient()
    const { classroomId, quizId } = useParams();

    const { isLoading, data } = useQuery(["getQuiz"], () => teacherDashboardService.getQuizzes(classroomId), {
        onSuccess: (data) => {
            console.log(data)
        }
    });

    const [openModal, setOpenModal] = useState(false)

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const mutation = useMutation(
        (question) => teacherDashboardService.postQuestion(classroomId, quizId, question),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getQuiz'])
            },
        }
    );

    const addQuestionToQuiz = (question) => {
        mutation.mutate(question)
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return (
            <React.Fragment>
                <AddQuestionDialogue
                    openModal={openModal}
                    addQuestionToQuiz={addQuestionToQuiz}
                    handleClose={handleClose}
                    state='Add'
                />
                <Fab onClick={handleClickOpen} onClose={handleClose} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default Quiz;

