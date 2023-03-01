const { v4: uuidv4 } = require('uuid');

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
    try{
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    }catch(error){
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const filterContact = contacts.filter((contact) => contact.id == contactId);
    return filterContact;
}

async function removeContact(contactId) {
    try{
        const contacts = await listContacts();
        const deleteContact = contacts.filter((contact) => contact.id !== contactId);
        return deleteContact;
    }catch(error){
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try{
        const contacts = await listContacts();
        const newContacts = {id: uuidv4(), name, email, phone};
        const addNewContact = [...contacts, newContacts];

        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return addNewContact;
    }catch(error){
        console.log(error.message);
    }
    
}

module.exports = {
    addContact, 
    removeContact, 
    getContactById, 
    listContacts
};
