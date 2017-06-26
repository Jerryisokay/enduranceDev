angular.module("myApp", ["ngTouch", "ngq"]).service("Data", function() {
  return {
    doctorName: "",
    patientName: "",
    tomourId: "",
    tomourName: "",
    state: "",
    _doctorName: "",
    _patientName: "",
    _tomourId: "",
    _tomourName: "",
    _state: -1
  }
}).service("serviceName", ["$timeout", "Data", function(t, e) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", function(t, e) {
  return function() {
    appcan.window.subscribe("EDZY/CancerSelect.cancerSelected", function() {
      var o = localStorage.getItem("EDZY/CancerSelect.cancer"),
        a = angular.fromJson(o);
      t(function() {
        e._tomourId = a.id, e._tomourName = a.name
      })
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(t, e, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", function(t, e, o, a) {
  t.Data = o, a(), t.stopPropagation = function(t) {
    t.stopPropagation()
  }, t.closeFilter = function() {
    appcan.window.publish("EDZY/CycleList.toggleFilter", "")
  }, t.filterClear = function() {
    o._doctorName = "", o._patientName = "", o._tomourId = "", o._tomourName = "", o._state = -1
  }, t.filterConfirm = function() {
    o.doctorName = o._doctorName, o.patientName = o._patientName, o.tomourId = o._tomourId, o.tomourName = o._tomourName, o.state = o._state == -1 ? "" : o._state;
    var t = JSON.stringify(o);
    console.log("filter: %s", t), localStorage.setItem("EDZY/CycleList.filter", t), appcan.window.publish("EDZY/CycleList.filterChange", "")
  }, t.openCancerSelect = function() {
    qlib.openCancerSelect()
  }
}]);