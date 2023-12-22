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
    const totalBalance = parseInt(this.budgetAmount.textContent) - expense; // se parsea el string a number
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

  }

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
  }

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
      this.expenseInput.value = '';
      this.amountInput.value = '0';

      //se crea un objeto gasto
      let gasto = {
        id: this.itemID,
        title: expenseConcept,
        amount: amount,
      }

      this.itemID++; // genera el indice para cada elem insertado en el itemList
      this.itemList.push(gasto); //se agrega elem al itemList
      this.addExpense(gasto); // agrega las props del elem registro
      this.showBalance();

      console.log( "itemList", this.itemList )

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
     <a href="#" class="edit-icon" data-id="${ gasto.id }">
      <span>✏️</span>
     </a>
     <a href="#" class="delete-icon" data-id="${ gasto.id }">
      <span>🗑️</span>
     </a>
    </div>
    
   </div>
    `;
    this.expenseList.appendChild(itemGasto)
  }

  editExpense(elem) {

    let id = parseInt( elem.dataset.id ) // 1.
    let parent = elem.parentElement.parentElement.parentElement; // 2.

    this.expenseList.removeChild( parent ) // 3.

    let itemGasto = this.itemList.filter( function(item) { // 4.
      return item.id === id; 
    })

    this.expenseInput.value = itemGasto[0].title // 5.
    this.amountInput.value  = itemGasto[0].amount

    let temporalList = this.itemList.filter( function(item) { // 6.
      return item.id !== id;
    })
    this.itemList = temporalList;

    console.log( itemGasto )

    // 1. Toma el valor del attr 'data-id' del elemento que es una cadena y la parsea a un numero
    // 2. Desde el nodo hijo se desplaza de manera jerarquica a traves de los nodos padres
    // 3. Elimina el elemento (nodo) del arbol DOM
    // 4. Compara el 'id' del objeto fitrado del arr con el 'id' del nodo y retorna un nuevo arr con ese objeto
    // 5. Asigna y muestra en los inputs los valores de 'itemGasto' traidos de la matriz 'itemList' 
  }

  deleteExpense(elem) {
    console.log("Eliminar")
  }


}; //END - UI CLASS

//LISTENERS PARA LOS BOTONES
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
  })

  // expense form submit 
  expenseForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    ui.submitExpenseForm();
  })

  // expense click
  expenseList.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(evt.target.parentElement)
    } else if (evt.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(evt.target.parentElement)
    }

  })


}

document.addEventListener('DOMContentLoaded', () => {
  evenListeners()
})
