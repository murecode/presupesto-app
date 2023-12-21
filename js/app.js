class UI {

  constructor() {

    this.budgetFeedback  = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm      = document.getElementById("budget-form");
    this.budgetInput     = document.getElementById("budget-input");
    this.budgetAmount    = document.getElementById("budget-amount");
    this.expenseAmount   = document.getElementById("expense-amount");
    this.balance         = document.getElementById("balance");
    this.balanceAmount   = document.getElementById("balance-amount");
    this.expenseForm     = document.getElementById("expense-form");
    this.expenseInput    = document.getElementById("expense-input");
    this.amountInput     = document.getElementById("amount-input");
    this.expenseList     = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;

  };

  //Enviar formulario de presupesto
  submitBudgetForm() {

    const budgetValue = this.budgetInput.value;

    if (budgetValue === '' || budgetValue < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Valor no amitido</p>`;

      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 4000);

    } else {
      this.budgetAmount.textContent = budgetValue;
      this.amountInput.value = '';
      this.showBalance();
    }

  }

  //Mostrar balance
  showBalance() {

    const expense = this.totalExpense();
    const totalBalance = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = totalBalance;

    if (totalBalance < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if (totalBalance > 0) {
      this.balance.classList.remove('showRed');
      this.balance.classList.add('showGreen');
    }
    else if (totalBalance === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }

    console.log(totalBalance, "agregado al balance")

  };

  //Total de gastos
  totalExpense() {

    let total = 0;

    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, cur) => {
        console.log(`Total es ${acc} y el valor actual is ${cur.value}`, 0);
        acc += cur.amount;
        return acc;
      }, 0)
    };

    this.expenseAmount.textContent = total;
    return total;

  };

  //Enviar formulario de gastos
  submitExpenseForm() {

    const expenseConcept = this.expenseInput.value;
    const amountVal = this.amountInput.value;

    //muestra alerta si...
    if (expenseConcept === '' || amountVal <= 0 || amountVal === '') {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Los campos deben contener un valor<p/>`

      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 4000)

    } else {
      let amount = parseInt(amountVal);
      // this.expenseInput.value = '';
      // this.amountInput.value = '';

      //se crea un objeto gasto
      let gasto = {
        id: this.itemID,
        title: expenseConcept,
        amount: amount,
      }

      this.itemID++; // se incrementa su indice
      this.itemList.push(gasto); //se agrega objeto al array
      this.addExpense(gasto); // agrega las props del obj al registro
      this.showBalance();

      console.log(typeof expenseConcept)
      console.log(typeof amount)
      console.log(this.itemID);
      console.log(typeof gasto.title);
    }

  }

  //Crea el elem HTML con los registros de gastos
  addExpense(gasto) {

    const itemGasto = document.createElement('div');
    itemGasto.classList.add('expense');
    itemGasto.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${ gasto.title }</h6>
    <h5 class="expense-amount mb-0 list-item">${ gasto.amount }</h5>

    <div class="expense-icons list-item">
     <a href="#" class="edit-icon mx-2" data-id="">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="">
      <i class="fas fa-trash"></i>
     </a>
    </div>
    
   </div>
    `;

    this.expenseList.appendChild(itemGasto)
    console.log(this.itemList)

  }

}; //END - UI CLASS

//LISTENERS
function evenListeners() {
  const budgetForm  = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  //nueva instancia de la clase UI
  const ui = new UI();

  // budget form submit 
  budgetForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    ui.submitBudgetForm();
  });

  // expense form submit 
  expenseForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    ui.submitExpenseForm();
  });

  // expense click
  expenseList.addEventListener('click', (evt) => {
    evt.preventDefault();
    ui.addExpenseList();
  });

}

document.addEventListener('DOMContentLoaded', () => {
  evenListeners()
})
