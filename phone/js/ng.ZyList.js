angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    itemListLoaded: !1,
    hospitalId: "",
    hospitalName: "",
    doctorName: "",
    patientName: "",
    state: "",
    _hospitalId: "",
    _hospitalName: "",
    _doctorName: "",
    _patientName: "",
    _state: -1,
    isFilterPageActive: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    if (!e.loading) {
      e.loading = !0;
      var i = {
        rId: qlib.getUser().loginId,
        hospitalId: e.hospitalId,
        doctorName: e.doctorName,
        patientName: e.patientName,
        state: e.state,
        index: qlib.getNextPageNumber(e.itemList.length),
        pageSize: PAGE_SIZE_DEFAULT
      };
      console.log(i), console.log($.param(i)), appcan.request.ajax({
        type: "GET",
        url: SimcereConfig.server.edzy + "med/given/list",
        data: i,
        contentType: "application/json",
        dataType: "json",
        timeout: REQUEST_TIMEOUT,
        success: function(i, a, o, n, s) {
          e.loading = !1, appcan.window.closeToast(), console.log(i), "2" == i.status && (i.status = "0", i.data = {}, i.data.rows = []), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), t(function() {
            e.itemListErr = !e.itemList.length
          })) : t(function() {
            e.itemList = e.itemList.concat(i.data.rows), e.itemListEmpty = !e.itemList.length
          })
        },
        error: function(i, a, o, n) {
          e.loading = !1, appcan.window.openToast("网络连接不可用", SimcereConfig.ui.toastDuration), console.error(a), t(function() {
            e.itemListErr = !e.itemList.length
          })
        }
      })
    }
  }
}]).service("subscribe", ["$timeout", "Data", "getList", function(t, e, i) {
  return function() {
    appcan.window.subscribe("EDZY/ZyList.toggleFilter", function() {
      t(function() {
        e.isFilterPageActive = !e.isFilterPageActive
      })
    }), appcan.window.subscribe("EDZY/ZyList.filterChange", function() {
      var a = localStorage.getItem("EDZY/ZyList.filter"),
        o = JSON.parse(a);
      angular.extend(e, {
        hospitalId: o.hospitalId,
        hospitalName: o.hospitalName,
        doctorName: o.doctorName,
        patientName: o.patientName,
        state: o.state
      }), t(function() {
        e.isFilterPageActive = !1, e.itemList.length = 0, i()
      })
    }), appcan.window.subscribe("EDZY/ZyList.refresh", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), e.itemList.length = 0, i()
    }), appcan.window.subscribe("EDZY/ZyList.load", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), i()
    })
  }
}]).service("openDetail", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return 4 == t.giveState ? void appcan.window.alert("提示", "无法查看封存的数据", "知道了") : (console.log("patientId: %s", t.id), localStorage.setItem("EDZY/ZyDetail.patientId", t.id), void appcan.window.open("EDZY_ZyDetail", "ZyDetail.html", 10))
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", "getList", "openDetail", "getStatTxt", function(t, e, i, a, o, n) {
  t.openDetail = o, t.getStatTxt = n, a()
}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getList", function(t, e, i, a, o) {
  t.Data = i, t.sMAP = {
    "": "全部",
    0: "审核中",
    1: "通过",
    2: "驳回",
    3: "撤销",
    4: "已封存",
    5: "可申请",
    6: "不可申请"
  }, t.clearHospitalName = function() {
    i.hospitalName = "", i.itemList.length = 0, o()
  }, t.clearDoctorName = function() {
    i.doctorName = "", i.itemList.length = 0, o()
  }, t.clearPatient = function() {
    i.patientName = "", i.itemList.length = 0, o()
  }, t.clearState = function() {
    "" !== i.state && (i.state = "", i.itemList.length = 0, o())
  }, a(), t.$watch("Data.isFilterPageActive", function(t, e) {
    if (t != e) {
      var a = $(window).width();
      i.isFilterPageActive ? qlib.filterSlideIn(a) : qlib.filterSlideOut(a)
    }
  })
}]);