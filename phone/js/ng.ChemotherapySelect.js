angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    listActive:!1,
    keyword: "",
    itemName:"",
  }
}).service("getList",["$timeout", "Data", function(e, t) {
    return function(){
        t.itemList = qlib.getDict()[DICT_KEY.CHEMOTHERAPY];
        console.log("getList--"+t.itemList);
    }
}]).service("useRegimen", ["Data",function(d) {
  return function(e) {
    var t = angular.toJson(e);
    d.itemName = e.name;
    console.log(t), localStorage.setItem("EDZY/ZlfaSelect.regimen", t), appcan.window.publish("EDZY/ZlfaSelect"); //qlib.closeCurrentWindow(-1)
    console.log("d.itemName-------"+d.itemName);
  }
}]).controller("ItemListController", ["$scope", "getList","useRegimen", function(e, t, u) {
  e.useRegimen = u, t()
}]).controller("GlbController", ["$scope", "Data", function(e, t) {
  e.Data = t;
}]);