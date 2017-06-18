angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    patient: null
  }
}).service("getPatientDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, t, o, i, n) {
  return function() {
    var o = localStorage.getItem("EDZY/PatientDetail.patientId");
    console.log("patientId: %s", o);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "patient/" + o,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, i, a, r, s) {
        if (appcan.window.closeToast(), console.log(o), "0" != o.status) appcan.window.openToast(o.msg, SimcereConfig.ui.toastDuration);
        else {
          var c = o.data;
          c.idcardFilesView = n(c.idcardFiles), c.hkFilesView = n(c.hkFiles), c.assApplyFilesView = n(c.assApplyFiles), c.ecoEvlFilesView = n(c.ecoEvlFiles), c.infNotiCirmFilesView = n(c.infNotiCirmFiles), c.ssqxView = [c.province || "", c.city || "", c.area || "", c.addr || ""].join(""), e(function() {
            t.patient = o.data;
            t.patient.miArea = t.patient.miProvince + t.patient.miCity;
            console.log("data-----"+JSON.stringify(o.data));
          });
          var l = 'qlib.setHeaderState("' + o.data.flowType + '", "' + o.data.state + '")';
          console.log(l), qlib.evalScriptInWindow("", l), localStorage.setItem("EDZY/Flow.id", o.data.flowId), console.log("FlowId: %s", o.data.flowId)
        }
      },
      error: function(o, i, n, a) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(i), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortPatient", "deletePatient", function(e, t, o, i) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(e) {
      o(e)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(e) {
      i(e)
    })
  }
}]).service("abortPatient", ["$timeout", "Data", "getPatientDetail", function(e, t, o) {
  return function(e) {
    var o = {
      id: t.patient.id,
      reason: e || ""
    };
    console.log(o), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "patient/cancel",
      data: o,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, t, o, i, n) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/PatientList.refresh", "abortPatient"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t)
      }
    })
  }
}]).service("deletePatient", ["$timeout", "Data", "getPatientDetail", function(e, t, o) {
  return function(e) {
    var o = t.patient.id,
      i = {
        id: o,
        remark: e || ""
      };
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "patient/delete",
      data: i,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, t, o, i, n) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/PatientList.refresh", "deletePatient"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t)
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getPatientDetail", "openFlow", "ngqViewImages", function(e, t, o, i, n, a, r) {
  e.Data = o, e.openFlow = a, e.ngqViewImages = r, i(), n()
}]);