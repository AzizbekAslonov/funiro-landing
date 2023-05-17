window.onload = function () {
   document.addEventListener('click', documentActions)
   // Actions
   function documentActions(e) {
      const targetElement = e.target;

      if (window.innerWidth > 768 && isMobile.any()) {
         if (targetElement.classList.contains('menu__arrow')) {
            targetElement.closest('.menu__item').classList.toggle('_hover')
         }
         if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            document.querySelectorAll('.menu__item._hover').forEach(el => el.classList.remove('_hover'))
         }
      }
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search-form').classList.toggle('_active')
      } else if (!targetElement.closest('.search-form') && document.querySelectorAll('.search-form._active').length > 0) {
         document.querySelector('.search-form').classList.remove('_active')
      }

      if (targetElement.classList.contains('products__more')) {
         getProducts(targetElement);
         e.preventDefault();
      }

      if (targetElement.classList.contains('actions-product__button')) {
         const productId = targetElement.closest('.item-product').dataset.pid;
         addToCart(targetElement, productId);
         e.preventDefault();
      }

      if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
         if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active');
         }
         e.preventDefault();
      } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
         document.querySelector('.cart-header').classList.remove('_active');
      }

      if (targetElement.classList.contains('cart-list__delete')) {
         const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
         updateCart(targetElement, productId, false)

         e.preventDefault();
      }
   }
   // Header
   (function () {
      let headerEl = document.querySelector('.header');

      const callback = (entries, observer) => {
         if (entries[0].isIntersecting) {
            headerEl.classList.remove('_scroll');
         } else {
            headerEl.classList.add('_scroll');
         }
      };
      const headerObserver = new IntersectionObserver(callback);
      headerObserver.observe(headerEl);
   })()
   // Load More Products
   async function getProducts(btn) {
      if (!btn.classList.contains('_hold')) {
         btn.classList.add('_hold');
         const file = '../products.json';
         let response = await fetch(file);

         if (response.ok) {
            let result = await response.json();
            loadProducts(result);
            _ibg()

            btn.classList.remove('hold');
            btn.remove();
         } else {
            alert('Error')
         }
      }
   }

   function loadProducts(data) {
      let productsItems = document.querySelector('.products__items');

      data.products.forEach(item => {
         const productId = item.id;
         const productUrl = item.url;
         const productImage = item.image;
         const productTitle = item.title;
         const productText = item.text;
         const productPrice = item.price;
         const productOldPrice = item.priceOld;
         const productShareUrl = item.shareUrl;
         const productLikeUrl = item.likeUrl;
         const productLabels = item.labels;

         let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
         let productTemplateEnd = `</article>`;

         let productTemplateLabels = '';
         if (productLabels) {
            let productTemplateLabelsStart = `<div class="item-product__labels">`;
            let productTemplateLabelsEnd = `</div>`;
            let productTemplateLabelsContent = '';

            productLabels.forEach(labelItem => {
               productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
            });

            productTemplateLabels += productTemplateLabelsStart;
            productTemplateLabels += productTemplateLabelsContent;
            productTemplateLabels += productTemplateLabelsEnd;
         }

         let productTemplateImage = `
               <a href="${productUrl}" class="item-product__image _ibg">
                  <img src="img/products/${productImage}" alt="${productTitle}">
               </a>
            `;

         let productTemplateBodyStart = `<div class="item-product__body">`;
         let productTemplateBodyEnd = `</div>`;

         let productTemplateContent = `
               <div class="item-product__content">
                  <h3 class="item-product__title">${productTitle}</h3>
                  <div class="item-product__text">${productText}</div>
               </div>
            `;

         let productTemplatePrices = '';
         let productTemplatePricesStart = `<div class="item-product__prices">`;
         let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
         let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
         let productTemplatePricesEnd = `</div>`;

         productTemplatePrices = productTemplatePricesStart;
         productTemplatePrices += productTemplatePricesCurrent;
         if (productOldPrice) {
            productTemplatePrices += productTemplatePricesOld;
         }
         productTemplatePrices += productTemplatePricesEnd;

         let productTemplateActions = `
               <div class="item-product__actions actions-product">
                  <div class="actions-product__body">
                     <a href="" class="actions-product__button btn btn_white">Add to cart</a>
                     <a href="${productShareUrl}" class="actions-product__link"><span class="_icon-share"></span>Share</a>
                     <a href="${productLikeUrl}" class="actions-product__link"><span class="_icon-favorite"></span>Like</a>
                  </div>
               </div>
            `;

         let productTemplateBody = '';
         productTemplateBody += productTemplateBodyStart;
         productTemplateBody += productTemplateContent;
         productTemplateBody += productTemplatePrices;
         productTemplateBody += productTemplateActions;
         productTemplateBody += productTemplateBodyEnd;

         let productTemplate = '';
         productTemplate += productTemplateStart;
         productTemplate += productTemplateLabels;
         productTemplate += productTemplateImage;
         productTemplate += productTemplateBody;
         productTemplate += productTemplateEnd;

         productsItems.insertAdjacentHTML('beforeend', productTemplate);

      })
   }

   function addToCart(btn, productId) {
      if (!btn.classList.contains('_hold')) {
         btn.classList.add('_hold');
         btn.classList.add('_fly');

         const cart = document.querySelector('.cart-header__icon');
         const product = document.querySelector(`[data-pid="${productId}"]`);
         const productImage = product.querySelector('.item-product__image');


         const productImageFly = productImage.cloneNode(true);

         const productImageFlyWidth = productImage.offsetWidth;
         const productImageFlyHeight = productImage.offsetHeight;
         const productImageFlyTop = productImage.getBoundingClientRect().top;
         const productImageFlyLeft = productImage.getBoundingClientRect().left;

         productImageFly.setAttribute('class', '_flyImage _ibg');
         productImageFly.style.cssText = `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
            opacity: 1;
         `;

         document.body.append(productImageFly);

         const cartFlyLeft = cart.getBoundingClientRect().left;
         const cartFlyTop = cart.getBoundingClientRect().top;

         productImageFly.style.cssText = `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0;
            height: 0;
            opacity: 0;
         `;
         _ibg();

         productImageFly.addEventListener('transitionend', () => {
            if (btn.classList.contains('_fly')) {
               productImageFly.remove();
               updateCart(btn, productId)
               btn.classList.remove('_fly')
            }
         })
      }
   }

   function updateCart(btn, productId, productAdd = true) {
      let cart = document.querySelector('.cart-header');
      let cartIcon = document.querySelector('.cart-header__icon');
      let cartQuantity = cartIcon.querySelector('span');
      let cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
      let cartList = document.querySelector('.cart-list');

      if (productAdd) {
         // ... add
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
         }

         if (!cartProduct) {
            let product = document.querySelector(`[data-pid="${productId}"]`);
            let cartProductImage = product.querySelector(`.item-product__image`).innerHTML;
            let cartProducTitle = product.querySelector(`.item-product__title`).innerHTML;

            let cartProductContent = `
               <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
               <div class="cart-list__body">
                  <a href="" class="cart-list__title">${cartProducTitle}</a>
                  <div class="cart-list__quantity"> Quantity: <span>1</span> </div>
                  <a href="" class="cart-list__delete">Delete</a>
               </div>
            `
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
            _ibg();
         } else {
            let cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
         }
         // all actions finished
         btn.classList.remove('_hold');
      } else {
         // .... remove
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
         if (cartProductQuantity.innerHTML === '0') {
            cartProduct.remove();
         }

         const cartQuantityValue = --cartQuantity.innerHTML;
         if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue
         } else {
            cartQuantity.remove();
            cart.classList.remove('_active');
         }
      }
   }

   let furniture = document.querySelector('.furniture__body');
   if (furniture && !isMobile.any()) {
      let furnitureItems = document.querySelector('.furniture__items');
      let furnitureColumn = document.querySelectorAll('.furniture__column');

      const speed = furniture.dataset.speed || '0.01'

      let positionX = 0
      let coordXprocent = 0

      function setMouseGalleryStyle() {
         let furnitureItemsWidth = 0
         furnitureColumn.forEach(el => {
            furnitureItemsWidth += el.offsetWidth
         })
         const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth
         const distX = Math.floor(coordXprocent - positionX)

         positionX = positionX + (distX * speed)
         let position = furnitureDifferent / 200 * positionX

         furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle)
         } else {
            furniture.classList.remove('_init')
         }
      }
      furniture.addEventListener('mouseover', function (e) {
         const furnitureWidth = furniture.offsetWidth
         const coordX = e.pageX - furnitureWidth / 2

         coordXprocent = coordX / furnitureWidth * 200

         if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setMouseGalleryStyle)
            furniture.classList.add('_init')
         }
      })
   }
}




