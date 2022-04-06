import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const addContact = createAction('item/addContacts');
export const deleteContact = createAction('item/deleteContacts');
export const filterContacts = createAction('item/filterContacts');

const contactsReducer = createReducer(
  {
    items: [],
    filter: '',
  },
  {
    [addContact]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteContact]: (state, action) => {
      return {
        items: state.items.filter(contact => contact.id !== action.payload),
        filter: state.filter,
      };
    },
    [filterContacts]: (state, action) => {
      state.filter = action.payload;
    },
  }
);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
  },
});

export const persistor = persistStore(store);
