
function createForm() {
    var form = document.createAttribute("form");
}

function labelCreator(labelText, id, parent) {
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", id);
    newLabel.appendChild(document.createTextNode(labelText));
    parent.appendChild(newLabel);
    parent.appendChild(document.createElement("br"));
}

function textInputCreator(labelText, id, parent) {
    // create label
    labelCreator(labelText, id, parent);

    // create text input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", id);
    newInput.setAttribute("id", id);
    parent.appendChild(newInput);
    parent.appendChild(document.createElement("br"));
}

function radioButtonCreator(labelText, id, name, parent) {
    // create label
    labelCreator(labelText, id, parent);

    // create radio button
    var newRadio = document.createElement("input");
    newRadio.setAttribute("type", "radio");
    newRadio.setAttribute("name", name);
    newRadio.setAttribute("id", id);
    parent.appendChild(newRadio);
    parent.appendChild(document.createElement("br"));
}

function checkBoxCreator(labelText, id, name, parent) {
        // create label
        labelCreator(labelText, id, parent);

        // create radio button
        var newCheckBox = document.createElement("input");
        newCheckBox.setAttribute("type", "checkbox");
        newCheckBox.setAttribute("name", name);
        newCheckBox.setAttribute("id", id);
        parent.appendChild(newCheckBox);
        parent.appendChild(document.createElement("br"));
}

var itemCounter = 1;
function addNew() {

    var container = document.getElementById("main_form");
    if(itemCounter == 1) {
        container.appendChild(document.createElement("hr"));
    }

    textInputCreator("Label", "name_label" + itemCounter, container);
    textInputCreator("Total Cost", "total_cost" + itemCounter, container);

    // create radio buttons for who paid
    labelCreator("Person who paid", null, container);
    radioButtonCreator("Ryan", "rd_ryan" + itemCounter, "paid", container);
    radioButtonCreator("Aliyah", "rd_aliyah" + itemCounter, "paid", container);
    radioButtonCreator("Mark", "rd_mark" + itemCounter, "paid", container);
    radioButtonCreator("Erick", "rd_erick" + itemCounter, "paid", container);
    
    // create checkboxes for who it is being split with
    labelCreator("People splitting the bill", null, container);
    checkBoxCreator("Aliyah", "ch_aliyah" + itemCounter, "paid", container);
    checkBoxCreator("Ryan", "ch_ryan" + itemCounter, "paid", container);
    checkBoxCreator("Mark", "ch_mark" + itemCounter, "paid", container);
    checkBoxCreator("Erick", "ch_erick" + itemCounter, "paid", container);

    container.appendChild(document.createElement("hr"));

    itemCounter++;
}