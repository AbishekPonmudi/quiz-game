const questions = [
    {
        question: "Cutting emissions in all areas needs new technologies. Select one or more of the following:",
        options: [
            "Better electric vehicle batteries",
            "Roads made of solar panels",
            "Sustainable fuel for planes",
            "Carbon capture from factories"
        ],
        correctAnswer: "Sustainable fuel for planes"
    },
    {
        question: "Transport is the fastest-growing CO2 emissions problem. What is your policy?",
        options: [
            "Ban all global sales of traditional cars by 2035 and invest in electric cars.",
            "Invest in electric cars and make traditional car engines more efficient.",
            "Invest in self-driving car pooling to cut congestion.",
            "Promote high-speed rail networks to reduce long-distance car travel."
        ],
        correctAnswer: "Ban all global sales of traditional cars by 2035 and invest in electric cars."
    },
    {
        question: "Buildings and construction make up almost one-third of energy use. What will you do?",
        options: [
            "Ban global coal and oil boiler sales by 2025 and roll out heat pumps.",
            "Improve efficiency standards for cooling and other appliances.",
            "Replace poorly insulated homes with highly efficient equivalents.",
            "Subsidize research into zero-energy buildings."
        ],
        correctAnswer: "Replace poorly insulated homes with highly efficient equivalents."
    },
    {
        question: "Industry causes about a quarter of energy-related CO2 emissions. What do you want to do first?",
        options: [
            "Ban all disposable coffee cups and start a recycling campaign.",
            "Demand that 40% of steel and 15% of plastics come from recycled materials by 2030.",
            "Give financial incentives for recycling small electronics.",
            "Introduce a carbon tax for heavy industries."
        ],
        correctAnswer: "Demand that 40% of steel and 15% of plastics come from recycled materials by 2030."
    },
    {
        question: "How do you plan to reduce global CO2 emissions from agriculture?",
        options: [
            "Invest in plant-based food technology.",
            "Encourage organic farming practices.",
            "Develop lab-grown meat to reduce livestock farming.",
            "Introduce stricter regulations on pesticide use."
        ],
        correctAnswer: "Develop lab-grown meat to reduce livestock farming."
    },
    {
        question: "Global renewable energy sources are expanding, but coal is still a major issue. What will you do?",
        options: [
            "Ban new coal power plants globally.",
            "Introduce a carbon tax on coal usage.",
            "Subsidize renewable energy projects to replace coal.",
            "Offer tax incentives to companies that reduce their coal dependency."
        ],
        correctAnswer: "Subsidize renewable energy projects to replace coal."
    },
    {
        question: "How will you handle deforestation and the loss of biodiversity?",
        options: [
            "Enforce stricter logging laws globally.",
            "Promote large-scale reforestation programs.",
            "Introduce fines for illegal deforestation.",
            "Launch awareness campaigns about the importance of biodiversity."
        ],
        correctAnswer: "Promote large-scale reforestation programs."
    },
    {
        question: "Waste management is a significant environmental challenge. What will be your priority?",
        options: [
            "Invest in waste-to-energy conversion technologies.",
            "Ban single-use plastics worldwide.",
            "Incentivize recycling and composting.",
            "Mandate product labeling to indicate recyclability."
        ],
        correctAnswer: "Incentivize recycling and composting."
    },
    {
        question: "Air pollution is a major contributor to global warming. What would be your approach?",
        options: [
            "Subsidize electric public transport.",
            "Introduce stricter emission standards for factories.",
            "Plant more urban forests to absorb pollutants.",
            "Phase out coal-fired power plants by 2030."
        ],
        correctAnswer: "Subsidize electric public transport."
    },
    {
        question: "Water scarcity is becoming an increasing issue. How will you address it?",
        options: [
            "Invest in desalination technology.",
            "Mandate water recycling in all urban areas.",
            "Educate the public on water conservation.",
            "Improve irrigation efficiency in agriculture."
        ],
        correctAnswer: "Educate the public on water conservation."
    }
];


// Array of colors for the background
const backgroundColors = [
    "#3D79F2",
    "#66ff66", // Darker green
    "#6666ff", // Darker blue
    "#ffff66", // Darker yellow
];

let currentQuestionIndex = 0;
let totalPoints = 0; // Total points for scoring
let correctAnswers = 0; // Count of correct answers
let totalQuestions = questions.length; // Total number of questions

function loadQuestion() {
    const questionElement = document.getElementById('question-text');
    const optionButtons = Array.from(document.querySelectorAll('.answer'));
    const answerBox = document.querySelector('.answer-box');
    const currentQuestion = questions[currentQuestionIndex];

    // Set the current question text
    questionElement.textContent = currentQuestion.question;

    // Shuffle options
    const shuffledOptions = currentQuestion.options.sort(() => Math.random() - 0.5);

    // Clear previous buttons and reset styles
    optionButtons.forEach(button => {
        button.textContent = "";
        button.style.backgroundColor = ""; 
        button.style.color = ""; 
        button.disabled = false; 
    });

    // Set random background color and image
    document.body.style.backgroundColor = getRandomColor();
    document.body.style.backgroundImage = "url('https://quizi.vercel.app/play_bg.webp')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Set button layout
    answerBox.style.display = 'flex';
    answerBox.style.flexWrap = 'wrap';

    optionButtons.forEach((btn, index) => {
        btn.textContent = shuffledOptions[index];
        btn.style.width = (window.innerWidth <= 600) ? '100%' : '48%';

        btn.onclick = () => handleAnswer(btn, currentQuestion.correctAnswer, optionButtons);
    });
}

function getRandomColor() {
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}

function handleAnswer(selectedButton, correctAnswer, optionButtons) {
    const isCorrect = selectedButton.textContent === correctAnswer;

    selectedButton.style.backgroundColor = isCorrect ? "green" : "red"; 
    selectedButton.style.color = "white";

    // Update points and correct answers count
    if (isCorrect) {
        totalPoints += 10; // Award points for correct answer
        correctAnswers++;
    } else {
        totalPoints -= 2; // Deduct points for incorrect answer
    }

    // Disable all buttons and show the correct answer
    optionButtons.forEach(b => {
        b.disabled = true;
        if (b.textContent === correctAnswer) {
            b.style.backgroundColor = "green"; 
            b.style.color = "white"; 
        }
    });

    // Load the next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResultSummary();
        }
    }, 1000); 
}
function showResultSummary() {
    const percentage = (totalPoints / (totalQuestions * 10)) * 100;
    const awarded = percentage >= 60 ? "Granted" : "Not Granted";
    const landUseStatus = percentage >= 50 ? "Granted" : "Not Granted";
    const sectorTrackerStatus = percentage >= 85 ? "Granted" : "Not Granted";

    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-summary';
    resultContainer.innerHTML = `
        <h2>Result Summary</h2>
        <hr>
        <p>Summary round one 2022-2025</p>
        <p class="summary-points">Collected Points: ${totalPoints}</p>
        <p class="summary-percentage">Your Percentage to Save Earth: ${percentage.toFixed(2)}%</p>
        <hr>
        <div class="result-item">
            <span class="box ${awarded === 'Granted' ? 'green-box' : 'red-box'}">
                <img src="${awarded === 'Granted' ? '../asset/tick.png' : '../asset/wrong.png'}" alt="Status" class="status-icon" />
            </span>
            <div class="result-content">
                <strong>Award:</strong> A green future creates new opportunities. You won an award for protecting nature — one of two available in round one.
            </div>
        </div>
        <div class="result-item">
            <span class="box ${landUseStatus === 'Granted' ? 'green-box' : 'red-box'}">
                <img src="${landUseStatus === 'Granted' ? '../asset/tick.png' : '../asset/wrong.png'}" alt="Status" class="status-icon" />
            </span>
            <div class="result-content">
                <strong>Land use:</strong> Way to go! Your bold move to reduce deforestation and plant millions of trees is on the right track.
            </div>
        </div>
        <div class="result-item">
            <span class="box ${sectorTrackerStatus === 'Granted' ? 'green-box' : 'red-box'}">
                <img src="${sectorTrackerStatus === 'Granted' ? '../asset/tick.png' : '../asset/wrong.png'}" alt="Status" class="status-icon" />
            </span>
            <div class="result-content">
                <strong>Sector tracker:</strong> Based on your decisions, you are off track for this sector.
            </div>
        </div>
        <div class="button-container">
            <button class="restart-button">Restart</button>
            <button class="exit-button">Exit</button>
        </div>
    `;

    document.body.innerHTML = ''; // Clear existing content
    document.body.appendChild(resultContainer);

    // Add event listeners for buttons
    document.querySelector('.restart-button').onclick = () => {
        window.location.href = 'index.html';
    };

    document.querySelector('.exit-button').onclick = () => {
        window.location.href = '../Maindash/index.html';
    };
}

// Function to show the pop-up
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup show'; // Use 'show' class for visibility
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-btn">&times;</button>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    const closeButton = popup.querySelector('.close-btn');
    closeButton.onclick = () => {
        popup.remove();
    };

    // Remove the pop-up after 5 seconds
    setTimeout(() => {
        popup.remove();
    }, 5000);
}


// Load the first question when the page loads
loadQuestion();

// Adjust layout on window resize
window.addEventListener('resize', loadQuestion);