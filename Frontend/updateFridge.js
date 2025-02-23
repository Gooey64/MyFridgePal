// Add a food item to the selected fridge
function addFood() {
        const fridgeNum = document.getElementById("fridgeNum").value;
        const fridge = document.getElementById(`fridge-${fridgeNum}`)
                       .querySelector('table')
                       .getElementsByTagName('tbody')[0]; // Get tbody
        const newRow = fridge.insertRow(); // Insert a new row into the tbody

        // Create cells in the new row
        const number = newRow.insertCell(0);
        const name = newRow.insertCell(1);
        const purchaseDate = newRow.insertCell(2);
        const openedDate = newRow.insertCell(3);
        const expirDate = newRow.insertCell(4);

        // Set cell content with values from input fields
        number.innerHTML = fridge.rows.length;
        name.innerHTML = document.getElementById("name").value;
        purchaseDate.innerHTML = document.getElementById("purchaseDate").value;
        openedDate.innerHTML = document.getElementById("openedDate").value;
        expirDate.innerHTML = document.getElementById("expirDate").value;

        // Clear the form inputs
        document.getElementById("name").value = '';
        document.getElementById("purchaseDate").value = '';
        document.getElementById("openedDate").value = '';
        document.getElementById("expirDate").value = '';
}

// Edit a specific fridge item
function editFridge() {
        const row = document.getElementById("row").value - 1; // Adjust for 1-based index
        const column = document.getElementById("column").value;
        const newValue = document.getElementById("newValue").value;

        const fridgeNum = document.getElementById("fridgeNum").value;
        const fridge = document.getElementById(`fridge-${fridgeNum}`)
                       .querySelector('table')
                       .getElementsByTagName('tbody')[0]; // Get tbody
        const rows = fridge.rows;

        if (row >= 0 && row < rows.length) { // Ensure the row exists
                const cell = rows[row].cells[column]; // Get the specific cell
                if (cell) { // Ensure the cell exists
                        cell.innerHTML = newValue; // Update the cell content
                } else {
                        alert("Invalid column index.");
                }
        } else {
                alert("Invalid row index.");
        }

        // Clear form inputs
        document.getElementById("row").value = '';
        document.getElementById("column").value = '';
        document.getElementById("newValue").value = '';
}

let currSlide = 0;

// Move carousel slide
function moveSlide(direction) {
        const carousel = document.getElementById('carousel');
        const totalSlides = document
                            .getElementsByClassName('carousel-item').length;
        const fridgeNumDropdown = document.getElementById("fridgeNum");
        currSlide += direction;

        // Ensure the slide index stays within bounds
        if (currSlide < 0) {
                currSlide = totalSlides - 1; // Go to last slide
        }
        if (currSlide >= totalSlides) {
                currSlide = 0; // Go to first slide
        }

        // Move carousel to the correct slide
        carousel.style.transform = `translateX(-${currSlide * 100}%)`;
        fridgeNumDropdown.value = currSlide + 1;
}

// Move carousel to a specific slide based on the fridge selected
function selectSlide(slideNum) {
        const carousel = document.getElementById("carousel");
        const totalSlides = document
                            .getElementsByClassName('carousel-item').length;

        if (slideNum < 0 || slideNum >= totalSlides) return;

        currSlide = slideNum;

        // Move carousel to the correct slide
        carousel.style.transform = `translateX(-${currSlide * 100}%)`;
}

function sortTable(fridgeNum, col, ascending) {
        const fridge = document.getElementById(`fridge-${fridgeNum}`)
                       .querySelector('table')
                       .getElementsByTagName('tbody')[0];
        const rows = Array.from(fridge.rows); // Convert rows to an array
    
        rows.sort((rowA, rowB) => {
                let cellA = rowA.cells[col].innerText.trim();
                let cellB = rowB.cells[col].innerText.trim();

                // Convert to numbers if applicable
                if (!isNaN(cellA) && !isNaN(cellB)) {
                        return ascending ? cellA - cellB : cellB - cellA;
                }

                // Convert to dates if applicable (YYYY-MM-DD format)
                if (/\d{4}-\d{2}-\d{2}/.test(cellA) &&
                    /\d{4}-\d{2}-\d{2}/.test(cellB)) {
                        return ascending ? new Date(cellA) - new Date(cellB) :
                                           new Date(cellB) - new Date(cellA);
                }

                // Default: Compare as strings
                        return ascending ? cellA.localeCompare(cellB) :
                                           cellB.localeCompare(cellA);
        });
    
        // Re-add sorted rows to the table
        fridge.innerHTML = "";
        rows.forEach(row => fridge.appendChild(row));
}