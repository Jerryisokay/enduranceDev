angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    keyword: "",
    isReload: !1
  }
}).service("getList", ["$timeout", "Data", function(t, e) {
  return function() {
    e.isReload && (e.itemList.length = 0, e.isReload = !1);
    var o = localStorage.getItem("EDZY/DoctorSelect.hospitalId") || "";
    localStorage.removeItem("EDZY/DoctorSelect.hospitalId");
    var r = localStorage.getItem("EDZY/DoctorSelect.deptId") || "";
    localStorage.removeItem("EDZY/DoctorSelect.deptId");
    var i = {
      rId: qlib.getUser().loginId,
      doctorName: e.keyword,
      hospitalId: o,
      deptId: r
    };
    console.log(i), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "doctor",
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, r, i, c, n) {
        console.log(o), "2" == o.status && (o.status = "0", o.data = []), "0" != o.status ? (console.error("res error"), t(function() {
          e.itemListErr = !e.itemList.length
        })) : t(function() {
          e.itemList = e.itemList.concat(o.data), e.itemListEmpty = !e.itemList.length
        })
      },
      error: function(o, r, i, c) {
        console.error("network error"), t(function() {
          e.itemListErr = !e.itemList.length
        })
      }
    })
  }
}]).service("useDoctor", function() {
  return function(t) {
    var e = angular.toJson(t);
    console.log(e), localStorage.setItem("EDZY/DoctorSelect.doctor", e), appcan.window.publish("EDZY/DoctorSelect.doctorSelected"), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useDoctor", function(t, e, o) {
  t.useDoctor = o, e()
}]).controller("GlbController", ["$scope", "getList", "Data", function(t, e, o) {
  t.Data = o, t.search = function() {
    o.isReload = !0, e()
  }
}]);