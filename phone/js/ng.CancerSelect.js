angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    keyword: ""
  }
}).service("getList", ["$timeout", "Data", function(e, t) {
  return function() {
    var n = {};
    console.log(n), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "cancers",
      data: n,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, r, o, i, c) {
        console.log(n), "0" != n.status ? (console.error("res error"), e(function() {
          t.itemListErr = !t.itemList.length
        })) : e(function() {
          t.itemList = t.itemList.concat(n.data), t.itemListEmpty = !t.itemList.length
        })
      },
      error: function(n, r, o, i) {
        console.error("network error"), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("useCancer", function() {
  return function(e) {
    var t = angular.toJson(e);
    console.log(t), localStorage.setItem("EDZY/CancerSelect.cancer", t), appcan.window.publish("EDZY/CancerSelect.cancerSelected"), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useCancer", function(e, t, n) {
  e.useCancer = n, t()
}]).controller("GlbController", ["$scope", "Data", function(e, t) {
  e.Data = t
}]);