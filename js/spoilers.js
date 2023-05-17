// Spollers
// _slideToggle, _slideDown, _slideUp !!!

if (document.querySelectorAll('[data-spollers]').length > 0) {
   const $spollerArray = document.querySelectorAll('[data-spollers]');

   // получение обычных спойлеры
   const spollersRegular = Array.from($spollerArray).filter((item) => {
      return !item.dataset.spollers.split(',')[0];
   })

   // инициализация обычных спойлеров
   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular)
   }

   // получение спойлеров с медиа запросами
   const spollersMedia = Array.from($spollerArray).filter((item) => {
      return item.dataset.spollers.split(',')[0];
   })

   // инициализация спойлеров с медиа запросами
   if (spollersMedia.length > 0) {

      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
         const breakpoint = {};
         const paramsArray = params.split(',');
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      })

      // получаем уникальную брейкпоинты
      let mediaQueries = breakpointsArray.map(item => {
         return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`
      })
      mediaQueries = mediaQueries.filter((item, index, self) => {
         return self.indexOf(item) === index
      })

      // работаем с каждый брейкпоинт
      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(',');
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0])

         // объекты с важными условиями
         const spollersArray = breakpointsArray.filter(item => {
            if (item.value === mediaBreakpoint && item.type === mediaType) return true
         })

         // событие
         matchMedia.addListener(() => {
            initSpollers(spollersArray, matchMedia)
         })
         initSpollers(spollersArray, matchMedia)
      })
   }



   function initSpollers(spollersArray, matchMedia = false) {
      // console.log(spollersArray);
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener('click', setSpollerAction)
         } else {
            spollersBlock.classList.remove('_init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener('click', setSpollerAction)
         }
      })
   }

   function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
               spollerTitle.removeAttribute('tabindex');
               if (!spollerTitle.classList.contains('_active')) {
                  spollerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollerTitle.setAttribute('tabindex', '-1');
               spollerTitle.nextElementSibling.hidden = false;
            }
         })
      }
   }

   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling)
         }
         e.preventDefault();



      }
   }

   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling)
      }
   }
}

// data-spollers="breakpoint,min/max" -> adaptive spollers
// data-one-spoller -> akardion
// data-spoller + class '_active' = active spoller
