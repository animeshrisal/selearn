import { Fab, Grid } from '@mui/material';
import React, { useState } from 'react';
import ClassroomCard from '../../shared/components/ClassroomCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import AddClassroomDialogue from '../components/AddClassroomDialogue';

const TeacherClassList = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery("getFeed", teacherDashboardService.getClassrooms);

    const mutation = useMutation(
        (classroom) => teacherDashboardService.postClassroom(classroom),
        {
            onSuccess: (mutation) => {
                queryClient.invalidateQueries(['getFeed'])
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

    const addClassroom = (classroom) => {
        mutation.mutate(classroom)
    }

    const goToClassroomPage = (id) => {
        navigate(`${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return (
            <React.Fragment>
                <Grid container spacing={2}>
                    {data.results.map((classroom) => (
                        <Grid key={classroom.id} item xs={4}>
                            <ClassroomCard
                                key={classroom.id}
                                {...classroom}
                                goToClassroomPage={goToClassroomPage}
                            />
                        </Grid>
                    ))}
                    <AddClassroomDialogue
                        openModal={openModal}
                        addClassroom={addClassroom}
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

export default TeacherClassList

