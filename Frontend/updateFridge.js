// Add a food item to the selected fridge
function addFood() {
        // document.getElementById("addFoodForm").addEventListener('submit', async (event) => {
        const fridgeNum = document.getElementById("fridgeNum").value;
        const fridge = document.getElementById(`fridge-${fridgeNum}`)
                       .querySelector('table')
                       .getElementsByTagName('tbody')[0]; // Get tbody
        const newRow = fridge.insertRow(); // Insert a new row into the tbody

        // Create cells in the new row
        const deleteCell = newRow.insertCell(0);
        const number = newRow.insertCell(1);
        const name = newRow.insertCell(2);
        const purchaseDate = newRow.insertCell(3);
        const openedDate = newRow.insertCell(4);
        const expirDate = newRow.insertCell(5);

        // Set cell content with values from input fields
        number.innerHTML = fridge.rows.length;
        name.innerHTML = document.getElementById("name").value;
        purchaseDate.innerHTML = document.getElementById("purchaseDate").value;
        openedDate.innerHTML = document.getElementById("openedDate").value;
        expirDate.innerHTML = document.getElementById("expirDate").value;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.color = 'white';
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.addEventListener('click', async (req, res) => {
                const response = await fetch('https://salty-island-68864-4dea84da182c.herokuapp.com/deleteFood', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, purchaseDate, openedDate, expirDate, fridgeNum, username }),
                credentials: 'include',
                });
                row.remove();
        });
        deleteCell.appendChild(deleteBtn);
}

// Edit a specific fridge item
function editFood() {
        const rowIndex = document.getElementById("row").value - 1; // Adjust for 1-based index
        const openedDate = document.getElementById("openedDateEdit").value;
        const expirDate = document.getElementById("expirDateEdit").value;

        const fridgeNum = document.getElementById("fridgeNum").value;
        const fridge = document.getElementById(`fridge-${fridgeNum}`)
                       .querySelector('table')
                       .getElementsByTagName('tbody')[0]; // Get tbody
        const rows = fridge.rows; // Get all rows
        if (rowIndex < 0 || rowIndex >= rows.length) {
                alert("Invalid food item.");
                return;
        }
        const row = rows[rowIndex];

        if (openedDate.trim() !== "") {
                const cell = row.cells[4];
                cell.innerHTML = openedDate;
        }
        if (expirDate.trim() !== "") {
                const cell = row.cells[5];
                cell.innerHTML = expirDate;
        }

        // Clear form inputs
        document.getElementById("row").value = '';
        document.getElementById("openedDateEdit").value = '';
        document.getElementById("expirDateEdit").value = '';
}

function deleteFood(row, foodName, purchaseDate, openedDate, expirDate, fridgeNum, username) {
        
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

function sortFridge(fridgeNum, col, ascending) {
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