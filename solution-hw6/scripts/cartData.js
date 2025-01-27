//class def
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}


//funcs
function calculatePrice(basePrice, glazing, packSize) {
  let finalPrice = (glazings.get(glazing) + basePrice) * packSizes.get(packSize);
  // from https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return finalPrice;
}

function createRollElement(roll) {
  //from: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_template
  var temp = document.querySelector("#cartItem");
  var clone = temp.content.cloneNode(true);
  
  let imgFile = rolls[roll.type].imageFile;
  // console.log('NewRoll: ' + roll.type)

  clone.querySelector('#templateImage').src = 'images/' + imgFile;
  clone.querySelector('#templateItemName').innerText = roll.type + ' Cinnamon Roll';
  clone.querySelector('#templateGlazingOption').innerText = 'Glazing: ' + roll.glazing;
  clone.querySelector('#templatePackSizeOption').innerText = 'Pack Size: ' + roll.size;
  clone.querySelector('#templateCalculatedPrice').innerText = '$' + calculatePrice(roll.basePrice, roll.glazing, roll.size).toFixed(2);

  let grandpa =  clone.querySelector('#templateRemoveButton').parentNode.parentNode
  clone.querySelector('#templateRemoveButton').addEventListener("click", () => {removeFromCart(roll, grandpa)})

  document.querySelector('#cartGroup').appendChild(clone);
}

function removeFromCart(roll, element) {
      //step 1 remove from cart
      removeFromStorage(roll);

      //step 2 remove from DOM
      element.remove();
  
      //step 3 update price
      updatePrice(); 
}

function updatePrice() {
  let totalPrice = 0;
  for(const roll of cart) {
    totalPrice = totalPrice + calculatePrice(roll.basePrice, roll.glazing, roll.size);
  }

  totalPrice = totalPrice.toFixed(2)
  document.querySelector('#totalPrice').innerText = '$' + totalPrice;
}

//instructions
const glazings = new Map();
glazings.set('Keep original', 0.00);
glazings.set('Sugar milk', 0.00);
glazings.set('Vanilla milk', 0.50);
glazings.set('Double chocolate', 1.50);

const packSizes = new Map();
packSizes.set('1', 1);
packSizes.set('3', 3);
packSizes.set('6', 5);
packSizes.set('12', 10);

cart.forEach((roll) => {createRollElement(roll)});
updatePrice();
