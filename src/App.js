import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import Title from './Components/Title';
import Phonebook from './Components/PhoneBookField';
import Contacts from './Components/Contacts';
import FilterContactsInput from './Components/FilterContactsInput';
import { Container } from './Components/Title/Title.styled';
import keyGenerator from 'keygenerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, filterContacts } from 'redux/store';

const App = () => {
  const STORAGE = 'contact';

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    // let contactsData = JSON.parse(localStorage.getItem(STORAGE));
    // if (contactsData) {
    //   dispatch(addContact(...contactsData));
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const setContactName = (e, name, number) => {
    e.preventDefault();

    let isUniq = contacts?.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isUniq) {
      toast('Контакт с таким именем уже существует!');
      return;
    }

    dispatch(addContact({ id: keyGenerator.password(), name, number }));
  };

  const setFilteredContact = e => {
    const { value } = e.target;
    dispatch(filterContacts(value));
  };

  const deleteItem = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Container>
      <Title title="Phonebook">
        <Phonebook addContact={setContactName} />
      </Title>
      <Title title="Contacts"></Title>
      <FilterContactsInput setFilter={setFilteredContact} />
      <Contacts deleteContact={deleteItem} />
      <ToastContainer />
    </Container>
  );
};

export default App;
