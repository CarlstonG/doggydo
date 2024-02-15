
const inputFieldEL = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const itemListEL = document.getElementById("item-list");

addButtonEl.addEventListener('click', () => {
    let inputValue = inputFieldEL.value;
    console.log(inputValue);
});
window.onload = function () {
    loadItems();
};

addButtonEl.addEventListener('click', () => {
    let inputValue = inputFieldEL.value;
    if (inputValue.trim() !== "") {
        addItem(inputValue);
        inputFieldEL.value = "";
    }
    else{
        alert("Please add data")
    }
});

function addItem(item) {
    // Get existing items from localStorage or initialize an empty array
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Add the new item
    items.push(item);

    // Save the updated items array to localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // Update the displayed items
    loadItems();
}

function loadItems() {
    // Get items from localStorage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Clear the existing list
    itemListEL.innerHTML = "";

    // Populate the list with items
   items.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;

    
    // Add a delete button for each item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
        deleteItem(index);
    });


    //add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener('click', () => {
        editItem(index, item);
    });



    itemListEL.appendChild(listItem);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
   
 

    
});
}
function deleteItem(index) {
    // Get existing items from localStorage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Remove the item at the specified index
    items.splice(index, 1);

    // Save the updated items array to localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // Update the displayed items
    loadItems();
}

//edit function

function editItem(index, originalValue) {
    // Get existing items from localStorage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Prompt the user for a new value
    const newValue = prompt("Edit item:", originalValue);

    // If the user clicked "Cancel" or entered an empty value, do nothing
    if (newValue === null || newValue.trim() === "") {
        return;
    }

    // Update the item at the specified index
    items[index] = newValue;

    // Save the updated items array to localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // Update the displayed items
    loadItems();
}