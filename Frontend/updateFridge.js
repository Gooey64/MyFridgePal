function updateFridge() {
        var row = document.getElementById("row").value;
        var column = document.getElementById("column").value;
        var newValue = document.getElementById("newValue").value;
        
        var table = document.getElementById("fridge");
        var cell = table.rows[row].cells[column];
        cell.innerHTML = newValue;
}

function addFood() {
        var table = document.getElementById("fridge");
        var newRow = table.insertRow();
        
        var name = newRow.insertCell(0);
        var purchaseDate = newRow.insertCell(1);
        var openedDate = newRow.insertCell(2);
        var expirationDate = newRow.insertCell(3);
        
        name.innerHTML = document.getElementById("name").value;
        purchaseDate.innerHTML = document.getElementById("purchaseDate").value;
        openedDate.innerHTML = document.getElementById("openedDate").value;
        expirationDate.innerHTML = document.getElementById("expirationDate").value;
}
