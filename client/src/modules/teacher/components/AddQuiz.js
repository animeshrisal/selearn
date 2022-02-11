import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

const AddQuiz = (props) => {

    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [banner, setBanner] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    const handleClose = () => {
        props.handleClose()
    };

    const addClassroom = () => {
        props.addClassroom({subject, description, banner})
        setSubject('')
        setDescription('')
        
    }


    useEffect(() => {
        if (banner) {
            setImageUrl(URL.createObjectURL(banner));
        }
    }, [banner]);

    const handleSubject = e => setSubject(e.target.value);
    const handleDescription = e => setDescription(e.target.value);

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>Add Classroom</DialogTitle>
            <DialogContent>
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

export default AddQuiz;