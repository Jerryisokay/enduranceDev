angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    rId:"",
    patientId: "",
    beginDate: "",
    endDate: "",
    begin_end_View: "",
    useCount: "",
    comments: "",
    commentsName: "",
    productValue: "恩度",
    pdTime:"",
    RegimenName:"",
    theraRegimenRowId: "",
    combinedTreatRowId:"",
    chemoRegimenRowId:"",
    theraRegimenName:"",
    combinedTreatName:"",
    chemoRegimenName:"",
    chestCtbFiles:"",
    chestCtbFilesView: [],
    caseCardFiles:"",
    caseCardFilesView: [],
    fupApplyFiles: "",
    fupApplyFilesView: [],
    aidDrugRecordsFiles: "",
    aidDrugRecordsFilesView: [],
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitCycle", function(e, t, o) {
  function n() {
    t.patientId = "", t.rId = "", t.patientName = ""
  }

  function c() {
    t.caseId = "", t.caseRowId = ""
  }
  return function() {
     appcan.window.subscribe("EDZY/ScopedProductSelect.scopedProductSelected", function() {
      var o = localStorage.getItem("EDZY/ScopedProductSelect.scopedProduct"),
        n = angular.fromJson(o);
        console.log("o------"+o),
      e(function() {
        t.productValue = _.map(n, function(e) {
          return e.name
        }).join("、")
      })
    }),appcan.window.subscribe("EDZY/ZlfaSelect.selected", function() {
      var o = localStorage.getItem("EDZY/ZlfaSelect.theraRegimen");
        console.log("o------"+o);
       var n = angular.fromJson(o);
       e(function() {
           t.theraRegimenRowId = n.rowId, t.theraRegimenName = n.name , t.RegimenName = n.name;
           var d = localStorage.getItem("EDZY/ZlfaSelect.combinedTreat");
           if(d){
               var f = JSON.parse(d);
               e(function() {
                   console.log("f------"+d),
                t.combinedTreatRowId = f.rowId, t.combinedTreatName = f.name, t.RegimenName = t.theraRegimenName + '/' + f.name;
              });
          }
      });
      
    }), appcan.window.subscribe("EDZY/YlpjSelect.selected", function() {
      var o = localStorage.getItem("EDZY/YlpjSelect.item"),
        n = angular.fromJson(o);
      e(function() {
        t.comments = n.id, t.commentsName = n.name
      })
    }), appcan.window.subscribe("EDZY/ZyzqCreate.submit", function() {
      o()
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
    var e = {
      rId: qlib.getUser().loginId
    };
    $.extend(e, t), console.log(e);
    var o = "";
    return t.doctorId ? t.patientId ? t.caseId ? t.cycleCount ? t.beginDate && t.endDate ? qlib.checkField("number", t.useCount) ? t.products.length || (o = "请选择产品") : o = "请填写用药支数" : o = "请选择用药时间段" : o = "请选择临床分期" : o = "请选择病例" : o = "请选择患者" : o = "请选择医生", o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "givencyc",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, o, n, c, i) {
        console.log(t), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_CycleDetail"), appcan.window.publish("EDZY/CycleList.refresh", ""), appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow(-1)
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, n) {
        console.error("network error")
      }
    }))
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openPDtimeSelect","addImage", "ngqRemoveImage", "ngqViewImages", function(e, t, o, n, c, r, l, d, s) {
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
  }, e.setRegimen = function(){
      appcan.window.open("ZlfaSelect", "ZlfaSelect.html", 10)
  }, n();
  var u = localStorage.getItem("EDZY/ZyzqDetail.ZyzqIdEdit");
  if (u) {
    localStorage.removeItem("EDZY/ZyzqDetail.ZyzqIdEdit"), r(u);
    var p = "setTitleEdit();";
    qlib.evalScriptInWindow("", p)
  }
}]);