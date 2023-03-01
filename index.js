const { addContact, removeContact, getContactById, listContacts } = require('./contacts.js');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const list = await listContacts();
        console.log(list);
      break;

    case "get":
        const contactById = await getContactById(id);
        console.log(contactById);
      break;

    case "add":
        const newContactsList = await addContact(name, email, phone);
        console.log(newContactsList);
      break;

    case "remove":
        const afterRemoveContactsList = await removeContact(id);
        console.log(afterRemoveContactsList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);