angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    keyword: "",
    isReload: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    e.isReload && (e.itemList.length = 0, e.isReload = !1);
    var i = {
      rId: qlib.getUser().loginId,
      patientName: e.keyword
    };
    console.log(i), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "patient",
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(i, n, o, r, s) {
        console.log(i), "2" == i.status && (i.status = "0", i.data = []), "0" != i.status ? (console.error("res error"), t(function() {
          e.itemListErr = !e.itemList.length
        })) : t(function() {
          e.itemList = e.itemList.concat(i.data), e.itemListEmpty = !e.itemList.length
        })
      },
      error: function(i, n, o, r) {
        console.error("network error"), t(function() {
          e.itemListErr = !e.itemList.length
        })
      }
    })
  }
}]).service("usePatient", function() {
  return function(t) {
    var e = angular.toJson(t);
    console.log(e), localStorage.setItem("EDZY/PatientSelect.patient", e), appcan.window.publish("EDZY/PatientSelect.patientSelected"), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "usePatient", function(t, e, i) {
  t.usePatient = i, e()
}]).controller("GlbController", ["$scope", "getList", "Data", function(t, e, i) {
  t.Data = i, t.search = function() {
    i.isReload = !0, e()
  }
}]);