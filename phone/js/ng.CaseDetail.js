angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    case: null
  }
}).service("getCaseDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, a, t, n) {
  return function() {
    var a = localStorage.getItem("EDZY/CaseDetail.caseId");
    console.log("caseId: %s", a);
    var t = {};
    console.log(t), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "case/" + a,
      data: t,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(a, t, i, s, r) {
        if (appcan.window.closeToast(), console.log(a), "0" != a.status) appcan.window.openToast(a.msg, SimcereConfig.ui.toastDuration);
        else {
          var c = a.data;
          c.caseRepFilesView = n(c.caseRepFiles), c.caseSummFilesView = n(c.caseSummFiles), c.medImagesFilesView = n(c.medImagesFiles), e(function() {
            o.case = a.data
          });
          var l = 'qlib.setHeaderState("' + a.data.flowType + '", "' + a.data.state + '")';
          console.log(l), qlib.evalScriptInWindow("", l), localStorage.setItem("EDZY/Flow.id", a.data.flowId), console.log("FlowId: %s", a.data.flowId)
        }
      },
      error: function(a, t, n, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(t), e(function() {
          o.itemListErr = !o.itemList.length
        })
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortCase", "deleteCase", function(e, o, a, t) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(e) {
      a(e)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(e) {
      t(e)
    })
  }
}]).service("abortCase", ["$timeout", "Data", "getCaseDetail", function(e, o, a) {
  return function(e) {
    var a = {
      id: o.case.id,
      reason: e || ""
    };
    console.log(a), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case/cancel",
      data: a,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, a, t, n) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/CaseList.refresh", "abortCase"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, a, t) {
        console.log(arguments), appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("deleteCase", ["$timeout", "Data", "getCaseDetail", function(e, o, a) {
  return function(e) {
    var a = o.case.id,
      t = {
        id: a,
        remark: e || ""
      };
    console.log(t), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case/delete",
      data: t,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, a, t, n) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/CaseList.refresh", "deleteCase"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, a, t) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, o, a) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getCaseDetail", "openFlow", "ngqViewImages", function(e, o, a, t, n, i, s) {
  e.Data = a, e.openFlow = i, e.ngqViewImages = s, t(), n()
}]);