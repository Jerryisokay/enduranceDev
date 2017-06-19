angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    beginDate: "",
    endDate: "",
    begin_end_View: "",
    useCount: "",
    comments: "",
    commentsName: "",
    productsView: "",
    pdTime:"",
    invoiceFiles:"",
    invoiceFilesView: [],
    caseCardFiles:"",
    caseCardFilesView: [],
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitCycle", function(e, t, o) {
  
  function c(){
      t.chemoRegimenRowId = "", t.chemoRegimenName = ""
  }
  
  return function() {
     appcan.window.subscribe("EDZY/ScopedProductSelect.scopedProductSelected", function() {
      var o = localStorage.getItem("EDZY/ScopedProductSelect.scopedProduct"),
        n = angular.fromJson(o);
          e(function() {
            t.products = n, t.productsView = _.map(n, function(e) {
              return e.name
            }).join("、")
        })
      }), appcan.window.subscribe("EDZY/YlpjSelect.selected", function() {
      var o = localStorage.getItem("EDZY/YlpjSelect.item"),
        n = angular.fromJson(o);
          e(function() {
            t.comments = n.id, t.commentsName = n.name
          })
    }), appcan.window.subscribe("EDZY/yyCycleCreate.submit", function() {
      o()
    })
  }
}]).service("getCycleDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, t, n, a) {
  return function(id) {
    console.log("CycleId: %s", id);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "cycle/" + id,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, i, c, r, s) {
        if (appcan.window.closeToast(), console.log(n), "0" != n.status) appcan.window.openToast(n.msg, SimcereConfig.ui.toastDuration);
        else {
          var l = n.data;
          l.caseCardFilesView = a(l.caseCardFiles),l.invoiceFilesView = a(l.invoiceFiles), e(function() {
            angular.extend(o, n.data), o.begin_end_View = l.beginDate + " ~ " + l.endDate ,o.productsView = t("joinProducts")(n.data.products), console.log("detail-----"+JSON.stringify(o))
          });
          
        }
      },
      error: function(t, n, a, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(n), e(function() {
          o.itemListErr = !o.itemList.length
        })
      }
    })
  }
}]).service("openPDtimeSelect", ["$timeout", "Data", function(e, t) {
  return function() {
    qlib.openDatePicker(function(o) {
      e(function() {
        t.pdTime = [o.year, o.month, o.day].join("-")
      })
    })
  }
}]).service("submitCycle", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = localStorage.getItem("EDZY/YyCaseDetail.CaseId");    //EDZY/PatientDetail.patientId
    console.log("yy CaseId: %s", i);
    var e = {
      rId: qlib.getUser().loginId,
      caseId:i,
    };
    $.extend(e, t), console.log("param---"+JSON.stringify(e));
    var o = "";
    //return t.doctorId ? t.patientId ? t.caseId ? t.cycleCount ? t.beginDate && t.endDate ? qlib.checkField("number", t.useCount) ? t.products.length || (o = "请选择产品") : o = "请填写用药支数" : o = "请选择用药时间段" : o = "请选择临床分期" : o = "请选择病例" : o = "请选择患者" : o = "请选择医生", o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
    return t.beginDate && t.endDate ? qlib.checkField("number", t.useCount) ? t.products.length || (o = "请选择产品") : o = "请填写用药支数" : o = "请选择用药时间段" , o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "cycle",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, o, n, c, i) {
        console.log("CycleCreate---"+JSON.stringify(t)), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_YyCycleDetail"), appcan.window.publish("EDZY/YyList.refresh", ""), appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow(-1)
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, n) {
        console.error("network error")
      }
    }))
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openPDtimeSelect", "getCycleDetail","addImage", "ngqRemoveImage", "ngqViewImages", function(e, t, o, n, c, r, l, d, s) {
  e.Data = o, e.openPDtimeSelect = c, e.addImage = l, e.ngqRemoveImage = d, e.ngqViewImages = s, e.openDateRangeSelect = function() {
    var e = function(e) {
      console.log(e), t(function() {
        o.beginDate = e.begin, o.endDate = e.end, o.begin_end_View = e.begin + " ~ " + e.end
      })
    };
    qlib.openDateRangeSelect(e, "2", "0")
  }, e.openProductSelect = function() {
    qlib.openScopedProductSelect()
  }, e.openYlpjSelect = function() {
    qlib.openYlpjSelect()
  }, n();
  var u = localStorage.getItem("EDZY/YyCycleDetail.cycleIdEdit");
  if (u) {
      console.log("编辑");
    localStorage.removeItem("EDZY/YyCycleDetail.cycleIdEdit"), r(u);
    var p = "setTitleEdit();";
    qlib.evalScriptInWindow("", p)
  }
}]);