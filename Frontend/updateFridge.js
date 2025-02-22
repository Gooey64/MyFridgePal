function editFridge() {
        var row = document.getElementById("row").value - 1; // Adjusting for 1-based index
        var column = document.getElementById("column").value;
        var newValue = document.getElementById("newValue").value;
        
        var table = document.getElementById("fridge").getElementsByTagName('tbody')[0]; // Get tbody
        var rows = table.rows;
        
        if (row >= 0 && row < rows.length) { // Ensure the row exists
                var cell = rows[row].cells[column]; // Get the specific cell
                if (cell) { // Ensure the cell exists
                        cell.innerHTML = newValue; // Update the cell content
                } else {
                        alert("Invalid column index.");
                }
        } else {
                alert("Invalid row index.");
        }

        document.getElementById("row").value = '';
        document.getElementById("column").value = '';
        document.getElementById("newValue").value = '';
}
    
function addFood() {
        var table = document.getElementById("fridge").getElementsByTagName('tbody')[0]; // Get tbody
        var newRow = table.insertRow(); // Insert a new row into the tbody
        
        // Create cells in the new row
        var number = newRow.insertCell(0);
        var name = newRow.insertCell(1);
        var purchaseDate = newRow.insertCell(2);
        var openedDate = newRow.insertCell(3);
        var expirationDate = newRow.insertCell(4);
        
        // Set cell content with values from input fields
        number.innerHTML = table.rows.length;
        name.innerHTML = document.getElementById("name").value;
        purchaseDate.innerHTML = document.getElementById("purchaseDate").value;
        openedDate.innerHTML = document.getElementById("openedDate").value;
        expirationDate.innerHTML = document.getElementById("expirationDate").value;
        
        // Clear the form inputs
        document.getElementById("name").value = '';
        document.getElementById("purchaseDate").value = '';
        document.getElementById("openedDate").value = '';
        document.getElementById("expirationDate").value = '';
    }
    