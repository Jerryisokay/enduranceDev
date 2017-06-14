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
}).service("subscribe",["$timeout", "Data", function(e, t) {
    return function(){
        appcan.window.subscribe("EDZY/ZlfaSelect.theraRegimenSelected", function() {
          localStorage.setItem("EDZY/ZlfaSelect.combinedTreat", ""),t.itemName = ""
        }),
        appcan.window.subscribe("EDZY/ZlfaSelect.finish", function() {
            if (!t.tabName) return void appcan.window.openToast(CR.TREATMENT_EMPTY, SimcereConfig.ui.toastDuration);
            if (t.tabName == '联合治疗' && !t.itemName) return void appcan.window.openToast(CR.COMBINE_TREATMENT_EMPTY, SimcereConfig.ui.toastDuration);
            appcan.window.publish("EDZY/ZlfaSelect.selected"), qlib.closeCurrentWindow(-1);
        });
    }
}]).service("getTab",["$timeout", "Data", function(e, t) {
    return function(){
        t.tabList = qlib.getDict()[DICT_KEY.THERAED];
        //console.log("tab--"+t.tabList);
    }
}]).service("getList",["$timeout", "Data", function(e, t) {
    return function(){
        t.itemList = qlib.getDict()[DICT_KEY.COMBINED];
        //console.log("getList--"+t.itemList);
    }
}]).service("selectTab", ["Data", function(t) {
  return function(e){
      t.tabName = e.name;
      var n = angular.toJson(e);
      console.log(n),localStorage.setItem("EDZY/ZlfaSelect.theraRegimen", n), appcan.window.publish("EDZY/ZlfaSelect.theraRegimenSelected");
      
  }
}]).service("useRegimen", ["Data", function(d) {
  return function(e) {
    var t = angular.toJson(e);
    d.itemName = e.name;
    console.log(t), localStorage.setItem("EDZY/ZlfaSelect.combinedTreat", t), appcan.window.publish("EDZY/ZlfaSelect.combinedTreatSelected"); //qlib.closeCurrentWindow(-1)
    //console.log("d.itemName-------"+d.itemName);
  }
}]).controller("TabController", ["$scope", "getTab", "selectTab", function(e, t, s) {
  e.selectTab=s, t()
}]).controller("ItemListController", ["$scope", "getList","useRegimen", function(e, t, u) {
  e.useRegimen = u, t()
}]).controller("GlbController", ["$scope", "Data","subscribe", function(e, t, i) {
  e.Data = t, i();
}]);