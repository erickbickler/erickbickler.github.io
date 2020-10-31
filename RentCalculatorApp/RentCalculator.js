
function createForm() {
    var form = document.createAttribute("form");
}

function textInput(labelText, id, parent) {
    // create label
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", id);
    newLabel.appendChild(document.createTextNode("labelText"));
    parent.appendChild(newLabel);

    // create text input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", id);
    newInput.setAttribute("id", id);
    parent.appendChild(newInput);
}

var itemCounter = 0;
function addNew() {
    var container = document.getElementById("main_form");

    textInput("Label", "name_label", container);
    textInput("Total Cost", "total_cost", container);

}