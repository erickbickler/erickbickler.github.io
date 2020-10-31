
function createForm() {
    var form = document.createAttribute("form");
}

var itemCounter = 0;
function addNew() {
    var container = document.getElementById("main_form");

    // create label for text input
    var nameLabelLabel = container.appendChild("input");
    nameLabelLabel.setAttribute("for", "name_label");
    nameLabelLabel.appendChild(document.createTextNode("Label"));

    // create text input field for the 
    var nameLabelInput = container.appendChild("input");
    nameLabelInput.setAttribute("type", "text");
    nameLabelInput.setAttribute("name", "name_label");
    nameLabelInput.setAttribute("id", "name_label");

    
}