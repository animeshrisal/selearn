import { Container, Fab, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import ClassroomCard from '../components/ClassroomCard';
import AddIcon from '@mui/icons-material/Add';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { dashboardService } from '../DashboardService';
import Dialog from '@mui/material/Dialog';
import AddClassroomDialogue from '../components/AddClassroomDialogue';

const ClassroomList = (props) => {
    const navigate = useNavigate();
    let { url } = useParams();
    const { isLoading, data } = useQuery("getFeed", dashboardService.getClassrooms);

    const mutation = useMutation(
        (classroom) => dashboardService.postClassroom(classroom),
        {
            onSuccess: (mutation) => {
                console.log("AA")
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
        console.log(classroom)
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

                </Grid>
                <Fab onClick={handleClickOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <AddClassroomDialogue
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    openModal={openModal}
                    addClassroom={addClassroom}
                />
            </React.Fragment>
        )
    }
}

export default ClassroomList

