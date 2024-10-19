// Get the elements for the play button, popup, close button, and content
const playButton = document.getElementById('play-btn');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-btn');
const content = document.getElementById('content');
const newGameButton = document.querySelector('.new-game-btn'); // New Game button

// Get the slider and count display elements
const questionRange = document.getElementById('question-range');
const questionCountLeft = document.getElementById('question-count-left');
const currentQuestionCount = document.getElementById('current-question-count'); // New element for current count
const questionCountRight = document.getElementById('question-count-right');

// Function to open the popup
function openPopup() {
    popup.classList.remove('hidden'); // Show the popup
    popup.style.display = 'flex'; // Use flex to center it immediately
    content.style.filter = 'blur(8px)'; // Apply blur to the background content
    updateQuestionCount(); // Initialize the question count display when opening
}

// Function to close the popup
function closePopup() {
    popup.classList.add('hidden'); // Hide the popup
    popup.style.display = 'none'; // Ensure the popup is hidden
    content.style.filter = 'none'; // Remove blur from the background content
}

// Function to update the question count display
function updateQuestionCount() {
    const currentValue = parseInt(questionRange.value, 10); // Get current slider value
    questionCountLeft.textContent = currentValue; // Update left count display
    currentQuestionCount.textContent = currentValue; // Update current count display
}

// Function to setup event listeners
function setupEventListeners() {
    // Event listener for Play button
    playButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior if needed
        openPopup();
    });

    // Event listener for Close button
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior if needed
        closePopup();
    });

    // Event listener for slider changes
    questionRange.addEventListener('input', updateQuestionCount);

    // Event listener for New Game button
    newGameButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior if needed
        window.location.href = '../quiz_start/quiz_start.html'; // Redirect to the quiz_start.html
    });

    // Optionally, close the popup by clicking outside of the popup content
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup(); // Close popup if user clicks outside the popup content
        }
    });
}

// Initialize event listeners
setupEventListeners();

// Initialize the question count display
updateQuestionCount();
