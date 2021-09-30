var amountInput = document.getElementById('amountInput');
var qtyInput = document.getElementById('qtyInput');
var item1Total = document.getElementById('item1Total');

var amountTwoInput = document.getElementById('amountInput');
var qtyTwoInput = document.getElementById('qtyInput');
var item1Total = document.getElementById('item1Total');

var invoiceHolder = document.getElementById('list-holder');

localStorage.setItem('grandTotal', 0);
var grandTotal = localStorage.getItem('grandTotal') 
console.log( grandTotal );

function calItemOne() {
    var subTotal = amountInput.value * qtyInput.value;
    console.log(subTotal)
    item1Total.innerHTML = subTotal;
}

function doCal() {
    console.log(amountInput.value + qtyInput.value);
}

function addNew() {

    var itemHolderEle = document.createElement('div');
    itemHolderEle.classList.add('list');

    var itemEle = document.createElement('input');
    itemEle.onchange = validation;

    var qtyEle = document.createElement('input');
    qtyEle.onchange = validation;
    
    var subTotalEle = document.createElement('p');
    subTotalEle.innerHTML = 0;
    
    itemHolderEle.append(itemEle);
    itemHolderEle.append(qtyEle);
    itemHolderEle.append(subTotalEle);

    invoiceHolder.append(itemHolderEle)
}

function validation() {
    console.log(this.parentNode);
    var listNode = this.parentNode;
    var inputList = listNode.querySelectorAll('input');
    var subTotal = inputList[0].value * inputList[1].value;

    listNode.querySelector('p').innerHTML = subTotal;

    grandTotal += subTotal;
    console.log('GandTotal....', grandTotal);
}

