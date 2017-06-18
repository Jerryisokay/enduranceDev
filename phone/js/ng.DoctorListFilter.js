angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    hospitalName: "",
    doctorName: "",
    mobile: "",
    state: "",
    _hospitalName: "",
    _doctorName: "",
    _mobile: "",
    _state: -1
  }
}).service("serviceName", ["$timeout", "Data", function(t, o) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", function(t, o) {
  return function() {
    appcan.window.subscribe("EDZY/HospitalSelect.hospitalSelected", function() {
      var e = localStorage.getItem("EDZY/HospitalSelect.hospital"),
        a = angular.fromJson(e);
      t(function() {
        o._hospitalName = a.name
      })
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(t, o, e) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", function(t, o, e, a) {
  t.Data = e, a(), t.stopPropagation = function(t) {
    t.stopPropagation()
  }, t.closeFilter = function() {
    appcan.window.publish("EDZY/DoctorList.toggleFilter", "")
  }, t.filterClear = function() {
    e._hospitalName = "", e._doctorName = "", e._mobile = "", e._state = -1
  }, t.filterConfirm = function() {
    e.hospitalName = e._hospitalName, e.doctorName = e._doctorName, e.mobile = e._mobile, e.state = e._state == -1 ? "" : e._state;
    var t = JSON.stringify(e);
    console.log("filter: %s", t), localStorage.setItem("EDZY/DoctorList.filter", t), appcan.window.publish("EDZY/DoctorList.filterChange", "")
  }, t.openHospitalSelect = function() {
    qlib.openHospitalSelect()
  }
}]);