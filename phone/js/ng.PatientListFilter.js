angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    patientName: "",
    idcard: "",
    state: "",
    _patientName: "",
    _idcard: "",
    _state: -1
  }
}).service("serviceName", ["$timeout", "Data", function(t, e) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", function(t, e) {
  return function() {}
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(t, e, i) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", function(t, e, i, a) {
  t.Data = i, a(), t.stopPropagation = function(t) {
    t.stopPropagation()
  }, t.closeFilter = function() {
    appcan.window.publish("EDZY/PatientList.toggleFilter", "")
  }, t.filterClear = function() {
    i._patientName = "", i._idcard = "", i._state = -1
  }, t.filterConfirm = function() {
    i.patientName = i._patientName, i.idcard = i._idcard, i.state = i._state == -1 ? "" : i._state;
    var t = JSON.stringify(i);
    console.log("filter: %s", t), localStorage.setItem("EDZY/PatientList.filter", t), appcan.window.publish("EDZY/PatientList.filterChange", "")
  }
}]);