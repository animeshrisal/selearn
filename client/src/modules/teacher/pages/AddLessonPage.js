import { ThemeProvider } from '@emotion/react';
import { Button, createTheme, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useMutation, useQuery } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import { useLocation, useParams } from 'react-router-dom';

const theme = createTheme();

const AddLessonPage = () => {
    const { state } = useLocation();

    const { classroomId } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)


    useQuery(["lesson", state.id], () =>
        teacherDashboardService.getLesson(classroomId, state.id), {
        enabled: state.action === "post" ? false : true,
        onSuccess: (lessonData) => {
            setName(lessonData.name)
            setDescription(lessonData.description)
            setBody(lessonData.body)
        }
    }
    );

    const mutation = useMutation(
        () => {
            if (state.action === 'post') return teacherDashboardService.postLesson(classroomId, { name, description, body })
            else if (state.action === 'edit') return teacherDashboardService.updateLesson(classroomId, state.id, { name, description, body })
        },
    );

    const addLesson = () => {
        mutation.mutate()
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container >
                <CssBaseline />
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        {state.action === "post" && "New Lesson"}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="normal"
                        value={name}
                        onChange={handleName}
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        value={description}
                        onChange={handleDescription}
                        autoComplete="description"
                    />
                </Grid>
                <Grid item xs={12}>
                    Body
                    <MDEditor
                        height={500}
                        value={body}
                        onChange={setBody}
                    />
                </Grid>
                <Button onClick={addLesson}>{state.action === "post" ? 'Add Lesson' : 'Update Lesson'}</Button>
            </Grid>
        </ThemeProvider >
    )
}

export default AddLessonPage;