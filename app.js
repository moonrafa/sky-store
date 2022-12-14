//show cart
//immediately invoked function
;(function () {
  const cartInfo = document.getElementById('cart-info')
  const cart = document.getElementById('cart')
  cartInfo.addEventListener('click', function () {
    const cartItems = document.querySelectorAll('.cart-item')
    if (cartItems.length > 0) {
      cart.classList.toggle('show-cart')
      deleteSingleItem()
    } else {
      alert('Empty cart')
    }
  })
})()

//add items to the cart
;(function () {
  const cartBtn = document.querySelectorAll('.store-item-icon')

  cartBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (e.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = e.target.parentElement.previousElementSibling.src
        const item = {}
        item.img = fullPath
        let name =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[0].textContent
        item.name = name
        let price =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[1].textContent
        let finalPrice = price.slice(2).trim()
        item.price = finalPrice
        const cartItem = document.createElement('div')
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        )
        cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="cart-item-text">
          <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
          <span>R$</span>
          <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </a>
      </div>`
        const cart = document.getElementById('cart')
        const total = document.querySelector('.cart-total-container')
        cart.insertBefore(cartItem, total)
        alert('Item added to the cart')
        showTotal()
      }
    })
  })
  function showTotal() {
    const total = []
    const items = document.querySelectorAll('.cart-item-price')
    items.forEach(function (item) {
      total.push(parseFloat(item.textContent))
    })
    const totalMoney = total.reduce(function (total, item) {
      total += item
      return total
    }, 0)

    const finalMoney = totalMoney.toFixed(2)
    document.getElementById('cart-total').textContent = finalMoney
    document.getElementById('item-count').textContent = total.length
    document.querySelector('.item-total').textContent = finalMoney
    emptyCart()
    deleteSingleItem()
  }
})()

//clear cart
;(function () {
  const clearCart = document.getElementById('clear-cart')
  const cart = document.querySelector('.cart')
  clearCart.addEventListener('click', function () {
    const cartItems = document.querySelectorAll('.cart-item')
    if (cartItems.length > 0) {
      cartItems.forEach(function (item) {
        cart.removeChild(item)
        console.log(item)
      })
    }
    emptyCart()
  })
})()
//empty cart
function emptyCart() {
  const cartItems = document.querySelectorAll('.cart-item')
  if (cartItems.length <= 0) {
    document.getElementById('item-count').textContent = 0
    const cartTotalContainer = document.querySelector('.cart')
    cartTotalContainer.classList.remove('show-cart')
    document.querySelector('.item-total').textContent = 0
  }
}
//single item event listener
function deleteSingleItem() {
  const cart = document.querySelector('#cart')
  const deleteBtn = document.querySelectorAll('.cart-item-remove')
  deleteBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const element = e.target.parentElement.parentElement
      if (cart.contains(element)) {
        cart.removeChild(element)
        //count itens
        showTotal()
      }
      emptyCart()
    })
  })
  function showTotal() {
    const total = []
    const items = document.querySelectorAll('.cart-item-price')
    items.forEach(function (item) {
      total.push(parseFloat(item.textContent))
    })
    const totalMoney = total.reduce(function (total, item) {
      total += item
      return total
    }, 0)

    const finalMoney = totalMoney.toFixed(2)
    document.getElementById('cart-total').textContent = finalMoney
    document.getElementById('item-count').textContent = total.length
    document.querySelector('.item-total').textContent = finalMoney
  }
}
//checkout modal
//filter buttons
//cart showing on mobile
//fixed navbar
