angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    keyword: "",
    isReload: !1
  }
}).service("getList", ["$timeout", "Data", function(e, t) {
  return function() {
    t.isReload && (t.itemList.length = 0, t.isReload = !1);
    var o = localStorage.getItem("EDZY/CaseSelect.patientId") || "",
      s = localStorage.getItem("EDZY/CaseSelect.doctorId") || "",
      i = {
        rId: qlib.getUser().loginId,
        patientId: o,
        doctorId: s
      };
    console.log(i), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "case",
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, s, i, n, r) {
        console.log(o), "2" == o.status && (o.status = "0", o.data = []), "0" != o.status ? (console.error("res error"), e(function() {
          t.itemListErr = !t.itemList.length
        })) : e(function() {
          t.itemList = t.itemList.concat(o.data), t.itemListEmpty = !t.itemList.length
        })
      },
      error: function(o, s, i, n) {
        console.error("network error"), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("useCase", function() {
  return function(e) {
    var t = angular.toJson(e);
    console.log(t), localStorage.setItem("EDZY/CaseSelect.case", t), appcan.window.publish("EDZY/CaseSelect.caseSelected"), qlib.closeCurrentWindow(-1)
  }
}).controller("ItemListController", ["$scope", "getList", "useCase", function(e, t, o) {
  e.useCase = o, t()
}]).controller("GlbController", ["$scope", "getList", "Data", function(e, t, o) {
  e.Data = o, e.search = function() {
    o.isReload = !0, t()
  }
}]);