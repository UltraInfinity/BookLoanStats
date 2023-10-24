function displaySelectedTask() {
    const selectedTask = document.getElementById("taskSelector").value;

    fetch('results.json')
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';  // Clear previous results

        const selectedData = data[selectedTask];

        if (!selectedData) {
            console.error(`No data found for selected task: ${selectedTask}`);
            resultsDiv.innerHTML = '<p>No data available for the selected task.</p>';
            return;
        }

        // Handle 'book_popularity' data structure
        if (selectedTask === 'book_popularity') {
            const tableHeaders = ["Book ID", "Title", "Author"];
            let tableHTML = createTableFromHeaders(tableHeaders);
            
            for (let bookId in selectedData) {
                const row = [bookId, selectedData[bookId].title, selectedData[bookId].author];
                tableHTML += createTableRowFromData(row);
            }
            tableHTML += '</tbody></table>';
            resultsDiv.innerHTML = tableHTML;

        // Handle 'genre_popularity' and 'genre_book_count' data structures
        } else if (selectedTask === 'genre_popularity' || selectedTask === 'genre_book_count') {
            const tableHeaders = ["Genre", "Count"];
            let tableHTML = createTableFromHeaders(tableHeaders);
            
            for (let genre in selectedData) {
                const row = [genre, selectedData[genre]];
                tableHTML += createTableRowFromData(row);
            }
            tableHTML += '</tbody></table>';
            resultsDiv.innerHTML = tableHTML;

        // Handle 'loan_statistics' data structure
        } else if (selectedTask === 'loan_statistics') {
            const statisticsOrder = [
                { key: "total_loan_days", label: "Total Loan Days" },
                { key: "total_loan_count", label: "Total Loan Count" },
                { key: "average_loan_days", label: "Average Loan Days" },
                { key: "total_late_loan_days", label: "Total Late Loan Days" },
                { key: "total_late_loan_count", label: "Total Late Loan Count" },
                { key: "average_late_loan_days", label: "Average Late Loan Days" },
                { key: "percentage_returned_late", label: "Percentage Returned Late" }
    ];


    let tableHTML = '<table><thead><tr><th>Statistic</th><th>Value</th></tr></thead><tbody>';

    for (const stat of statisticsOrder) {
        let value = selectedData[stat.key];
        // Format values if needed
        if (stat.key === "average_loan_days" || stat.key === "average_late_loan_days") {
            value = value.toFixed(2);
        } else if (stat.key === "percentage_returned_late") {
            value = `${value.toFixed(2)}%`;
        }
        tableHTML += `<tr><td>${stat.label}</td><td>${value}</td></tr>`;
    }

    tableHTML += '</tbody></table>';
    resultsDiv.innerHTML = tableHTML;
}


function createTableFromHeaders(headers) {
    let tableHTML = '<table><thead><tr>';
    headers.forEach(header => {
        tableHTML += `<th>${header.charAt(0).toUpperCase() + header.slice(1)}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    return tableHTML;
}

function createTableRowFromData(rowData) {
    let rowHTML = '<tr>';
    rowData.forEach(cell => {
        rowHTML += `<td>${cell}</td>`;
    });
    rowHTML += '</tr>';
    return rowHTML;
}
