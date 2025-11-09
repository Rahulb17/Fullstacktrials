document.addEventListener('DOMContentLoaded', () => {
    // --- GAME STATE ---
    const ARRAY_SIZE = 10;
    let codeArray = Array(ARRAY_SIZE).fill(null);
    let secretPattern = [];

    // --- DOM ELEMENTS ---
    const arrayDisplay = document.getElementById('array-display');
    const feedback = document.getElementById('feedback');
    const targetPatternDisplay = document.getElementById('target-pattern');
    
    // Buttons and Inputs
    const insertBtn = document.getElementById('insert-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const searchBtn = document.getElementById('search-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    
    const insertIndexInput = document.getElementById('insert-index');
    const insertValueInput = document.getElementById('insert-value');
    const deleteIndexInput = document.getElementById('delete-index');
    const searchPatternInput = document.getElementById('search-pattern');

    // --- UTILITY FUNCTIONS ---

    // Generates a random 3-digit pattern
    function generateSecretPattern() {
        secretPattern = [];
        for (let i = 0; i < 3; i++) {
            secretPattern.push(Math.floor(Math.random() * 10)); // Digits 0-9
        }
        // console.log("Secret Pattern:", secretPattern); // For debugging
    }

    // Displays array on the screen
    function renderArray() {
        arrayDisplay.innerHTML = '';
        codeArray.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('array-cell');
            cell.setAttribute('data-index', index);
            
            if (value === null) {
                cell.textContent = index; // Show index when empty
                cell.classList.add('empty');
            } else {
                cell.textContent = value;
            }
            
            arrayDisplay.appendChild(cell);
        });
    }

    // Displays feedback messages
    function setFeedback(message, type = 'default') {
        feedback.textContent = message;
        feedback.className = 'feedback'; // Reset classes
        if (type === 'success') {
            feedback.classList.add('success');
        } else if (type === 'error') {
            feedback.classList.add('error');
        }
    }

    // Resets the game state
    function resetGame() {
        codeArray = Array(ARRAY_SIZE).fill(null);
        generateSecretPattern();
        renderArray();
        setFeedback("System reset. Code array cleared.", 'success');
        targetPatternDisplay.textContent = '???';
    }

    // --- CORE ARRAY OPERATIONS ---

    // Insert at Index (Task 2: Shift others right)
    function handleInsert() {
        const index = parseInt(insertIndexInput.value);
        const value = parseInt(insertValueInput.value);

        if (isNaN(index) || isNaN(value) || index < 0 || index >= ARRAY_SIZE || value < 0 || value > 9) {
            setFeedback("Error: Index or Value is out of bounds (0-9).", 'error');
            return;
        }

        // Animation: Shift right for existing elements
        const cells = document.querySelectorAll('.array-cell');
        for (let i = ARRAY_SIZE - 2; i >= index; i--) {
            if (cells[i]) {
                // Apply a temporary CSS class for visual shift animation
                cells[i].style.transform = 'translateX(55px)'; 
            }
        }
        
        // Use standard array shift logic
        codeArray.splice(index, 0, value);
        // Ensure array size remains constant by removing the last element
        if (codeArray.length > ARRAY_SIZE) {
            codeArray.pop();
        }

        // Delay DOM update to allow animation to play
        setTimeout(() => {
            renderArray();
            setFeedback(`SUCCESS: Inserted ${value} at index ${index}!`, 'success');
        }, 500);

        insertIndexInput.value = '';
        insertValueInput.value = '';
    }

    // Delete at Index (Task 2: Shift left)
    function handleDelete() {
        const index = parseInt(deleteIndexInput.value);

        if (isNaN(index) || index < 0 || index >= ARRAY_SIZE || codeArray[index] === null) {
            setFeedback("Error: Invalid index or cell is already empty.", 'error');
            return;
        }

        const deletedValue = codeArray[index];
        
        // Animation: Shrink and fade the deleted number
        const deletedCell = document.querySelector(`.array-cell[data-index="${index}"]`);
        if (deletedCell) {
            deletedCell.style.transform = 'scale(0.1)';
            deletedCell.style.opacity = '0';
        }

        // Use standard array splice to delete and shift left
        codeArray.splice(index, 1);
        // Pad the end with null to maintain fixed size
        codeArray.push(null);
        
        // Animation: Shift left for subsequent elements
        const cells = document.querySelectorAll('.array-cell');
        for (let i = index + 1; i < ARRAY_SIZE; i++) {
            if (cells[i]) {
                 // Apply a temporary CSS class for visual shift animation
                cells[i].style.transform = 'translateX(-55px)'; 
            }
        }

        // Delay DOM update to allow animation to play
        setTimeout(() => {
            renderArray();
            setFeedback(`SUCCESS: Deleted ${deletedValue} at index ${index}.`, 'success');
        }, 500);

        deleteIndexInput.value = '';
    }

    // Search for Pattern (Task 2: Linear Search for Subarray)
    async function handleSearch() {
        const patternString = searchPatternInput.value.trim();
        if (!patternString) {
            setFeedback("Error: Enter a valid pattern (e.g., 1,2,3).", 'error');
            return;
        }

        // Convert pattern string (e.g., "2,1,4") to an array of numbers
        const pattern = patternString.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        const patternLength = pattern.length;

        if (patternLength === 0) {
            setFeedback("Error: Pattern is invalid or empty.", 'error');
            return;
        }
        
        setFeedback(`Searching for pattern: [${pattern.join(',')}]...`);
        const cells = document.querySelectorAll('.array-cell');
        let foundMatch = false;

        // Iterate through the array to check all possible starting positions
        for (let i = 0; i <= codeArray.length - patternLength; i++) {
            let match = true;
            
            // Animation: Highlight the segment being checked
            for (let k = 0; k < patternLength; k++) {
                cells[i + k].classList.add('highlight-check');
            }
            await new Promise(r => setTimeout(r, 400)); // Pause for animation

            // Check if the subarray matches the pattern
            for (let j = 0; j < patternLength; j++) {
                if (codeArray[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }

            // Animation: Remove highlight
            for (let k = 0; k < patternLength; k++) {
                cells[i + k].classList.remove('highlight-check');
            }
            
            if (match) {
                foundMatch = true;
                // Animation: Final success highlight
                for (let k = 0; k < patternLength; k++) {
                    cells[i + k].classList.add('highlight-match');
                }
                setFeedback(`PATTERN FOUND at index ${i}! Code segment matched.`, 'success');
                break; // Stop searching after first match
            }

            await new Promise(r => setTimeout(r, 100)); // Brief pause between checks
        }

        if (!foundMatch) {
            setFeedback("Search failed: Pattern not found in the array.", 'error');
        } else {
             // Check if the found pattern is the secret one (Task Extra 1)
            if (pattern.join(',') === secretPattern.join(',')) {
                setFeedback(`LEVEL COMPLETE! You cracked the vault code: [${secretPattern.join(',')}].`, 'success');
                targetPatternDisplay.textContent = secretPattern.join(',');
                targetPatternDisplay.style.color = '#33ff66';
            }
        }
        searchPatternInput.value = '';
    }
    
    // Hint Function (Task Extra 1 - Reveals the secret pattern)
    function handleHint() {
        targetPatternDisplay.textContent = secretPattern.join(', ');
        setFeedback("HINT: Secret pattern revealed. Now, insert the digits to match it!", 'success');
    }

    // --- EVENT LISTENERS ---
    insertBtn.addEventListener('click', handleInsert);
    deleteBtn.addEventListener('click', handleDelete);
    searchBtn.addEventListener('click', handleSearch);
    resetBtn.addEventListener('click', resetGame);
    hintBtn.addEventListener('click', handleHint);

    // Initial setup
    resetGame();
});