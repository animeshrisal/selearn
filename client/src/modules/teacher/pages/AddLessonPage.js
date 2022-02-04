import { ThemeProvider } from '@emotion/react';
import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useMutation } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';
import { useParams } from 'react-router-dom';

const theme = createTheme();

const AddLessonPage = () => {
    const { classroomId } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const mutation = useMutation(
        () => teacherDashboardService.postLesson(classroomId, {name, description, body}),
    );

    const addLesson = () => {
        console.log("ASDASDSD")
        mutation.mutate()
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container >
                <CssBaseline />
                <Grid xs={12}>
                    <Typography component="h1" variant="h5">
                        New Lesson
                    </Typography>
                </Grid>
                <Grid xs={4}>
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
                <Button onClick={addLesson}>Add Lesson</Button>
        </Grid>
        </ThemeProvider >
    )
}

export default AddLessonPage;