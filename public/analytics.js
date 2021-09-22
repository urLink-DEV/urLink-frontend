/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// Standard Google Universal Analytics code
;(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r
  ;(i[r] =
    i[r] ||
    function () {
      ;(i[r].q = i[r].q || []).push(arguments)
    }),
    (i[r].l = 1 * new Date())
  ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
  a.async = 1
  a.src = g
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga') // Note: https protocol here

ga('create', 'UA-207149982-2', 'auto')
ga('set', 'checkProtocolTask', function () {})
ga('send', 'pageview')
console.log(ga.q)

var _gaq = _gaq || []
_gaq.push(['_setAccount', 'UA-207149982-2'])
_gaq.push(['_trackPageview'])
/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked'])
  console.log('track!')
}

/**
 * Now set up your event handlers for the popup's `button` elements once the
 * popup's DOM has loaded.
 *
 * TODO: id 있는 버튼 트래킹되는지 확인 후 button id 추가 필요
 */
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button')
  console.log(buttons)
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick)
  }
})
