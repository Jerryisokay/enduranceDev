angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1
  }
}).service("getList", ["$timeout", "Data", function(e, t) {
  return function() {
    var o = {};
    console.log(o), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "medicines",
      data: o,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, n, c, i, r) {
        if (console.log(o), "0" != o.status) console.error("res error"), e(function() {
          t.itemListErr = !t.itemList.length
        });
        else {
          var s = localStorage.getItem("EDZY/ScopedProductsSelect.checkedView") || "[]";
          s = JSON.parse(s), console.log(s, o.data), _.forEach(o.data, function(e) {
            s.indexOf(e.id) > -1 && (e.checked = !0)
          }), e(function() {
            t.itemList = t.itemList.concat(o.data), t.itemListEmpty = !t.itemList.length
          })
        }
      },
      error: function(o, n, c, i) {
        console.error("network error"), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("useScopedProduct", ["Data", function(e) {
  return function() {
    var t = _.filter(e.itemList, function(e) {
      return e.checked
    });
    if (console.log(t), !t.length) return void appcan.window.openToast(CR.SCOPEDPRODUCT_EMPTY, SimcereConfig.ui.toastDuration);
    var o = angular.toJson(t);
    console.log(o), localStorage.setItem("EDZY/ScopedProductSelect.scopedProduct", o), appcan.window.publish("EDZY/ScopedProductSelect.scopedProductSelected", ""), qlib.closeCurrentWindow(-1)
  }
}]).controller("ItemListController", ["$scope", "getList", function(e, t) {
  t()
}]).controller("GlbController", ["$scope", "Data", "useScopedProduct", function(e, t, o) {
  e.Data = t, appcan.window.subscribe("EDZY/ScopedProductSelect.finish", function() {
    o()
  })
}]);