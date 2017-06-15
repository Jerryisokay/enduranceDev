angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    listActive:!1,
    keyword: "",
  }
}).service("getList",["$timeout", "Data", function(e, t) {
    return function(){
        t.itemList = qlib.getDict()[DICT_KEY.CHEMOTHERAPY];
        console.log("getList--"+t.itemList);
    }
}]).service("useRegimen", ["Data",function(d) {
  return function(e) {
    var t = angular.toJson(e);
    console.log(t), localStorage.setItem("EDZY/HlfsSelect.regimen", t), appcan.window.publish("EDZY/HlfsSelect.selected"); qlib.closeCurrentWindow(-1)
  }
}]).controller("ItemListController", ["$scope", "getList","useRegimen", function(e, t, u) {
  e.useRegimen = u, t()
}]).controller("GlbController", ["$scope", "Data", function(e, t) {
  e.Data = t;
}]);