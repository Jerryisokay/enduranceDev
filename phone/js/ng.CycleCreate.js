angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    doctorId: "",
    doctorRowId: "",
    doctorName: "",
    patientId: "",
    patientRowId: "",
    patientName: "",
    caseId: "",
    caseRowId: "",
    sn: "",
    hospitalId: "",
    deptId: "",
    tomourId: "",
    tomourName: "",
    cycleCount: "",
    cycleCountName: "",
    beginDate: "",
    endDate: "",
    begin_end_View: "",
    useCount: "",
    products: "",
    productsView: "",
    selfOrGiven: "",
    selfOrGivenOptions: [],
    comments: "",
    commentsName: "",
    invoiceFiles: "",
    invoiceFilesView: []
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitCycle", function(e, t, o) {
  function n() {
    t.patientId = "", t.patientRowId = "", t.patientName = ""
  }

  function c() {
    t.caseId = "", t.caseRowId = ""
  }
  return function() {
    appcan.window.subscribe("EDZY/DoctorSelect.doctorSelected", function() {
      var o = localStorage.getItem("EDZY/DoctorSelect.doctor"),
        i = angular.fromJson(o);
      localStorage.setItem("EDZY/CaseSelect.doctorId", i.id), e(function() {
        n(), c(), t.doctorId = i.id, t.doctorRowId = i.rowId, t.doctorName = i.name
      })
    }), appcan.window.subscribe("EDZY/PatientSelect.patientSelected", function() {
      var o = localStorage.getItem("EDZY/PatientSelect.patient"),
        n = angular.fromJson(o);
      localStorage.setItem("EDZY/CaseSelect.patientId", n.id), e(function() {
        c(), t.patientId = n.id, t.patientRowId = n.rowId, t.patientName = n.name
      })
    }), appcan.window.subscribe("EDZY/CaseSelect.caseSelected", function() {
      var o = localStorage.getItem("EDZY/CaseSelect.case"),
        n = angular.fromJson(o);
      e(function() {
        t.caseId = n.id, t.caseRowId = n.rowId, t.tomourId = n.tomourId, t.tomourName = n.tomourName, t.hospitalId = n.hospitalId, t.deptId = n.deptId, t.sn = n.sn
      })
    }), appcan.window.subscribe("EDZY/LcfqSelect.selected", function() {
      var o = localStorage.getItem("EDZY/LcfqSelect.item"),
        n = angular.fromJson(o);
      e(function() {
        t.cycleCount = n.id, t.cycleCountName = n.name
      })
    }), appcan.window.subscribe("EDZY/ScopedProductSelect.scopedProductSelected", function() {
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
    }), appcan.window.subscribe("EDZY/CycleCreate.submit", function() {
      o()
    })
  }
}]).service("openBirthdaySelect", ["$timeout", "Data", function(e, t) {
  return function() {
    qlib.openDatePicker(function(o) {
      e(function() {
        t.birthday = [o.year, o.month, o.day].join("-")
      })
    })
  }
}]).service("initOptionSelect", ["$timeout", "Data", function(e, t) {
  return function() {
    var o = qlib.getDict()[DICT_KEY.PRO_FROM];
    console.log(o), e(function() {
      t.selfOrGivenOptions = o, t.selfOrGiven = o[0].rowId
    })
  }
}]).service("setSelectedSelfOrGiven", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.selfOrGiven = o.rowId
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
      url: SimcereConfig.server.edzy + "cycle",
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
}]).service("getCycleDetail", ["$timeout", "Data", "$filter", "imgSpliter", function(e, t, o, n) {
  return function(c) {
    console.log("cycleId: %s", c);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "cycle/" + c,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(c, i, a, r, l) {
        if (appcan.window.closeToast(), console.log(c), "0" != c.status) appcan.window.openToast(c.msg, SimcereConfig.ui.toastDuration);
        else {
          var d = c.data;
          d.invoiceFilesView = n(d.invoiceFiles), d.productsView = o("joinProducts")(c.data.products), d.begin_end_View = d.beginDate + " ~ " + d.endDate, e(function() {
            angular.extend(t, c.data)
          })
        }
      },
      error: function(e, t, o, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openBirthdaySelect", "initOptionSelect", "setSelectedSelfOrGiven", "getCycleDetail", "addImage", "ngqRemoveImage", "ngqViewImages", function(e, t, o, n, c, i, a, r, l, d, s) {
  e.Data = o, e.openBirthdaySelect = c, e.addImage = l, e.ngqRemoveImage = d, e.ngqViewImages = s, e.setSelectedSelfOrGiven = a, e.openDoctorSelect = function() {
    qlib.openDoctorSelect()
  }, e.openPatientSelect = function() {
    return o.doctorId ? void qlib.openPatientSelect() : void appcan.window.alert("提示", "请先选择医生", ["知道了"])
  }, e.openCaseSelect = function() {
    return o.patientId ? (localStorage.setItem("EDZY/CaseSelect.doctorId", o.doctorId), localStorage.setItem("EDZY/CaseSelect.patientId", o.patientId), void qlib.openCaseSelect()) : void appcan.window.alert("提示", "请先选择患者", ["知道了"])
  }, e.openLcfqSelect = function() {
    qlib.openLcfqSelect()
  }, e.openDateRangeSelect = function() {
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
  }, n(), i();
  var u = localStorage.getItem("EDZY/CycleDetail.cycleIdEdit");
  if (u) {
    localStorage.removeItem("EDZY/CycleDetail.cycleIdEdit"), r(u);
    var p = "setTitleEdit();";
    qlib.evalScriptInWindow("", p)
  }
}]);