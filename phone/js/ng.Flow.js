angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1
  }
}).service("serviceName", ["$timeout", "Data", function(t, e) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", function(t, e) {
  return function() {
    appcan.window.subscribe("$", function() {
      var e = localStorage.getItem("$");
      angular.fromJson(e);
      t(function() {})
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(t, e, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "Flow", "retrieveFlow", "getFlow", function(t, e, o, n, r, i, a) {
  t.Data = o, t.Flow = r, a()
}]);