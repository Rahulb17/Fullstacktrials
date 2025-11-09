document.addEventListener('DOMContentLoaded', () => {
    const appForm = document.getElementById('app-form');
    const activeList = document.getElementById('active-list');
    const completedList = document.getElementById('completed-list');
    
    // Set today's date as default for the date input
    document.getElementById('date').valueAsDate = new Date();


    // Function to create a new list item (<li>) from application data
    function createListItem(appData) {
        const listItem = document.createElement('li');
        listItem.classList.add('app-item');
        
        // --- DETAILS ---
        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');
        
        const mainInfo = document.createElement('span');
        mainInfo.classList.add('main-info');
        mainInfo.textContent = `${appData.company} - ${appData.role}`;
        
        const statusTag = document.createElement('span');
        statusTag.classList.add('status-tag', `status-${appData.status}`);
        statusTag.textContent = appData.status;

        mainInfo.appendChild(statusTag);

        const dateInfo = document.createElement('span');
        dateInfo.classList.add('status-info');
        dateInfo.textContent = `Applied: ${appData.date}`;

        appDetails.appendChild(mainInfo);
        appDetails.appendChild(dateInfo);
        listItem.appendChild(appDetails);

        // --- ACTIONS ---
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        // Archive/Delete Button
        const archiveButton = document.createElement('button');
        archiveButton.classList.add('archive-btn');
        archiveButton.textContent = 'Archive';
        actionsDiv.appendChild(archiveButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'X';
        actionsDiv.appendChild(deleteButton);

        listItem.appendChild(actionsDiv);

        // --- EVENT LISTENERS ---

        // Toggle completion/archive status
        archiveButton.addEventListener('click', () => {
            if (listItem.parentElement.id === 'active-list') {
                // Move from Active to Archived
                completedList.appendChild(listItem);
                archiveButton.textContent = 'Restore';
                listItem.classList.add('archived');
            } else {
                // Move from Archived back to Active
                activeList.appendChild(listItem);
                archiveButton.textContent = 'Archive';
                listItem.classList.remove('archived');
            }
        });

        // Delete item permanently
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        return listItem;
    }

    // Handle form submission
    appForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const appData = {
            company: document.getElementById('company').value.trim(),
            role: document.getElementById('role').value.trim(),
            date: document.getElementById('date').value,
            status: document.getElementById('status').value,
        };

        if (appData.company && appData.role) {
            const newApp = createListItem(appData);
            activeList.appendChild(newApp);

            // Reset the form
            appForm.reset();
            document.getElementById('date').valueAsDate = new Date(); // Reset date to today
        } else {
            alert('Please fill in the Company Name and Role Title.');
        }
    });

    // Optional: Add a few initial items for demonstration
    activeList.appendChild(createListItem({
        company: 'Google',
        role: 'Software Engineer',
        date: '2025-10-25',
        status: 'Interviewing'
    }));
    activeList.appendChild(createListItem({
        company: 'Netflix',
        role: 'Product Designer',
        date: '2025-10-10',
        status: 'Applied'
    }));
});