var listHolder = document.getElementById('list-holder');
var grandTotal = 0;
var indexNum = 0;

sessionStorage.setItem('grandTotal', grandTotal);

function addNewItem() {
  indexNum++;
  var createDiv = document.createElement('div');
  createDiv.classList.add('item-list');

  var createInput1 = document.createElement('input');
  createInput1.setAttribute('id', `amountInput${indexNum}`);
  createInput1.setAttribute('type', `number`);
  createInput1.setAttribute('placeholder', `Amount`);

  var createInput2 = document.createElement('input');
  createInput2.setAttribute('id', `qtyInput${indexNum}`);
  createInput2.setAttribute('type', `number`);
  createInput2.setAttribute('placeholder', `Quantity`);

  var createP = document.createElement('p');
  createP.setAttribute('id', `subtotal${indexNum}`);
  createP.innerHTML = '0';

  listHolder.appendChild(createDiv);
  createDiv.appendChild(createInput1);
  createDiv.appendChild(createInput2);
  createDiv.appendChild(createP);

  // createInput1.addEventListener('change', () => doSubTotalCalc(indexNum));
  // createInput2.addEventListener('change', () => doSubTotalCalc(indexNum));

  createInput1.onchange = doSubTotalCalc;
  createInput2.onchange = doSubTotalCalc;
}

function doSubTotalCalc() {
  console.log(this.parentNode);
  var childNodes = this.parentNode.childNodes;

  childNodes[2].innerHTML =
    childNodes[0].valueAsNumber * childNodes[1].valueAsNumber;

  grandTotalCalc();

  // subtotal = document.getElementById(`subtotal${index}`);
  // amountInput = document.getElementById(`amountInput${index}`);
  // qty = document.getElementById(`qtyInput${index}`);

  // subtotal.value = Number(amountInput.value) + Number(qty.value);
}

function grandTotalCalc() {

  var child = listHolder.childNodes;
  var total = 0;

  for (var i = 0; i < child.length; i++) {
    console.log(child[i].childNodes[1])
    var test = Number(child[i].childNodes[2].innerHTML);
    total += test;
  }

  grandTotal = total;
  sessionStorage.setItem('grandTotal', grandTotal);
  console.log(grandTotal);

  document.getElementById('amount').innerHTML = `RM ${grandTotal}`;
}
