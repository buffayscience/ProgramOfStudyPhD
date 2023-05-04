// Select the button element
const button = document.querySelector('button');

// Add a click event listener to the button
button.addEventListener('click', () => {
  // Select the HTML table element
  const table = document.querySelector('table');

  // Initialize a new jsPDF instance
  const doc = new jsPDF();

  // Set the position of the first page of the PDF document
  let position = 0;

  // Loop through each page of the HTML table
  while (position < table.clientHeight) {
    // Add the current page of the HTML table to the PDF document
    doc.addHTML(table, 0, position, {}, () => {
      // Move to the next page of the HTML table
      position -= table.clientHeight;

      // If there are more pages, add a new page to the PDF document
      if (position > 0) {
        doc.addPage();
      }
      // If there are no more pages, save the PDF document and trigger a download
      else {
        doc.save('table.pdf');
      }
    });
  }
});