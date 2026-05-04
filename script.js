let items = JSON.parse(localStorage.getItem("items")) || [];

// Toggle table
document.getElementById("toggleTable").addEventListener("change", function() {
    document.getElementById("inventoryTable").style.display =
        this.checked ? "table" : "none";
    renderTable();
});

// Add item
function addItem() {
    let name = document.getElementById("item").value;
    let qty = document.getElementById("quantity").value;

    if (!name || !qty) return;

    items.push({ name, quantity: parseInt(qty) });
    localStorage.setItem("items", JSON.stringify(items));

    console.log("Item added:", name, qty);

    renderTable();

    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
}

// Render table
function renderTable() {
    let tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    items.forEach((item, index) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = item.name;

        let qtyCell = document.createElement("td");
        qtyCell.innerText = item.quantity;

        // Double click edit
        qtyCell.ondblclick = function() {
            editQuantity(qtyCell, index);
        };

        row.appendChild(nameCell);
        row.appendChild(qtyCell);
        tbody.appendChild(row);
    });
}

// Edit quantity
function editQuantity(cell, index) {
    let currentValue = cell.innerText;

    if (cell.querySelector("input")) return;

    let input = document.createElement("input");
    input.type = "number";
    input.value = currentValue;

    cell.innerHTML = "";
    cell.appendChild(input);
    input.focus();

    input.addEventListener("blur", save);
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") save();
    });

    function save() {
        let newValue = input.value;

        items[index].quantity = parseInt(newValue);
        localStorage.setItem("items", JSON.stringify(items));

        console.log("Updated item:", items[index]);

        renderTable();
    }
}