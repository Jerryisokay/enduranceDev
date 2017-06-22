angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    hospitalId: "",
    hospitalName: "",
    doctorName: "",
    patientName: "",
    state: "",
    _hospitalId: "",
    _hospitalName: "",
    _doctorName: "",
    _patientName: "",
    _state: -1
  }
}).service("serviceName", ["$timeout", "Data", function(t, e) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", function(t, e) {
  return function() {
    appcan.window.subscribe("EDZY/HospitalSelect.hospitalSelected", function() {
      var a = localStorage.getItem("EDZY/HospitalSelect.hospital"),
        o = angular.fromJson(a);
      t(function() {
        e._hospitalId = o.id, e._hospitalName = o.name
      })
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(t, e, a) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", function(t, e, a, o) {
  t.Data = a, o(), t.stopPropagation = function(t) {
    t.stopPropagation()
  }, t.closeFilter = function() {
    appcan.window.publish("EDZY/ZysqList.toggleFilter", "")
  }, t.filterClear = function() {
    a._hospitalId = "", a._hospitalName = "", a._doctorName = "", a._patientName = "", a._state = -1
  }, t.filterConfirm = function() {
    a.hospitalId = a._hospitalId, a.hospitalName = a._hospitalName, a.doctorName = a._doctorName, a.patientName = a._patientName, a.state = a._state == -1 ? "" : a._state;
    var t = JSON.stringify(a);
    console.log("filter: %s", t), localStorage.setItem("EDZY/ZysqList.filter", t), appcan.window.publish("EDZY/ZysqList.filterChange", "")
  }, t.openHospitalSelect = function() {
    qlib.openHospitalSelect()
  }
}]);