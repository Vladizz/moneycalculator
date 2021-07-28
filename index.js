const inputName = document.querySelector('.goal-name');
const inputAmount = document.querySelector('.amount');
const inputDate = document.querySelector('.date');
const inputInitialPayment = document.querySelector('.initial-payment');
const inputInterest = document.querySelector('.interest');
const addButton = document.querySelector('.btn-add');
const replenishmentPercentage = document.querySelector('.replenishment-percentage');
const boxForm = document.querySelector('.box-form');
const forInsertBefore = document.querySelector('.for-insert-before');
const alertNoData = document.createElement('h2');
alertNoData.classList.add('alert-message');
const alertWrongDigits = document.createElement('h2');
alertWrongDigits.classList.add('alert-message');
const minDate = document.querySelector('.date');
minDate.min = new Date().toISOString().split('T')[0];

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return (
    `${s4()
    + s4()
    }-${s4()
    }-${s4()
    }-${s4()
    }-${s4()
    }${s4()
    }${s4()}`
  );
};

function searchInAnArray(array, id) {
  const data = array.find((el) => el.id === id);
  inputName.value = data.name;
  inputAmount.value = data.amount;
  inputDate.value = data.date;
  inputInitialPayment.value = data.payment;
  inputInterest.value = data.interest;
}

const boxText = document.querySelector('.box-text');
const massivFromFirstBlock = [];
function getUserData() {
  const userData = {
    id: guid(),
    name: inputName.value,
    amount: inputAmount.value.replace(/[^0-9.]/g, ''),
    date: inputDate.value,
    payment: inputInitialPayment.value.replace(/[^0-9.]/g, ''),
    interest: inputInterest.value.replace(/[^0-9.]/g, ''),
    monthsNumber: Math.ceil(
      moment(inputDate.value).diff(moment(), 'months', true),
    ),
  };
  return userData;
}

function zeroingForm() {
  inputName.value = '';
  inputAmount.value = '';
  inputDate.value = '';
  inputInitialPayment.value = '';
  inputInterest.value = '';
  replenishmentPercentage.innerText = '';
}

function showMyGoal(goal) {
  const goalElDiv = document.createElement('div');
  goalElDiv.classList.add('goal');

  const editButton = document.createElement('button');
  editButton.classList.add('btn-edit');

  const editPic = document.createElement('img');
  editPic.src = 'images/edit-btn.svg';
  editPic.classList.add('edit-img');

  editButton.append(editPic);

  const myGoalMetrics = document.createElement('div');
  myGoalMetrics.classList.add('text-goal');

  const nameP = document.createElement('h3');
  nameP.classList.add('p-design');
  nameP.innerText = `Ваша цель: ${goal.name}`;

  const amountP = document.createElement('p');
  amountP.classList.add('p-design');
  amountP.innerText = `Требуемая сумма: ${numberWithSpaces(goal.amount)}`;

  const dateP = document.createElement('p');
  dateP.classList.add('p-design');
  dateP.innerText = `Срок: ${goal.date}`;

  const paymentP = document.createElement('p');
  paymentP.classList.add('p-design');
  paymentP.innerText = `Стартовая сумма: ${numberWithSpaces(goal.payment)}`;

  const interestP = document.createElement('p');
  interestP.classList.add('p-design');
  interestP.innerText = `Процент: ${numberWithSpaces(goal.interest)}`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete');

  const deletePic = document.createElement('img');
  deletePic.src = 'images/delete-btn.svg';
  deletePic.classList.add('delete-img');

  const percentage = document.createElement('h3');
  percentage.classList.add('p-design');
  percentage.innerText = `Сумма ежемесячного платежа: ${numberWithSpaces(goal.resultMonthlyPayment.toFixed(2))}`;
  console.log(goal.resultMonthlyPayment);

  deleteButton.append(deletePic);
  goalElDiv.append(editButton);
  goalElDiv.append(myGoalMetrics);
  myGoalMetrics.append(nameP);
  myGoalMetrics.append(amountP);
  myGoalMetrics.append(dateP);
  myGoalMetrics.append(paymentP);
  myGoalMetrics.append(interestP);
  myGoalMetrics.append(percentage);
  goalElDiv.append(deleteButton);
  boxText.append(goalElDiv);

  editButton.addEventListener('click', () => {
    searchInAnArray(massivFromFirstBlock, goal.id);
    goalElDiv.remove();
    changeOfValue(goal);
  });

  deleteButton.addEventListener('click', () => {
    goalElDiv.remove();
    const dataIndex = massivFromFirstBlock.findIndex((el) => el.id === goal.id);
    massivFromFirstBlock.slice(dataIndex, 1);
  });
}

function checkEmptylInputs(data) {
  if (data.name !== '' && data.amount !== '' && !isNaN(data.monthsNumber) && data.payment !== '' && data.interest !== '') {
    return true;
  }
  return false;
}

function checkNegativeDigitalInputs(data) {
  if (data.amount > 0 && data.payment >= 0 && data.interest > 0 && data.interest <= 100) {
    return true;
  }
  return false;
}

function outputScreenWithout(data) {
  if (!isNaN(data.amount) && !isNaN(data.date) && !isNaN(data.payment) && !isNaN(data.interest)) {
    return true;
  }
  return false;
}

addButton.addEventListener('click', () => {
  const data = getUserData();
  if (!checkEmptylInputs(data)) {
    alertNoData.innerText = 'Введите значение';
    boxForm.insertBefore(alertNoData, forInsertBefore);
    return;
  }
  alertNoData.innerText = '';

  if (!checkNegativeDigitalInputs(data)) {
    alertWrongDigits.innerText = 'Введите норм цифры';
    boxForm.insertBefore(alertWrongDigits, forInsertBefore);
    return;
  }
  alertWrongDigits.innerText = '';
  changeOfValue(data);
  massivFromFirstBlock.push(data);

  showMyGoal(data);
  zeroingForm();
});

function sizeMonthlyReplenishment(data) {
  const requiredAmount = Number(data.amount);
  const term = Number(data.monthsNumber);
  const startingAmount = Number(data.payment);
  const depositInterest = Number(data.interest);
  let interestAmount = 0;
  for (let i = 1; i < term + 1; i += 1) {
    interestAmount += (1 + depositInterest / 100) ** i;
  }
  const sumPerMonth = (requiredAmount - ((1 + depositInterest / 100) ** term) * startingAmount) / interestAmount;
  return sumPerMonth;
}

function changeOfValue(data) {
  inputAmount.value = numberWithSpaces(data.amount);
  inputDate.value = data.date;
  inputInitialPayment.value = numberWithSpaces(data.payment);
  inputInterest.value = numberWithSpaces(data.interest);
  console.log(data);
  if (!outputScreenWithout(data)) {
    data.resultMonthlyPayment = sizeMonthlyReplenishment(data);
    console.log(data.resultMonthlyPayment);
    replenishmentPercentage.innerText = numberWithSpaces(data.resultMonthlyPayment.toFixed(2));
  }
}

inputAmount.addEventListener('input', () => {
  changeOfValue(getUserData());
});

inputDate.addEventListener('input', () => {
  changeOfValue(getUserData());
});

inputInitialPayment.addEventListener('input', () => {
  changeOfValue(getUserData());
});

inputInterest.addEventListener('input', () => {
  changeOfValue(getUserData());
});

function numberWithSpaces(str) {
  const parts = str.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}
