import React, { useMemo } from 'react';
import { ContactList, ListItem } from './Contacts.styled';
import { Button } from '../PhoneBookField/PhonebookField.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/store';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const filteredContacts = useMemo(
    () =>
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, contacts]
  );

  return (
    <ContactList>
      {filteredContacts &&
        filteredContacts.map(contact => {
          return (
            <ListItem key={contact.id}>
              {contact.name}: {contact.number}
              <Button onClick={() => dispatch(deleteContact(contact.id))}>
                Delete
              </Button>
            </ListItem>
          );
        })}
    </ContactList>
  );
};

export default Contacts;
