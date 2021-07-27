const inputName = document.querySelector('.goal-name');
const inputAmount = document.querySelector('.amount');
const inputDate = document.querySelector('.date');
const inputInitialPayment = document.querySelector('.initial-payment');
const inputInterest = document.querySelector('.interest');
const addButton = document.querySelector('.btn-add');
// const textGoal = document.querySelector('.text-goal');
// const editBtn = document.querySelector('.btn-edit');
// const deleteBtn = document.querySelector('.btn-delete');

const boxText = document.querySelector('.box-text')

const massivFromFirstBlock = [];

function getUserData () {

  const userData  = {
      name: inputName.value,
      amount: inputAmount.value,
      date: inputDate.value,
      payment: inputInitialPayment.value,
      interest: inputInterest.value
    };

  console.log(massivFromFirstBlock);

  return userData
}

addButton.addEventListener('click', () => {

  const data = getUserData()

  massivFromFirstBlock.push(data);

  showMyGoal(data)

  getUserData();
  inputName.value ="";
  inputAmount.value ="";
  inputDate.value ="";
  inputInitialPayment.value ="";
  inputInterest.value ="";
});

function showMyGoal (goal) {
  let goalElDiv = document.createElement('div')
  goalElDiv.classList.add('goal')

  let editButton = document.createElement('button')
  editButton.classList.add('btn-edit')
  let editPic = document.createElement('img')
  editPic.src = 'images/edit-btn.svg'
  editPic.classList.add('edit-img')
  
  editButton.append(editPic)

  let myGoalMetrics = document.createElement('div')
  myGoalMetrics.classList.add('text-goal')
  let nameP = document.createElement('h3')
  nameP.classList.add('p-design')
  nameP.innerText = `Ваша цель: ${goal.name}`
  let amountP = document.createElement('p')
  amountP.classList.add('p-design')
  amountP.innerText = `Требуемая сумма: ${goal.amount}`
  let dateP = document.createElement('p')
  dateP.classList.add('p-design')
  dateP.innerText = `Срок: ${goal.date}`
  let paymentP = document.createElement('p')
  paymentP.classList.add('p-design')
  paymentP.innerText = `Стартовая сумма: ${goal.payment}`
  let interestP = document.createElement('p')
  interestP.classList.add('p-design')
  interestP.innerText = `Процент: ${goal.interest}`

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('btn-delete')
  let deletePic = document.createElement('img')
  deletePic.src = 'images/delete-btn.svg'
  deletePic.classList.add('delete-img')

  deleteButton.append(deletePic)

  goalElDiv.append(editButton)
  goalElDiv.append(myGoalMetrics)

  myGoalMetrics.append(nameP)
  myGoalMetrics.append(amountP)
  myGoalMetrics.append(dateP)
  myGoalMetrics.append(paymentP)
  myGoalMetrics.append(interestP)

  goalElDiv.append(deleteButton)

  boxText.append(goalElDiv)
}