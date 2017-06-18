angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    begin_end_View:"",
    cycle: null
  }
}).service("getCycleDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, t, n, a) {
  return function() {
    var n = localStorage.getItem("EDZY/YyCycleDetail.cycleId");
    console.log("cycleId: %s", n);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "cycle/" + n,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, i, c, r, s) {
        if (appcan.window.closeToast(), console.log(n), "0" != n.status) appcan.window.openToast(n.msg, SimcereConfig.ui.toastDuration);
        else {
          var l = n.data;
          l.caseCardFilesView = a(l.caseCardFiles),l.invoiceFilesView = a(l.invoiceFiles), e(function() {
            o.cycle = n.data, o.cycle.begin_end_View = l.beginDate + " ~ " + l.endDate ,o.cycle.productsView = t("joinProducts")(n.data.products), console.log("detail-----"+JSON.stringify(o))
          });
          //var u = 'qlib.setHeaderState("' + n.data.flowType + '", "' + n.data.state + '")';
          //console.log(u), qlib.evalScriptInWindow("", u), localStorage.setItem("EDZY/Flow.id", n.data.flowId), console.log("FlowId: %s", n.data.flowId)
        }
      },
      error: function(t, n, a, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(n), e(function() {
          o.itemListErr = !o.itemList.length
        })
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortCycle", "deleteCycle", function(e, o, t, n) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(e) {
      t(e)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(e) {
      n(e)
    })
  }
}]).service("abortCycle", ["$timeout", "Data", "getCycleDetail", function(e, o, t) {
  return function(e) {
    var t = {
      id: o.cycle.id,
      reason: e || ""
    };
    console.log(t), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "cycle/cancel",
      data: t,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, n, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/ZyList.refresh", "abortCycle"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, n) {
        console.log(arguments), appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("deleteCycle", ["$timeout", "Data", "getCycleDetail", function(e, o, t) {
  return function(e) {
    var t = o.cycle.id,
      n = {
        id: t,
        remark: e || ""
      };
    console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "cycle/delete",
      data: n,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, n, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/ZyList.refresh", "deleteCycle"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, o, t) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getCycleDetail", "openFlow", "ngqViewImages", function(e, o, t, n, a, i, c) {
  e.Data = t, e.openFlow = i, e.ngqViewImages = c, n(), a()
}]);