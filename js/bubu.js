//vom folosi un vector pentru a pastra toate intrebarile pentru QUIZ
(function() {
  const myQuestions = [
    {
      question: "Who was P.O.T.M in December?",
      answers: {
        a: "Aubameyang",
        b: "Hazard",
        c: "van Dijk"
      },
      correctAnswer: "c"
    },
    {
      question: "What team Aubameyang plays for?",
      answers: {
        a: "Tottenham",
        b: "Liverpool",
        c: "Arsenal"
      },
      correctAnswer: "c"
    },
    {
      question: "Which player got G.O.T.M in October?",
      answers: {
        a: "Lucas Moura",
        b: "Ramsey",
        c: "Townsend"
      },
      correctAnswer: "b"
    }
  ];

  function buildQuiz() {
    
    const output = [];

    // pentru fiecare intrebare
    myQuestions.forEach((currentQuestion, questionNumber) => {
    // stocăm lista opțiunilor de răspuns
      const answers = [];

      // pentru fiecare răspuns disponibil
      for (letter in currentQuestion.answers) {
        // Adaugam un buton HTML
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // adaugam intrebare si raspunsurile sale la iesire
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // selectam toate clasele din HTML cu denumirea 'answer'
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // raspunsurile utilizatorilor
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      // gasim raspunsul utilizatorilor
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // daca raspunsul este gresit sau nu s-a dat niciun raspuns
        // coloram cu rosu
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // numarul total de raspunsuri corecte
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide"); 
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // aratam rezultatele
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();