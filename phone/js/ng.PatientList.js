angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    itemListLoaded: !1,
    patientName: "",
    idcard: "",
    state: "",
    _patientName: "",
    _idcard: "",
    _state: -1,
    isFilterPageActive: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    if (!e.loading) {
      e.loading = !0;
      var i = {
        rId: qlib.getUser().loginId,
        patientName: e.patientName,
        idcard: e.idcard,
        state: e.state,
        index: qlib.getNextPageNumber(e.itemList.length),
        pageSize: PAGE_SIZE_DEFAULT,
        version:"1"
      };
      console.log(i), console.log($.param(i)), appcan.request.ajax({
        type: "GET",
        url: SimcereConfig.server.edzy + "patient/page",
        data: i,
        contentType: "application/json",
        dataType: "json",
        timeout: REQUEST_TIMEOUT,
        success: function(i, a, n, o, r) {
          e.loading = !1, appcan.window.closeToast(), console.log(i), "2" == i.status && (i.status = "0", i.data = {}, i.data.rows = []), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), t(function() {
            e.itemListErr = !e.itemList.length
          })) : t(function() {
            e.itemList = e.itemList.concat(i.data.rows), e.itemListEmpty = !e.itemList.length
          })
        },
        error: function(i, a, n, o) {
          e.loading = !1, appcan.window.openToast("网络连接不可用", SimcereConfig.ui.toastDuration), console.error(a), t(function() {
            e.itemListErr = !e.itemList.length
          })
        }
      })
    }
  }
}]).service("subscribe", ["$timeout", "Data", "getList", function(t, e, i) {
  return function() {
    appcan.window.subscribe("EDZY/PatientList.toggleFilter", function() {
      t(function() {
        e.isFilterPageActive = !e.isFilterPageActive
      })
    }), appcan.window.subscribe("EDZY/PatientList.filterChange", function() {
      var a = localStorage.getItem("EDZY/PatientList.filter"),
        n = JSON.parse(a);
      angular.extend(e, {
        patientName: n._patientName,
        idcard: n._idcard,
        state: n.state
      }), t(function() {
        e.isFilterPageActive = !1, e.itemList.length = 0, i()
      })
    }), appcan.window.subscribe("EDZY/PatientList.refresh", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), e.itemList.length = 0, i()
    }), appcan.window.subscribe("EDZY/PatientList.load", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), i()
    })
  }
}]).service("openDetail", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return 3 == t.flowType && 4 == t.state ? void appcan.window.alert("提示", "无法查看封存的数据", "知道了") : (console.log(t), localStorage.setItem("EDZY/PatientDetail.patientId", t.id), void appcan.window.open("EDZY_PatientDetail", "PatientDetail.html", 10))
  }
}]).service("openZyList", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return 3 == t.flowType && 4 == t.state ? void appcan.window.alert("提示", "无法查看封存的数据", "知道了") : (console.log(t), localStorage.setItem("EDZY/PatientDetail.patientId", t.id), void appcan.window.open("EDZY_ZyPatientDetail", "ZyPatientDetail.html", 10))
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", "getList", "openDetail","openZyList", "getStatTxt", function(t, e, i, a, n, z, o) {
  t.openDetail = n, t.openZyList= z, t.getStatTxt = o, a()
}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getList", function(t, e, i, a, n) {
  t.Data = i, t.sMAP = {
    "": "全部",
    0: "待审核",
    1: "通过",
    2: "不通过"
  }, t.clearPatientName = function() {
    i.patientName = "", i.itemList.length = 0, n()
  }, t.clearIdcard = function() {
    i.idcard = "", i.itemList.length = 0, n()
  }, t.clearState = function() {
    "" !== i.state && (i.state = "", i.itemList.length = 0, n())
  }, a(), t.$watch("Data.isFilterPageActive", function(t, e) {
    if (t != e) {
      var a = $(window).width();
      i.isFilterPageActive ? qlib.filterSlideIn(a) : qlib.filterSlideOut(a)
    }
  })
}]);