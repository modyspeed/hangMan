//section category
let section = {
  country: ["egypt", "ksa", "qatar", "england", "usa", "libya"],
  movies: ["thor", "up", "troy", "legend", "bahobaly"],
  people: ["mohamed ali", "sadat", "mohamed salah"],
  games: ["zooba", "anger of stick", "zombie", "pic"],
  series: ["got", "viking", "le casa de papel"],
};

let wordLetter;
let infoSpan = document.getElementById("section");
let category = document.querySelector(".section");
let letters = document.querySelector(".letters");
let pic = document.querySelector(".pic");
let word = [];
addCategoryToSpan();
addLetterToSpan();
// randomWord(section); //random word from section and create empty span = length of random word

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("category")) {
    e.target.classList.add("active");
    category.classList.add("chosen");
    infoSpan.innerHTML = e.target.innerHTML;
    let allWord = section[e.target.innerHTML.toLowerCase()];
    let randomWordIndex = Math.floor(Math.random() * allWord.length);
    let randomWordValue = allWord[randomWordIndex];

    wordLetter = Array.from(randomWordValue);

    emptySpan(randomWordValue); // create empty span = length of random word
    clicked(); //add class clicked to onclick btn
  }
});

function emptySpan(randomWord) {
  let guessWord = document.querySelector(".guessWord");
  let wordLetter = Array.from(randomWord);

  wordLetter.forEach((e) => {
    let emptySpan = document.createElement("span");
    emptySpan.classList.add("guessWord-box");
    if (e == " ") {
      emptySpan.classList.add("has-space");
      emptySpan.innerHTML = "-";
      word.push(emptySpan.innerHTML);
    }
    guessWord.appendChild(emptySpan);
  });
}
function addCategoryToSpan() {
  let keyFromSection = Array.from(Object.keys(section));
  for (let i = 0; i < keyFromSection.length; i++) {
    let categorySpan = document.createElement("span");
    categorySpan.classList.add("category", keyFromSection[i]);
    categorySpan.innerHTML = keyFromSection[i];
    category.appendChild(categorySpan);
  }
}
function addLetterToSpan() {
  // let letters = document.querySelector(".letters");
  for (let i = 65; i < 91; i++) {
    let letterSpan = document.createElement("span");
    letterSpan.innerHTML = String.fromCharCode(i).toLowerCase();
    letterSpan.classList.add("letter-box");
    letters.appendChild(letterSpan);
  }
}
function clicked() {
  let wrongCount = 0;

  document.addEventListener("click", (e) => {
    let letterStatus = false;
    if (e.target.classList == "letter-box") {
      e.target.classList.add("clicked");
      let clickedLetter = e.target.innerHTML;
      let emptySpanLetter = document.querySelectorAll(".guessWord span");

      wordLetter.forEach((letter, wordIndex) => {
        if (clickedLetter == letter) {
          letterStatus = true;
          word.push(clickedLetter);
          emptySpanLetter.forEach((span, spanIndex) => {
            if (wordIndex == spanIndex) {
              span.innerHTML = clickedLetter;
            }
          });
        }
      });
      if (letterStatus !== true) {
        wrongCount++;
        pic.classList.add(`wrong-${wrongCount}`);
        document.getElementById("false").play();
      } else {
        document.getElementById("true").play();
      }
      if (wrongCount == 6) {
        letters.classList.add("lose");

        status("lose");
      }
      if (word.length == emptySpanLetter.length) {
        status("win");
      }
    }
  });

  function status(winOrLose) {
    let div = document.createElement("div");
    div.classList = "popup";
    if (winOrLose == "win") {
      div.innerHTML = `you are win and number wrongCount  <span> ${wrongCount}</span>`;
      div.classList.add("winer");
      document.getElementById("win").play().reload;
    } else {
      div.innerHTML = `you are lose and answer is  <span> ${wordLetter.join(
        ""
      )}</span>`;
      div.classList.add("loser");
    }
    document.querySelector(".container").appendChild(div);

    let choose = document.createElement("div");
    choose.classList = "choose";

    let closeBtn = document.createElement("button");
    closeBtn.classList = "close";
    closeBtn.id = "close";
    closeBtn.innerText = "close";

    let newGameBtn = document.createElement("button");
    newGameBtn.classList = "newGameBtn";
    newGameBtn.id = "newGame";
    newGameBtn.innerText = "newGame";

    document.querySelector(".container").appendChild(div);
    choose.appendChild(closeBtn);
    choose.appendChild(newGameBtn);
    div.appendChild(choose);

    document.addEventListener("click", (e) => {
      if (e.target.classList == "close") {
        closeBtn.onclick(window.close());
      }
      if (e.target.classList == "newGameBtn") {
        newGameBtn.onclick(window.location.reload());
      }
    });
  }
}
