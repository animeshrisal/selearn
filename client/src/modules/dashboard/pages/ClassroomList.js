import { Grid } from '@mui/material';
import React from 'react';
import ClassroomCard from '../../shared/components/ClassroomCard';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { dashboardService } from '../DashboardService';


const ClassroomList = (props) => {
    const navigate = useNavigate();
    const { isLoading, data } = useQuery("getFeed", dashboardService.getClassrooms);

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
            </React.Fragment>
        )
    }
}

export default ClassroomList

