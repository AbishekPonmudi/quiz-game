const questions = [
    {
        question: "Cutting emissions in all areas needs new technologies. Select one or more of the following:",
        options: [
            { text: "Better electric vehicle batteries", points: -5 },
            { text: "Roads made of solar panels", points: -7 },
            { text: "Sustainable fuel for planes", points: 8 },  // Correct answer
            { text: "Carbon capture from factories", points: -6 }
        ]
    },
    {
        question: "Transport is the fastest-growing CO2 emissions problem. What is your policy?",
        options: [
            { text: "Ban all global sales of traditional cars by 2035 and invest in electric cars.", points: 10 },
            { text: "Invest in electric cars and make traditional car engines more efficient.", points: -2 },
            { text: "Invest in self-driving car pooling to cut congestion.", points: 5 }
        ]
    },
    {
        question: "Buildings and construction make up almost one-third of energy use. What will you do?",
        options: [
            { text: "Ban global coal and oil boiler sales by 2025 and roll out heat pumps.", points: -2 },
            { text: "Improve efficiency standards for cooling and other appliances.", points: -1 },
            { text: "Replace poorly insulated homes with highly efficient equivalents.", points: 5 }
        ]
    },
    {
        question: "Industry causes about a quarter of energy-related CO2 emissions. What do you want to do first?",
        options: [
            { text: "Ban all disposable coffee cups and start a recycling campaign.", points: -1 },
            { text: "Demand that 40% of steel and 15% of plastics come from recycled materials by 2030.", points: 5 },
            { text: "Give financial incentives for recycling small electronics.", points: 2 }
        ]
    },
    {
        question: "How do you plan to reduce global CO2 emissions from agriculture?",
        options: [
            { text: "Invest in plant-based food technology.", points: -7 },
            { text: "Encourage organic farming practices.", points: -4 },
            { text: "Develop lab-grown meat to reduce livestock farming.", points: 8 }
        ]
    },
    {
        question: "Global renewable energy sources are expanding, but coal is still a major issue. What will you do?",
        options: [
            { text: "Ban new coal power plants globally.", points: -10 },
            { text: "Introduce a carbon tax on coal usage.", points: -6 },
            { text: "Subsidize renewable energy projects to replace coal.", points: 8 }
        ]
    },
    {
        question: "How will you handle deforestation and the loss of biodiversity?",
        options: [
            { text: "Enforce stricter logging laws globally.", points: -7 },
            { text: "Promote large-scale reforestation programs.", points: 9 },
            { text: "Introduce fines for illegal deforestation.", points: -6 }
        ]
    },
    {
        question: "Waste management is a significant environmental challenge. What will be your priority?",
        options: [
            { text: "Invest in waste-to-energy conversion technologies.", points: -8 },
            { text: "Ban single-use plastics worldwide.", points: -10 },
            { text: "Incentivize recycling and composting.", points: 6 }
        ]
    },
    {
        question: "Air pollution is a major contributor to global warming. What would be your approach?",
        options: [
            { text: "Subsidize electric public transport.", points: 8 },
            { text: "Introduce stricter emission standards for factories.", points: -6 },
            { text: "Plant more urban forests to absorb pollutants.", points: -7 }
        ]
    },
    {
        question: "Water scarcity is becoming an increasing issue. How will you address it?",
        options: [
            { text: "Invest in desalination technology.", points: -9 },
            { text: "Mandate water recycling in all urban areas.", points: -7 },
            { text: "Educate the public on water conservation.", points: 5 }
        ]
    }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Function to simulate a random loading time of 2 or 1 second
function simulateLoading() {
    const loadingTime = Math.random() < 0.5 ? 2000 : 1000;  // Randomly choose 2s or 1s
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');  // Hide loading screen
        document.getElementById('quiz-container').classList.remove('hidden');  // Show quiz container
        loadQuestion();
    }, loadingTime);
}

// Function to load the current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.question;

    // Populate the options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.classList.add('option-btn');
        btn.onclick = () => handleAnswer(option.points);
        optionsContainer.appendChild(btn);
    });
}

// Function to handle answer and move to the next question
function handleAnswer(points) {
    // Update score based on the selected option
    score += points;

    // Update the progress tracker to reflect the answered question
    const progressCircles = document.querySelectorAll('.progress-circle');
    if (currentQuestionIndex < progressCircles.length) {
        progressCircles[currentQuestionIndex].classList.add('completed');
    }

    nextQuestion();
}

// Function to go to the next question or end the quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        changeBackgroundColor();  // Change background color only with next question
        loadQuestion();
    } else {
        // Quiz is finished, show the result
        showResult();
    }
}

// Function to show the result after finishing the quiz
function showResult() {
    document.getElementById('quiz-container').innerHTML = `
        <h2>Your score is ${score} points out of ${questions.length * 10}</h2>
        <button class="retry-btn" onclick="retryQuiz()">Retry Quiz</button>
    `;
}

// Function to retry the quiz
function retryQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}

// Function to change background color only for the next question
function changeBackgroundColor() {
    const body = document.querySelector('body');
    body.style.transition = 'background-color 1s';  // Smooth transition
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.backgroundColor = randomColor;
}

// Simulate loading screen
simulateLoading();
