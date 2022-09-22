import React, {useEffect, useState} from 'react';
import Contact from "./Contact";
import {Box, Button, Container, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import {Contact as ContactType, useContacts} from "../../hooks/use-contacts";
import {useLoad, useModal, useSearch} from "../../hooks/use-context";
import AddContact from "./AddContact";
import {DEBUG} from "../../utils/constants";
import {LoadContexts} from "../load/LoadProvider";

/**
 * Component for displaying a grid of contacts
 * @constructor
 */
const Contacts = (): JSX.Element => {
    const {contacts, deleteContact} = useContacts();
    const [visibleContacts, setVisibleContacts] = useState<null | ContactType[]>(null);
    const {setContent} = useModal();
    const {searchString} = useSearch();
    const {isLoading} = useLoad(LoadContexts.CONTACTS);

    // Use search context to define which contacts to show
    useEffect(() => {
        if (searchString === ""){
            setVisibleContacts(contacts);
        } else {
            const newCurrentContacts: ContactType[] = contacts?.filter((contact: ContactType) => {
                const lowerCaseString = searchString.toLowerCase();
                const isInName = contact.name.toLowerCase().includes(lowerCaseString);
                const isInPhone = contact.phone.toLowerCase().includes(lowerCaseString);
                if (isInName || isInPhone) return true;
            }) ?? [];
            setVisibleContacts(newCurrentContacts);
        }
    }, [searchString, contacts]);

    //region Event Handlers
    /**
     * Handles add contact button click
     * @param event
     */
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (setContent){
            setContent(<AddContact/>)
        }
    }

    /**
     * Handles delete of a contact
     * @param id - contact's id
     * @return {function} - function which deletes the contact
     */
    const handleDelete = (id: string) => {
        return () => {
            deleteContact(id)
                .then(() => {
                    if (DEBUG) console.info(`Deleted ${id}`);
                })
                .catch((error) => {
                    if (DEBUG) console.error(error);
                })
        }
    }
    //endregion

    //region JSX Elements
    // Define contacts elements is any found
    let visibleContactsElements: JSX.Element | JSX.Element[] = <Typography variant="h6">Ничего не найдено</Typography>
    if (visibleContacts && visibleContacts?.length > 0){
        visibleContactsElements = visibleContacts?.map((contact) => {
            return (
                <Grid item key={contact.id}>
                    <Contact name={contact.name} number={contact.phone} deleteAction={handleDelete(contact.id)}/>
                </Grid>
            )
        });
    }

    let noContacts = isLoading ? null : (<Typography variant="h6">У вас нет контактов</Typography>)
    //endregion

    return (
        <Container maxWidth="lg" sx={{p: "20px"}}>
            <>
                {contacts ? (
                    <Grid container spacing={2} sx={{p: "20px"}}>
                        {visibleContactsElements}
                    </Grid>
                ) : noContacts}
            </>
            <Divider variant="middle" sx={{m: "20px"}}/>
            <Button variant="outlined" onClick={handleClick}>Добваить контакт</Button>
        </Container>
    );
};

export default Contacts;