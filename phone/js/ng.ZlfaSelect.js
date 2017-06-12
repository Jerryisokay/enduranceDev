angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    tabList: [],
    tabListEmpty: !1,
    tabListErr: !1,
    itemListEmpty: !1,
    itemListErr: !1,
    listActive:!1,
    keyword: "",
    tabName:"",
    itemName:"",
  }
}).service("getTab",["$timeout", "Data", function(e, t) {
    return function(){
        t.tabList = qlib.getDict()[DICT_KEY.THERAED];
        console.log("tab--"+t.tabList);
    }
}]).service("getList",["$timeout", "Data", function(e, t) {
    return function(){
        t.itemList = qlib.getDict()[DICT_KEY.COMBINED];
        console.log("getList--"+t.itemList);
    }
}]).service("selectTab", ["Data", function(t) {
  return function(e){
      t.tabName = e.name
  }
}]).service("useRegimen", ["Data", function(d) {
  return function(e) {
      if(e.name=='化疗'){
          appcan.window.open("ChemotherapySelect", 'ChemotherapySelect.html', 10);
          return;
      }
    var t = angular.toJson(e);
    d.itemName = e.name
    console.log(t), localStorage.setItem("EDZY/ZlfaSelect.regimen", t), appcan.window.publish("EDZY/ZlfaSelect"); //qlib.closeCurrentWindow(-1)
    console.log("d.itemName-------"+d.itemName);
  }
}]).controller("TabController", ["$scope", "getTab", "selectTab", function(e, t, s) {
  e.selectTab=s, t()
}]).controller("ItemListController", ["$scope", "getList","useRegimen", function(e, t, u) {
  e.useRegimen = u, t()
}]).controller("GlbController", ["$scope", "Data", function(e, t) {
  e.Data = t;
}]);