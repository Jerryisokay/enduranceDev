angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    keyword: ""
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    var o = {};
    console.log(o), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "positions",
      data: o,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, n, r, i, s) {
        console.log(o), "0" != o.status ? (console.error("res error"), t(function() {
          e.itemListErr = !e.itemList.length
        })) : t(function() {
          e.itemList = e.itemList.concat(o.data), e.itemListEmpty = !e.itemList.length
        })
      },
      error: function(o, n, r, i) {
        console.error("network error"), t(function() {
          e.itemListErr = !e.itemList.length
        })
      }
    })
  }
}]).service("useZw", function() {
  return function(t) {
    var e = angular.toJson(t);
    console.log(e), localStorage.setItem("EDZY/ZwSelect.Zw", e), appcan.window.publish("EDZY/ZwSelect.Zw_SELECTED", ""), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useZw", function(t, e, o) {
  t.useZw = o, e()
}]).controller("GlbController", ["$scope", "Data", function(t, e) {
  t.Data = e
}]);