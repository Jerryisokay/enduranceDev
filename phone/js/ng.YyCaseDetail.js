angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    begin_end_View:"",
    cycle: null
  }
}).service("getCaseDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, t, n, a) {
  return function() {
    var n = localStorage.getItem("EDZY/YyCaseDetail.CaseId");
    console.log("CaseId: %s", n);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "case/" + n,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, i, c, r, s) {
        if (appcan.window.closeToast(), console.log(n), "0" != n.status) appcan.window.openToast(n.msg, SimcereConfig.ui.toastDuration);
        else {
          var l = n.data;
          l.caseRepFilesView = a(l.caseRepFiles),l.chestCTBFilesView = a(l.chestCTBFiles),l.chestCTFFilesView = a(l.chestCTFFiles), l.assApplyFilesView = a(l.assApplyFiles), l.infNotiCirmFilesView = a(l.infNotiCirmFiles), l.ecoEvlFilesView = a(l.ecoEvlFiles), e(function() {
            o.yycase = n.data , console.log("detail-----"+JSON.stringify(o)), o.yycase.RegimenName = (!l.combinedTreatName) ? l.theraRegimenName : l.theraRegimenName+"/"+l.combinedTreatName
          });
          //var u = 'qlib.setHeaderState("' + n.data.flowType + '", "' + n.data.state + '")';
          //console.log(u), qlib.evalScriptInWindow("", u), 
          localStorage.setItem("EDZY/Flow.id", n.data.flowId), console.log("FlowId: %s", n.data.flowId);
            var u = 'setHeaderState("' + n.data.state + '")';
            console.log(u), qlib.evalScriptInWindow("", u);
        }
      },
      error: function(t, n, a, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(n), e(function() {
          o.itemListErr = !o.itemList.length
        })
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortCase", "deleteCase", function(e, o, t, n) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(e) {
      t(e)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(e) {
      n(e)
    })
  }
}]).service("abortCase", ["$timeout", "Data", "getCaseDetail", function(e, o, t) {
  return function(e) {
    var t = {
      id: o.yycase.id,
      reason: e || ""
    };
    console.log(t), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case/cancel",
      data: t,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, n, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/YyList.refresh", "abortCase"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, n) {
        console.log(arguments), appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("deleteCase", ["$timeout", "Data", "getCaseDetail", function(e, o, t) {
  return function(e) {
    var t = o.yycase.id,
      n = {
        id: t,
        remark: e || ""
      };
    console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case/delete",
      data: n,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, n, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/YyList.refresh", "deleteCase"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, o, t) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getCaseDetail", "ngqViewImages","openFlow", function(e, o, t, n, a, c, i) {
  e.Data = t, e.ngqViewImages = c, e.openFlow = i, n(), a()
}]);