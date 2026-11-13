/* Customer.io snippet + helpers for the Meridian Health demo site */
var CIO_SITE_ID = "c5cb2083499c59d8055b";

var _cio = _cio || [];
(function () {
  var a, b, c;
  a = function (f) {
    return function () {
      _cio.push([f].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  b = ["load", "identify", "sidstatus", "track", "page"];
  for (c = 0; c < b.length; c++) _cio[b[c]] = a(b[c]);
  var t = document.createElement("script"),
    s = document.getElementsByTagName("script")[0];
  t.async = true;
  t.id = "cio-tracker";
  t.setAttribute("data-site-id", CIO_SITE_ID);
  t.setAttribute("data-use-array-params", "true");
  t.setAttribute("data-use-in-app", "true");
  t.src = "https://assets.customer.io/assets/track.js"; // EU workspaces: track-eu.js
  s.parentNode.insertBefore(t, s);
})();

/* ---- helpers ---- */
function getUser() {
  try { return JSON.parse(localStorage.getItem("mh_user") || "null"); } catch (e) { return null; }
}
function saveUser(u) {
  try { localStorage.setItem("mh_user", JSON.stringify(u)); } catch (e) {}
}

// Re-identify returning visitors on every page, then record the page view.
(function () {
  var u = getUser();
  if (u && u.email) _cio.identify({ id: u.email, email: u.email });
  _cio.page(window.location.pathname);
})();

function identifyUser(attrs) {
  var u = Object.assign(getUser() || {}, attrs);
  saveUser(u);
  _cio.identify(Object.assign({ id: u.email }, attrs, {
    created_at: u.created_at || Math.floor(Date.now() / 1000)
  }));
  return u;
}

function trackEvent(name, props) {
  _cio.track(name, props || {});
}
