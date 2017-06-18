function beginAnimition() {
  uexWindow.beginAnimition()
}

function setAnimitionDelay(e) {
  uexWindow.setAnimitionDelay(e)
}

function setAnimitionDuration(e) {
  uexWindow.setAnimitionDuration(e)
}

function setAnimitionCurve(e) {
  uexWindow.setAnimitionCurve(e)
}

function setAnimitionRepeatCount(e) {
  uexWindow.setAnimitionRepeatCount(e)
}

function setAnimitionAutoReverse(e) {
  uexWindow.setAnimitionAutoReverse(e)
}

function makeTranslation(e, n, t) {
  uexWindow.makeTranslation(e, n, t)
}

function makeScale(e, n, t) {
  uexWindow.makeScale(e, n, t)
}

function makeRotate(e, n, t, o) {
  uexWindow.makeRotate(e, n, t, o)
}

function makeAlpha(e) {
  uexWindow.makeAlpha(e)
}

function commitAnimition() {
  uexWindow.commitAnimition()
}! function(e) {
  function n(e) {
    return JSON.stringify(e)
  }

  function t(e) {
    return JSON.parse(e)
  }

  function o(e, n) {
    var t = "object" == typeof n ? JSON.stringify(n) : n;
    localStorage.setItem(e, t)
  }

  function i(e) {
    var n = localStorage.getItem(e);
    return null === n && console.warn('localStorage with key "' + e + "\" doesn't exists."), null === n ? {} : JSON.parse(n)
  }

  function a(e, n, t, o) {
    if ("undefined" == typeof uexCalendar) return e('{"begin":"2011-02-22","end":"2017-02-22"}'), void console.warn("模拟uexCalendar");
    uexCalendar.cbCallBack = function(n, t, o) {
      e.call(uexCalendar, o)
    };
    var i = "2" == n ? "2" : "1",
      a = "1" == t ? "1" : "0",
      c = "";
    o && (c = "string" == typeof o ? o : JSON.stringify(o)), uexCalendar.open(i, a, c)
  }

  function c(e, n, t) {
    var o;
    o = e instanceof Array ? e : [e], o.forEach(function(e) {
      l(e, "uexWindow.close()", 0)
    })
  }

  function l(e, n, t) {
    setTimeout(function() {
      uexWindow.evaluateScript(e || "", 0, n)
    }, t || 0)
  }

  function r(e, n) {
    e = e || -1, n = n || 300;
    var t = "uexWindow.close(" + e + ", " + n + ")";
    l("", t)
  }

  function u() {
    appcan.window.open("DoctorSelect", "DoctorSelect.html", 10)
  }

  function p() {
    appcan.window.open("PatientSelect", "PatientSelect.html", 10)
  }

  function d() {
    appcan.window.open("HospitalSelect", "HospitalSelect.html", 10)
  }

  function s() {
    appcan.window.open("AddressSelect", "AddressSelect.html", 10)
  }

  function f() {
    appcan.window.open("CancerSelect", "CancerSelect.html", 10)
  }

  function m() {
    appcan.window.open("DepartmentSelect", "DepartmentSelect.html", 10)
  }

  function S() {
    appcan.window.open("ZcSelect", "ZcSelect.html", 10)
  }

  function w() {
    appcan.window.open("ZwSelect", "ZwSelect.html", 10)
  }

  function C() {
    appcan.window.open("ScopedProductSelect", "ScopedProductSelect.html", 10)
  }

  function A() {
    appcan.window.open("EDZY_Flow", "Flow.html", 10)
  }

  function g() {
    appcan.window.open("EDZY_YbTypeSelect", "YbTypeSelect.html", 10)
  }

  function v() {
    appcan.window.open("EDZY_YlpjSelect", "YlpjSelect.html", 10)
  }

  function x() {
    appcan.window.open("EDZY_LcfqSelect", "LcfqSelect.html", 10)
  }

  function D() {
    appcan.window.open("EDZY_CaseSelect", "CaseSelect.html", 10)
  }

  function E() {
    appcan.window.open("EDZY_ShopSelect", "ShopSelect.html", 10)
  }

  function b(e, n, t, o) {
    var i = '{"begin":"2016-01-01","end":"2016-12-31"}',
      a = JSON.parse(i);
    if ("undefined" == typeof uexCalendar) return e(a), void console.warn("模拟uexCalendar: " + i);
    uexCalendar.cbCallBack = function(n, t, o) {
      o = JSON.parse(o), console.log(o), e.call(uexCalendar, o)
    };
    var c = "2" == n ? "2" : "1",
      l = "1" == t ? "1" : "0",
      r = "";
    o && (r = "string" == typeof o ? o : JSON.stringify(o)), uexCalendar.open(c, l, r)
  }

  function W(e) {
    return (e || "") + "?cc=" + Date.now()
  }

  function O() {
    var e = localStorage.getItem("simcere.runtime.loginId");
    localStorage.getItem("simcere.runtime.userId"), localStorage.getItem("simcere.runtime.stationId");
    return {
      loginId: e || "003442"
    }
  }

  function h() {
    var n = localStorage.getItem("EDZY.ENUM_DICT");
    return e.ENUM_DICT = JSON.parse(n)
  }

  function T(e, n) {
    n = n ? n : {};
    try {
      uexControl.cbOpenDatePicker = function(n, t, o) {
        o = o.replace(/'/g, '"');
        var i = JSON.parse(o);
        e(i)
      }, uexControl.openDatePicker(n.year || "", n.month || "", n.day || "")
    } catch (e) {
      alert(e.message)
    }
  }

  function _(e, n) {
    n = n || PAGE_SIZE_DEFAULT;
    var t;
    return t = e <= 0 ? 1 : Math.ceil(e / n) + 1
  }

  function N(e, n) {
    console.log("opType: %s, flowStat: %s", e, n);
    var t = {
        1: {
          0: [0, 0, 1],
          1: [1, 1, 0],
          2: [1, 0, 1],
          Aborted: [null, null, null],
          Deleted: [0, 0, 0]
        },
        2: {
          0: [0, 0, 1],
          1: [1, 1, 0],
          2: [1, 0, 1],
          Aborted: [1, 1, 0],
          Deleted: [0, 0, 0]
        },
        3: {
          0: [0, 0, 1],
          1: [0, 0, 0],
          2: [0, 1, 1],
          Aborted: [1, 1, 0],
          Deleted: [0, 0, 0]
        },
        4: {
          0: [1, 1, 1],
          1: [1, 1, 1],
          2: [1, 1, 1],
          Aborted: [1, 1, 1],
          Deleted: [0, 0, 0]
        }
      },
      o = t[e][n];
    o[0] && $(".u-btn-bj").removeClass("z-disabled"), o[1] && $(".u-btn-fc").removeClass("z-disabled"), o[2] && $(".u-btn-cx").removeClass("z-disabled")
  }

  function L() {
    uexWindow.cbPrompt = function(e, n, t) {
      console.log(t);
      var o = JSON.parse(t);
      console.log(t), 1 == o.num && appcan.window.publish("EDZY/abortFlow", o.value)
    }, uexWindow.prompt(CR.FLOW_ABORT_TITLE, CR.FLOW_ABORT_CONTENT, "", CR.FLOW_ABORT_BTN, CR.FLOW_ABORT_PLACEHOLDER)
  }

  function y() {
    uexWindow.cbPrompt = function(e, n, t) {
      console.log(t);
      var o = JSON.parse(t);
      1 == o.num && appcan.window.publish("EDZY/deleteFlow", o.value)
    }, uexWindow.prompt(CR.FLOW_DELETE_TITLE, CR.FLOW_DELETE_CONTENT, "", CR.FLOW_DELETE_BTN, CR.FLOW_DELETE_PLACEHOLDER)
  }

  function R(e, n) {
    var t = {
      idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      phone: /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
      zipCode: /^[1-9][0-9]{5}$/,
      number: /^\d+$/
    };
    return t[e].test(n)
  }

  function F(e, n, t, o) {
    var i = 'uexWindow.setPopoverFrame("filter",0,' + n + "," + t + "," + o + ")";
    console.log(i), l("", i)
  }

  function P(e, n, t, o) {
    var i = 'uexWindow.setPopoverFrame("filter",' + e + "," + n + "," + t + "," + o + ")";
    console.log(i), l("", i)
  }

  function Z(e, n) {
    var t = e * n;
    console.log("d: %s, w: %s, x: %s", e, n, t), beginAnimition(), setAnimitionDuration(260), makeTranslation(t, 0, 0), commitAnimition()
  }

  function I(e) {
    var n = "qlib.frameAnimate(-1," + e + ")";
    console.log(n), uexWindow.evaluatePopoverScript("", "filter", n)
  }

  function k(e) {
    var n = "qlib.frameAnimate(1," + e + ")";
    console.log(n), uexWindow.evaluatePopoverScript("", "filter", n)
  }
  var Y = function() {};
  Y.j2s = n, Y.s2j = t, Y.j2ls = o, Y.ls2j = i, Y.uexCalendar = a, Y.closeWindowByName = c, Y.evalScriptInWindow = l, Y.closeCurrentWindow = r, Y.openDoctorSelect = u, Y.openPatientSelect = p, Y.openHospitalSelect = d, Y.openAddressSelect = s, Y.openCancerSelect = f, Y.openDepartmentSelect = m, Y.openZcSelect = S, Y.openZwSelect = w, Y.openScopedProductSelect = C, Y.openFlow = A, Y.openYbTypeSelect = g, Y.openYlpjSelect = v, Y.openLcfqSelect = x, Y.openCaseSelect = D, Y.openDateRangeSelect = b, Y.openShopSelect = E, Y.getUser = O, Y.noCache = W, Y.getDict = h, Y.openDatePicker = T, Y.getNextPageNumber = _, Y.setHeaderState = N, Y.abortFlow = L, Y.deleteFlow = y, Y.checkField = R, Y.filterSlideIn = I, Y.filterSlideOut = k, Y.frameAnimate = Z, Y.filterMoveIn = F, Y.filterMoveOut = P, e.qlib = Y
}(window);