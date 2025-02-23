let currentSlide = 0;

// Move carousel slide
function moveSlide(direction) {
        const carousel = document.getElementById('carousel');
        const totalSlides = document.getElementsByClassName('carousel-item').length;
        currentSlide += direction;

        // Ensure the slide index stays within bounds
        if (currentSlide < 0) {
                currentSlide = totalSlides - 1; // Go to last slide
        }
        if (currentSlide >= totalSlides) {
                currentSlide = 0; // Go to first slide
        }

        // Move carousel to the correct slide
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Handle fridge selection from dropdown
const fridgeNumberDropdown = document.getElementById("fridgeNumber");

fridgeNumberDropdown.addEventListener("change", function() {
        const selectedValue = parseInt(fridgeNumberDropdown.value, 10);
        moveToSlide(selectedValue - 1); // Adjust index (dropdown starts at 1, array starts at 0)
});

// Move carousel to a specific slide based on the fridge selected
function moveToSlide(slideNumber) {
        const carousel = document.getElementById("carousel");
        const totalSlides = document.getElementsByClassName('carousel-item').length;

        if (slideNumber < 0 || slideNumber >= totalSlides) return;

        currentSlide = slideNumber;

        // Move carousel to the correct slide
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Edit a specific fridge item
function editFridge() {
        const row = document.getElementById("row").value - 1; // Adjust for 1-based index
        const column = document.getElementById("column").value;
        const newValue = document.getElementById("newValue").value;

        const fridgeNumber = document.getElementById("fridgeNumber").value;
        const table = document.getElementById(`fridge-${fridgeNumber}`).querySelector('table')
                .getElementsByTagName('tbody')[0]; // Get tbody
        const rows = table.rows;

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

// Add a food item to the selected fridge
function addFood() {
        const fridgeNumber = document.getElementById("fridgeNumber").value;
        const table = document.getElementById(`fridge-${fridgeNumber}`).querySelector('table')
                .getElementsByTagName('tbody')[0]; // Get tbody
        const newRow = table.insertRow(); // Insert a new row into the tbody

        // Create cells in the new row
        const number = newRow.insertCell(0);
        const name = newRow.insertCell(1);
        const purchaseDate = newRow.insertCell(2);
        const openedDate = newRow.insertCell(3);
        const expirationDate = newRow.insertCell(4);

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
