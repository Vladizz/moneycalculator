const inputName = document.querySelector('.goal-name');
const inputAmount = document.querySelector('.amount');
const inputDate = document.querySelector('.date');
const inputInitialPayment = document.querySelector('.initial-payment');
const inputInterest = document.querySelector('.interest');
const addButton = document.querySelector('.btn-add');
const textGoal = document.querySelector('.text-goal');
const editBtn = document.querySelector('.btn-edit');
const deleteBtn = document.querySelector('.btn-delete');





const massivFromFirstBlock = [];

function getUserData () {

const userData  = {
    name: inputName.value,
    amount: inputAmount.value,
    date:inputDate.value,
    payment: inputInitialPayment.value,
    interest: inputInterest.value
  };

massivFromFirstBlock.push(userData);
console.log(massivFromFirstBlock);
}

addButton.addEventListener('click', () => {
    getUserData();
    inputName.value ="";
    inputAmount.value ="";
    inputDate.value ="";
    inputInitialPayment.value ="";
    inputInterest.value ="";
});

// console.log(massivFromFirstBlock);


      
    



