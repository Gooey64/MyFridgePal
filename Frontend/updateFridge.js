<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Table</title>
    <script>
        function updateTable() {
            var row = document.getElementById("row").value;
            var column = document.getElementById("column").value;
            var newValue = document.getElementById("newValue").value;
            
            var table = document.getElementById("dataTable");
            var cell = table.rows[row].cells[column];
            cell.innerHTML = newValue;
        }
    </script>
</head>
