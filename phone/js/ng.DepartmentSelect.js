angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    var n = {};
    console.log(n), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "departments",
      data: n,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, r, o, i, s) {
        console.log(n), "0" != n.status ? (console.error("res error"), t(function() {
          e.itemListErr = !e.itemList.length
        })) : t(function() {
          e.itemList = e.itemList.concat(n.data), e.itemListEmpty = !e.itemList.length
        })
      },
      error: function(n, r, o, i) {
        console.error("network error"), t(function() {
          e.itemListErr = !e.itemList.length
        })
      }
    })
  }
}]).service("useDepartment", function() {
  return function(t) {
    var e = angular.toJson(t);
    console.log(e), localStorage.setItem("EDZY/DepartmentSelect.department", e), appcan.window.publish("EDZY/DepartmentSelect.departmentSelected", ""), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useDepartment", function(t, e, n) {
  t.useDepartment = n, e()
}]).controller("GlbController", ["$scope", "Data", function(t, e) {
  t.Data = e
}]);