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
    var o = {
      rId: qlib.getUser().loginId,
      name: e.keyword
    };
    console.log(o), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "hospitals",
      data: o,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, i, s, n, r) {
        console.log(o), "2" == o.status && (o.status = "0", o.data = []), "0" != o.status ? (console.error("res error"), t(function() {
          e.itemListErr = !e.itemList.length
        })) : t(function() {
          e.itemList = e.itemList.concat(o.data), e.itemListEmpty = !e.itemList.length
        })
      },
      error: function(o, i, s, n) {
        console.error("network error"), t(function() {
          e.itemListErr = !e.itemList.length
        })
      }
    })
  }
}]).service("useHospital", function() {
  return function(t) {
    var e = angular.toJson(t);
    console.log(e), localStorage.setItem("EDZY/HospitalSelect.hospital", e), appcan.window.publish("EDZY/HospitalSelect.hospitalSelected", ""), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useHospital", function(t, e, o) {
  t.useHospital = o, e()
}]).controller("GlbController", ["$scope", "Data", "getList", function(t, e, o) {
  t.Data = e, t.search = function() {
    e.isReload = !0, o()
  }
}]);