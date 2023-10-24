/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

//updating prices in cart
  // Get all the cart items
  const cartItems = document.querySelectorAll('.cart__card');

  // Get the cart prices elements
  const cartItemsCount = document.querySelector('.cart__prices-item');
  const cartTotalPrice = document.querySelector('.cart__prices-total');

  // Initialize total count and total price
  let totalCount = 0;
  let totalPrice = 0;

  // Loop through each cart item
  cartItems.forEach((item) => {
    // Get the item's quantity and price
    const quantityElement = item.querySelector('.cart__amount-number');
    const priceElement = item.querySelector('.cart__price');
    
    const quantity = parseInt(quantityElement.textContent);
    const price = parseFloat(priceElement.textContent.replace('$', ''));

    // Update total count and total price
    totalCount += quantity;
    totalPrice += quantity * price;
  });

  // Update the cart item count and total price
  cartItemsCount.textContent = totalCount;
  cartTotalPrice.textContent = '$' + totalPrice.toFixed(2); // Format the total price

  // Now you can use totalCount and totalPrice as needed in your code.



  // Get all the cart items


  // Add event listeners to plus and minus buttons
  cartItems.forEach((item) => {
    const quantityElement = item.querySelector('.cart__amount-number');
    const plusButton = item.querySelector('.bx-plus');
    const minusButton = item.querySelector('.bx-minus');

    plusButton.addEventListener('click', () => {
      // Increase the quantity when the plus button is clicked
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;

      // Update the total count and total price
      updateCartTotals();
    });

    minusButton.addEventListener('click', () => {
      // Decrease the quantity when the minus button is clicked
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;

        // Update the total count and total price
        updateCartTotals();
      }
    });
  });

  // Function to update the total count and total price
  function updateCartTotals() {
    let totalCount = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      const quantityElement = item.querySelector('.cart__amount-number');
      const priceElement = item.querySelector('.cart__price');

      const quantity = parseInt(quantityElement.textContent);
      const price = parseFloat(priceElement.textContent.replace('$', ''));

      totalCount += quantity;
      totalPrice += quantity * price;
    });

    cartItemsCount.textContent = totalCount;
    cartTotalPrice.textContent = '$' + totalPrice.toFixed(2);
  }


// deletion code


  // Get all the trash icons in the cart
  const deleteButtons = document.querySelectorAll('.cart__amount-trash');
  
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      // Find the parent article element (cart item) and remove it
      const cartItem = deleteButton.closest('.cart__card');
      cartItem.remove();

      // Update the total count and total price
      updateCartTotals();
    });
  });

  // Function to update the total count and total price
  function updateCartTotals() {
    let totalCount = 0;
    let totalPrice = 0;

    const cartItems = document.querySelectorAll('.cart__card');

    cartItems.forEach((item) => {
      const quantityElement = item.querySelector('.cart__amount-number');
      const priceElement = item.querySelector('.cart__price');

      const quantity = parseInt(quantityElement.textContent);
      const price = parseFloat(priceElement.textContent.replace('$', ''));

      totalCount += quantity;
      totalPrice += quantity * price;
    });

    // Update the total count and total price
    const cartItemsCount = document.querySelector('.cart__prices-item');
    const cartTotalPrice = document.querySelector('.cart__prices-total');
    cartItemsCount.textContent = totalCount;
    cartTotalPrice.textContent = '$' + totalPrice.toFixed(2);
  }



  //add to cart functionality

  document.addEventListener('DOMContentLoaded', function () {
    const cartItemsCount = document.querySelector('.cart__prices-item');
    const cartTotalPrice = document.querySelector('.cart__prices-total');
    const cartContainer = document.querySelector('.cart__container');

    const addToCartButtons = document.querySelectorAll('.featured__button, .products__button');

    addToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productCard = button.closest('.featured__card, .products__card');
        const productName = productCard.querySelector('.featured__title, .products__title').textContent;
        const productPrice = productCard.querySelector('.featured__price, .products__price').textContent;
        const productImageSrc = productCard.querySelector('.featured__img, .products__img').getAttribute('src');

        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__card');

        cartItem.innerHTML = `
          <div class="cart__box">
            <img src="${productImageSrc}" alt="" class="cart__img" />
          </div>
          <div class="cart__details">
            <h3 class="cart__title">${productName}</h3>
            <span class="cart__price">${productPrice}</span>
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box minus">
                  <i class="bx bx-minus"></i>
                </span>
                <span class="cart__amount-number">1</span>
                <span class="cart__amount-box plus">
                  <i class="bx bx-plus"></i>
                </span>
              </div>
              <i class="bx bx-trash-alt cart__amount-trash"></i>
            </div>
          </div>
        `;

        cartContainer.appendChild(cartItem);
        updateCartTotals();
      });
    });

    cartContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('cart__amount-box')) {
        const quantityElement = event.target.parentElement.querySelector('.cart__amount-number');
        let quantity = parseInt(quantityElement.textContent);

        if (event.target.classList.contains('minus') && quantity > 1) {
          quantity--;
        } else if (event.target.classList.contains('plus')) {
          quantity++;
        }

        quantityElement.textContent = quantity;
        updateCartTotals();
      } else if (event.target.classList.contains('cart__amount-trash')) {
        event.target.closest('.cart__card').remove();
        updateCartTotals();
      }
    });

    function updateCartTotals() {
      const cartItems = document.querySelectorAll('.cart__card');
      let totalCount = 0;
      let totalPrice = 0;

      cartItems.forEach((item) => {
        const quantityElement = item.querySelector('.cart__amount-number');
        const priceElement = item.querySelector('.cart__price');

        const quantity = parseInt(quantityElement.textContent);
        const price = parseFloat(priceElement.textContent.replace('$', ''));

        totalCount += quantity;
        totalPrice += quantity * price;
      });

      cartItemsCount.textContent = totalCount;
      cartTotalPrice.textContent = '$' + totalPrice.toFixed(2);
    }
  });

