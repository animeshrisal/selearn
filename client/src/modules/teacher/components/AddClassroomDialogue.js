import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { teacherDashboardService } from '../TeacherDashboardService';

const AddClassroomDialogue = (props) => {

    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [banner, setBanner] = useState(null);
    const [activeStatus, setActiveStatus] = useState(true)
    const [imageUrl, setImageUrl] = useState(null);


    const handleClose = () => {
        props.handleClose()
    };

    const addClassroom = () => {
        props.addClassroom({ subject, description, banner, activeStatus }, props.state)
        setSubject('')
        setDescription('')
        handleClose()
    }

    useQuery(["classroom", props.id], () =>
        teacherDashboardService.getClassroom(props.classroomId), {
        refetchOnWindowFocus: false,
        enabled: props.state === "Add" ? false : true,
        onSuccess: (classroom) => {
            setSubject(classroom.subject)
            setDescription(classroom.description)
            setActiveStatus(classroom.activeStatus)
            }
        }
    );


    useEffect(() => {
        if (banner) {
            setImageUrl(URL.createObjectURL(banner));
        }
    }, [banner]);

    const handleSubject = e => setSubject(e.target.value);
    const handleDescription = e => setDescription(e.target.value);
    const handleActiveStatus = e => setActiveStatus(e.target.checked)

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>{props.state} Classroom</DialogTitle>
            <DialogContent>
                <Switch
                    checked={activeStatus}
                    onChange={handleActiveStatus}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <TextField
                    margin="normal"
                    value={subject}
                    onChange={handleSubject}
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    autoComplete="subject"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    value={description}
                    onChange={handleDescription}
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                />
                <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{ display: 'none' }}
                    onChange={e => setBanner(e.target.files[0])}
                />
                <label htmlFor="select-image">
                    <Button variant="contained" color="primary" component="span">
                        Upload Image
                    </Button>
                </label>
                {imageUrl && banner && (
                    <Box mt={2} textAlign="center">
                        <div>Image Preview:</div>
                        <img src={imageUrl} alt={banner.name} height="100px" />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addClassroom}>Add Classroom</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddClassroomDialogue;