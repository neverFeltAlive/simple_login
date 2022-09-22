import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

type ContactProps = {
    name: string
    number: string
    deleteAction: () => void
}

/**
 * Component for displaying a single contact
 * @param props - name, number, delete function
 * @constructor
 */
const Contact = (props: ContactProps): JSX.Element => {
    /**
     * Handles delete button click
     * @param event
     */
    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        props.deleteAction();
    }

    return (
        <Card sx={{ width: 250}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.number}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleDelete}>Удалить</Button>
            </CardActions>
        </Card>
    );
};

export default Contact;