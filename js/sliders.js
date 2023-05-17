// Swiper Заготовка =================================================================================================================
let sliders = document.querySelectorAll('._swiper');
for (let i = 0; i < sliders.length; i++) {
   const slider = sliders[i];

   if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
         for (let j = 0; j < slider_items.length; j++) {
            const el = slider_items[j];
            el.classList.add('swiper-slide')
         }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');
   }

}
// Swiper Заготовка ===========================================================================================================================

if (document.querySelector('.slider-main__body')) {
   new Swiper('.slider-main__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dotts
      pagination: {
         el: '.controls-slider-main__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-main .slider-arrows_next',
         prevEl: '.slider-main .slider-arrows_prev',
      }
   })
}

if (document.querySelector('.slider-rooms__body')) {
   new Swiper('.slider-rooms__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 24,
      speed: 800,
      loop: true,
      watchOverflow: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dotts
      pagination: {
         el: '.slider-rooms__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-rooms .slider-arrows_next',
         prevEl: '.slider-rooms .slider-arrows_prev',
      }
   })
}

if (document.querySelector('.slider-tips__body')) {
   new Swiper('.slider-tips__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 32,
      speed: 800,
      loop: true,
      watchOverflow: true,
      // Dotts
      pagination: {
         el: '.slider-tips__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-tips .slider-arrows_next',
         prevEl: '.slider-tips .slider-arrows_prev',
      },
      breakpoints: {
         // >= 320px
         320: {
            slidesPerView: 1.1,
            spaceBetween: 15
         },
         // >= 768
         768: {
            slidesPerView: 2,
            spaceBetween: 20
         },
         // >= 992
         992: {
            slidesPerView: 3,
            spaceBetween: 32
         }
      }
   })
}