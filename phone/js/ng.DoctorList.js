angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    itemListLoaded: !1,
    hospitalName: "",
    doctorName: "",
    mobile: "",
    state: "",
    _hospitalName: "",
    _doctorName: "",
    _mobile: "",
    _state: -1,
    isFilterPageActive: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    if (!e.loading) {
      e.loading = !0;
      var i = {
        rId: qlib.getUser().loginId,
        hospitalName: e.hospitalName,
        doctorName: e.doctorName,
        mobile: e.mobile,
        state: e.state,
        index: qlib.getNextPageNumber(e.itemList.length),
        pageSize: PAGE_SIZE_DEFAULT
      };
      console.log(i), console.log($.param(i)), appcan.request.ajax({
        type: "GET",
        url: SimcereConfig.server.edzy + "doctor/page",
        data: i,
        contentType: "application/json",
        dataType: "json",
        timeout: REQUEST_TIMEOUT,
        success: function(i, o, a, n, r) {
          e.loading = !1, appcan.window.closeToast(), console.log("data---"+JSON.stringify(i)), "2" == i.status && (i.status = "0", i.data = {}, i.data.rows = []), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), t(function() {
            e.itemListErr = !e.itemList.length
          })) : t(function() {
            e.itemList = e.itemList.concat(i.data.rows), e.itemListEmpty = !e.itemList.length;
            //console.log('itemList-----'+JSON.stringify(e.itemList));
          })
        },
        error: function(i, o, a, n) {
          e.loading = !1, appcan.window.openToast("网络连接不可用", SimcereConfig.ui.toastDuration), console.error(o), t(function() {
            e.itemListErr = !e.itemList.length
          })
        }
      })
    }
  }
}]).service("subscribe", ["$timeout", "Data", "getList", function(t, e, i) {
  return function() {
    appcan.window.subscribe("EDZY/DoctorList.toggleFilter", function() {
      t(function() {
        e.isFilterPageActive = !e.isFilterPageActive
      })
    }), appcan.window.subscribe("EDZY/DoctorList.filterChange", function() {
      var o = localStorage.getItem("EDZY/DoctorList.filter"),
        a = JSON.parse(o);
      angular.extend(e, {
        hospitalName: a.hospitalName,
        doctorName: a.doctorName,
        mobile: a.mobile,
        state: a.state
      }), t(function() {
        e.isFilterPageActive = !1, e.itemList.length = 0, i()
      })
    }), appcan.window.subscribe("EDZY/DoctorList.refresh", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), e.itemList.length = 0, i()
    }), appcan.window.subscribe("EDZY/DoctorList.load", function() {
      t(function() {
        e.isFilterPageActive = !1
      }), i()
    })
  }
}]).service("openDetail", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return 3 == t.flowType && 4 == t.state ? void appcan.window.alert("提示", "无法查看封存的数据", "知道了") : (console.log(t), localStorage.setItem("EDZY/DoctorDetail.doctorId", t.id), void appcan.window.open("EDZY_DoctorDetail", "DoctorDetail.html", 10))
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", "getList", "openDetail", "getStatTxt", function(t, e, i, o, a, n) {
  t.openDetail = a, t.getStatTxt = n, o()
}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getList", function(t, e, i, o, a) {
  t.Data = i, t.sMAP = {
    "": "全部",
    0: "待审核",
    1: "通过",
    2: "不通过"
  }, t.clearHospitalName = function() {
    i.hospitalName = "", i.itemList.length = 0, a()
  }, t.clearDoctorName = function() {
    i.doctorName = "", i.itemList.length = 0, a()
  }, t.clearMobile = function() {
    i.mobile = "", i.itemList.length = 0, a()
  }, t.clearState = function() {
    "" !== i.state && (i.state = "", i.itemList.length = 0, a())
  }, o(), t.$watch("Data.isFilterPageActive", function(t, e) {
    if (t != e) {
      var o = $(window).width();
      i.isFilterPageActive ? qlib.filterSlideIn(o) : qlib.filterSlideOut(o)
    }
  })
}]);