let contacts = []

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
}


function saveContacts() {
 window.localStorage.setItem("contacts", JSON.stringify(contacts))
 drawContacts()
}


function loadContacts() {
  let storedContacts = JSON.parse(window.localStorage.getItem ("contacts"))
  if (storedContacts){
    contacts = storedContacts
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
 let contactListElement = document.getElementById("contact-list")
 let contactsTemplate = ""
 contacts.forEach(contact => {
   contactsTemplate += `
   <div class="contact-card ${contact.emergencyContact ? 'emergency-contact' : ''}">
     <h3 class="mt-1 mb-1">${contact.name}</h3>
     <div class="d-flex space-between">
     <p>
     <i class="fa fa-fw fa-phone"></i>
     <span>${contact.phone}</span>
    </p>
   <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
     </div>
     </div>
      `
     })
     contactListElement.innerHTML = contactsTemplate
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1){
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById('new-contact-form').classList.toggle("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()