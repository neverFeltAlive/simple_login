import React, {useState} from 'react';
import {Box, Button, Divider, IconButton, TextField, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useContacts} from "../../hooks/use-contacts";
import {DEBUG} from "../../utils/constants";
import {useModal} from "../../hooks/use-context";

const FormContainer = styled(Box)(() => ({
    padding: "20px",
}))

/**
 * Component for adding new contact
 * @constructor
 */
const AddContact = (): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const {setContent} = useModal();
    const {addContact} = useContacts();

    /**
     * Handles change event of phone number input
     * @param event
     */
    const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        if (event.target.type === "tel") {
            let value = event.target.value;

            value = value.replace("+7", "").replace(/\D/g, "");

            if (value.length > 3) {
                if (value.length < 7) {
                    value = `+7 (${value.slice(0, 3)}) ${value.slice(3)}`
                } else if (value.length < 9) {
                    value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
                } else if (value.length < 11) {
                    value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8)}`
                } else {
                    value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`
                }
            }

            setPhone(value);
        }
    }

    /**
     * Handles form submission
     * @param event
     */
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        if (name && phone){
            addContact(name, phone)
                .then(() => {
                    if (setContent) setContent(null);
                })
                .catch((error) => {
                    if (DEBUG) console.error(error);
                })
        }
    }

    return (
        <FormContainer>
            <Typography variant="h4">Добавить контакт</Typography>
            <Divider sx={{margin: "20px"}}/>
            <form>
                <TextField
                    label="Имя"
                    variant="outlined"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{
                        my: "10px",
                        width: "350px"
                    }}
                /><br/>
                <TextField
                    label="Номер телефона"
                    variant="outlined"
                    type="tel"
                    name="number"
                    value={phone}
                    onChange={handleNumberChange}
                    required
                    sx={{
                        my: "10px",
                        width: "350px"
                    }}
                /><br/>
                <Button variant="outlined" sx={{mt:"20px"}} type="submit" onClick={handleSubmit}>Добавить</Button>
            </form>
        </FormContainer>
    );
};

export default AddContact;