angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    doctor: null
  }
}).service("getDoctorDetail", ["$timeout", "Data", "$filter", "getFlow", function(o, t, e, n) {
  return function() {
    var n = localStorage.getItem("EDZY/DoctorDetail.doctorId");
    console.log("doctorId: %s", n);
    var a = {};
    console.log(a), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "doctor/" + n,
      data: a,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, a, r, i, c) {
        if (appcan.window.closeToast(), console.log(n), "0" != n.status) appcan.window.openToast(n.msg, SimcereConfig.ui.toastDuration);
        else {
          o(function() {
            t.doctor = n.data, t.doctor.productsView = e("joinProducts")(n.data.products);// t.doctor.isProjDocName = (t.doctor.state == 1) ? t.doctor.isProjDocName : "否";
          });
          var s = 'qlib.setHeaderState("' + n.data.flowType + '", "' + n.data.state + '")';
          console.log("detail----"+JSON.stringify(n.data));
          console.log(s), qlib.evalScriptInWindow("", s), localStorage.setItem("EDZY/Flow.id", n.data.flowId), console.log("FlowId: %s", n.data.flowId)
        }
      },
      error: function(o, t, e, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t)
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortDoctor", "deleteDoctor", function(o, t, e, n) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(o) {
      e(o)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(o) {
      n(o)
    })
  }
}]).service("abortDoctor", ["$timeout", "Data", "getDoctorDetail", function(o, t, e) {
  return function(o) {
    var e = {
      id: t.doctor.id,
      reason: o || ""
    };
    console.log(e), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "doctor/cancel",
      data: e,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, t, e, n, a) {
        appcan.window.closeToast(), console.log(o), "0" != o.status ? (appcan.window.openToast(o.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/DoctorList.refresh", "abortDoctor"), appcan.window.openToast(o.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(o, t, e, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t)
      }
    })
  }
}]).service("deleteDoctor", ["$timeout", "Data", "getDoctorDetail", function(o, t, e) {
  return function(o) {
    var e = t.doctor.id,
      n = {
        id: e,
        remark: o || ""
      };
    console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "doctor/delete",
      data: n,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, t, e, n, a) {
        appcan.window.closeToast(), console.log(o), "0" != o.status ? (appcan.window.openToast(o.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/DoctorList.refresh", "deleteDoctor"), appcan.window.openToast(o.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(o, t, e, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t)
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(o, t, e) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getDoctorDetail", "openFlow", function(o, t, e, n, a, r) {
  o.Data = e, o.openFlow = r, n(), a()
}]);