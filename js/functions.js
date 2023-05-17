const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};

function _ibg() {
   let ibg = document.querySelectorAll("._ibg");
   for (let i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector("img")) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
} _ibg()

function _slideUp(e) {
   var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
   e.style.transitionProperty = "height, margin, padding",
      e.style.transitionDuration = t + "ms",
      e.style.height = e.offsetHeight + "px",
      e.offsetHeight,
      e.style.overflow = "hidden",
      e.style.height = 0,
      e.style.paddingTop = 0,
      e.style.paddingBottom = 0,
      e.style.marginTop = 0,
      e.style.marginBottom = 0,
      window.setTimeout((function () {
         e.style.display = "none",
            e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide")
      }), t)
}
function _slideDown(e) {
   var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
   e.style.removeProperty("display");
   var o = window.getComputedStyle(e).display;
   "none" === o && (o = "block"),
      e.style.display = o;
   var r = e.offsetHeight;
   e.style.overflow = "hidden",
      e.style.height = 0,
      e.style.paddingTop = 0,
      e.style.paddingBottom = 0,
      e.style.marginTop = 0,
      e.style.marginBottom = 0,
      e.offsetHeight,
      e.style.transitionProperty = "height, margin, padding",
      e.style.transitionDuration = t + "ms",
      e.style.height = r + "px",
      e.style.removeProperty("padding-top"),
      e.style.removeProperty("padding-bottom"),
      e.style.removeProperty("margin-top"),
      e.style.removeProperty("margin-bottom"),
      window.setTimeout((function () {
         e.style.removeProperty("height"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
      }), t);
}
function _slideToggle(e) {
   var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
   if (!e.classList.contains("_slide")) return e.classList.add("_slide"),
      "none" === window.getComputedStyle(e).display ? _slideDown(e, t) : _slideUp(e, t)
};

let icon_menu = document.querySelector('.icon-menu');
icon_menu.addEventListener('click', () => {
   icon_menu.classList.toggle('_active');
   document.querySelector('.menu__body').classList.toggle('_active');
   document.querySelector('body').classList.toggle('_lock');
});











