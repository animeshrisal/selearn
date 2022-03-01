import { Avatar, Fab, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import AddQuizDialogue from '../components/AddQuizDialgoue';
import FolderIcon from '@mui/icons-material/Folder';

const QuizList = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { classroomId } = useParams();

    const { isLoading, data } = useQuery(["getQuiz"], () => teacherDashboardService.getQuizzes(classroomId), {
        onSuccess: (data) => {
            console.log(data)
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
        console.log(classroom)
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
                    <List>
                        {data.results.map((quiz) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={quiz.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <AddQuizDialogue
                        openModal={openModal}
                        addClassroom={addQuiz}
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

