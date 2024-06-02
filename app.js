let twoPointFive= document.querySelectorAll(".twoPfive");
let five = document.querySelectorAll(".five");
let ten = document.querySelectorAll(".ten");
let fifteen = document.querySelectorAll(".fifteen");
let twentyFive = document.querySelectorAll(".twentyFive");
let midtermScndTerm = document.querySelectorAll(".midtermScndTerm");
let fourty = document.querySelector(".fourty");
let submitBtn = document.querySelector("#submitBtn");
let firstTerm, secondTerm, finalExam, totalScore;
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input[required]");
let message;

form.addEventListener("submit", calculate);
document.addEventListener("click", function(e) {
  const failAlertBox = document.querySelector(".alert-box-failed");
  const successAlertBox = document.querySelector(".alert-box-success");
  if (e.target.textContent !== "SUBMIT") {
    if (failAlertBox !== null || successAlertBox !== null) {
      if (failAlertBox !== null) {
        if (!failAlertBox.contains(e.target)) {
          failAlertBox.remove();
        }
      } else if (successAlertBox !== null) {
        if (!successAlertBox.contains(e.target)) {
          successAlertBox.remove();
        }
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
    input.addEventListener('invalid', function() {
      this.setCustomValidity(`Please fill in this blank.
          
      If you haven't taken the exam, write 0.`);
    });

    input.addEventListener('input', function() {
      this.setCustomValidity('');
    });
  });

  form.addEventListener('submit', function(event) {
    inputs.forEach(input => {
      if (!input.value) {
        this.setCustomValidity(`Please fill in this blank.
          
        If you haven't taken the exam, write 0.`);
        input.reportValidity();
        event.preventDefault(); // Formun gönderilmesini engelle
      }
    });
  });
});


function calculate (e) {
  firstTerm = term1();
  secondTerm = term2();
  finalExam = final();
  totalScore = calculateTotal();
  compareFunction(totalScore);
  e.preventDefault();
}

function term1 () {
  let popGrades = [];
  let tenGrades = [];
  let fiveGrades = [];
  let midterm = 0; 
  let module = 0;

  for (let i=0;i<4;i++) {
    popGrades.push(parseFloat(twoPointFive[i].value));
  }
  for (let i=0;i<3;i++) {
    tenGrades.push(parseFloat(ten[i].value));
  }
  for (let i=0;i<4;i++) {
    fiveGrades.push(parseFloat(five[i].value));
  }
  if (fifteen[0].value !== "") {
    midterm = parseFloat(fifteen[0].value);
  } 
  if (twentyFive[0].value !== "") {
    module = parseFloat(twentyFive[0].value);
  }

  let popTotal = popGrades.reduce((x, y) => {
    return x + y;
  }, 0);
  let tenTotal = tenGrades.reduce((x, y) => {
    return x + y;
  }, 0);
  let fiveTotal = fiveGrades.reduce((x, y) => {
    return x + y;
  }, 0);

  let popEffect = popTotal*2.5/100;
  let tenEffect = tenTotal*10/100;
  let fiveEffect = fiveTotal*5/100;
  let midtermEffect = midterm*15/100;
  let moduleEffect = module*25/100;
  let totalGrade = parseInt(popEffect+tenEffect+fiveEffect+midtermEffect+moduleEffect);

  return totalGrade;
}

function term2 () {
  let popGrades = [];
  let tenGrades = [];
  let fiveGrades = [];
  let midterms = []; 

  for (let i=4;i<8;i++) {
    popGrades.push(parseFloat(twoPointFive[i].value));
  }
  for (let i=3;i<6;i++) {
    tenGrades.push(parseFloat(ten[i].value));
  }
  for (let i=4;i<8;i++) {
    fiveGrades.push(parseFloat(five[i].value));
  }
  for (let i=0;i<2;i++) {
    midterms.push(parseFloat(midtermScndTerm[i].value));
  }

  let popTotal = popGrades.reduce((x, y) => {
    return x + y;
  }, 0);
  let tenTotal = tenGrades.reduce((x, y) => {
    return x + y;
  }, 0);
  let fiveTotal = fiveGrades.reduce((x, y) => {
    return x + y;
  }, 0);
  let midtermTotal = midterms.reduce((x, y) => {
    return x + y;
  }, 0);

  let popEffect = popTotal*2.5/100;
  let tenEffect = tenTotal*10/100;
  let fiveEffect = fiveTotal*5/100;
  let midtermEffect = midtermTotal*20/100;

  let totalGrade = parseInt(popEffect+tenEffect+fiveEffect+midtermEffect);

  return totalGrade;
}

function final () {
  return parseFloat(fourty.value);
}

function calculateTotal () {
  let firstTermEffect = firstTerm*30/100;
  let secondTermEffect = secondTerm*30/100;
  let finalExamEffect = finalExam*40/100;

  return parseFloat(parseFloat(firstTermEffect+secondTermEffect+finalExamEffect).toFixed(2));
}

function compareFunction (score) {
  if (score < 60) {
    message = `YOU'VE FAILED!<br><br>First Term Score:&nbsp;&nbsp;&nbsp;${firstTerm}<br>Second Term Score:&nbsp;&nbsp;&nbsp;${secondTerm}<br> Your Total Score:&nbsp;&nbsp;&nbsp;${totalScore}`
    showAlert("failed", message);
  } 
  if (score >= 60){
    message = `YOU'VE SUCCEEDED!<br><br>First Term Score:&nbsp;&nbsp;&nbsp;${firstTerm}<br>Second Term Score:&nbsp;&nbsp;&nbsp;${secondTerm}<br> Your Total Score:&nbsp;&nbsp;&nbsp;${totalScore}`;
    showAlert("success", message);
  }
}

function showAlert (circums, message) {
  let alertBox = document.createElement("div");
  const failAlertBox = document.querySelector(".alert-box-failed");
  const successAlertBox = document.querySelector(".alert-box-success");

  alertBox.className = `alert-box-${circums}`;
  alertBox.innerHTML = message;
  if (failAlertBox === null && successAlertBox === null) {
    document.body.appendChild(alertBox);
  }
}