/**********************************
    Constructor function
**********************************/
// AlphaPos Constructor Function
function AlphaPos() { }

//Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

// delete drink prototype
AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

//checkout prototype
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

//clear order prototype
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}
/**********************************
    Announce variable
**********************************/
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
let allDrinksOptions = document.querySelectorAll('input[name="drink"]')
let allIceOptions = document.querySelectorAll('input[name="ice"]')
let allSugarOptions = document.querySelectorAll('input[name="sugar"]')
const alphaPos = new AlphaPos()
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
/**********************************
    get checked value
**********************************/
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// allDrinksOptions.forEach(function(option) {
//   if (option.checked) {
//     console.log(`${option.value}: ${option.checked}`)
//   }
// })


AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
      <div class="card mb-3">
        <div class="card-body pt-3 pr-3">
          <div class="text-right">
            <span data-alpha-pos="delete-drink">×</span>  
          </div>
          <h6 class="card-title mb-1">${drink.name}</h6>
          <div class="card-text">${drink.ice}</div>
          <div class="card-text">${drink.sugar}</div>
        </div>
        <div class="card-footer text-right py-2">
          <div class="card-text text-muted">
            $ <span data-drink-price>${drink.price()}</span>
          </div>
        </div>
      </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}
/**********************************
    add drink button event
**********************************/
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  // console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  // console.log(drink)
  // console.log(drink.price())
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

/**********************************
    add delete event
**********************************/
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

/**********************************
    add checkout sumary event
**********************************/
checkoutButton.addEventListener('click', function () {
  //1. 計算訂單總金額
  alert(`Total amount of drinks: $${alphaPos.checkout()}`)
  //2. 清空訂單
  alphaPos.clearOrder(orderLists)
})