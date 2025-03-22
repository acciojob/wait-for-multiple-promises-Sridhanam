function getRandomDelay() {
    return Math.floor(Math.random() * 3) + 1;
}

// Create a promise that resolves after a random delay
function createPromise(promiseNumber) {
    return new Promise((resolve) => {
        const delay = getRandomDelay();
        setTimeout(() => {
            resolve({ promiseNumber, timeTaken: delay });
        }, delay * 1000);
    });
}

// Create 3 promises
const promise1 = createPromise(1);
const promise2 = createPromise(2);
const promise3 = createPromise(3);

// Display loading message initially
const output = document.getElementById('output');
output.innerHTML = `
    <tr>
        <td colspan="2" class="text-center">Loading...</td>
    </tr>
`;

// Start time for calculating total duration
const startTime = performance.now();

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
    // Calculate total time
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Clear the loading message
    output.innerHTML = '';

    // Populate results in the table
    results.forEach((result) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Promise ${result.promiseNumber}</td>
            <td>${result.timeTaken}</td>
        `;
        output.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>${totalTime}</strong></td>
    `;
    output.appendChild(totalRow);
});