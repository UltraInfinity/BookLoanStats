function displaySelectedTask() {
    const selectedTask = document.getElementById("taskSelector").value;

    fetch('results.json')
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';  // Clear previous results

        const selectedData = data[selectedTask];
        const tableHeaders = Object.keys(selectedData[0]); // Assuming data is an array of objects
        let tableHTML = '<table><thead><tr>';

        // Add headers
        tableHeaders.forEach(header => {
            tableHTML += `<th>${header.charAt(0).toUpperCase() + header.slice(1)}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        // Add rows
        selectedData.forEach(row => {
            tableHTML += '<tr>';
            tableHeaders.forEach(header => {
                tableHTML += `<td>${row[header]}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';

        resultsDiv.innerHTML = tableHTML;
    });
}
