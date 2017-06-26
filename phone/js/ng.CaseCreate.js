angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    patientId: "",
    patientRowId: "",
    patientName: "",
    hospitalId: "",
    hospitalName: "",
    deptId: "",
    deptName: "",
    doctorId: "",
    doctorRowId: "",
    doctorName: "",
    tomourId: "",
    tomourName: "",
    checkResult: "",
    checkResultOptions: [],
    isIiiOrIv: "",
    isIiiOrIvOptions: [],
    isMetastasis: "",
    isMetastasisOptions: [],
    caseRepFiles: "",
    caseRepFilesView: [],
    caseSummFiles: "",
    caseSummFilesView: [],
    medImagesFiles: "",
    medImagesFilesView: []
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitCase", function(e, t, o) {
  function i() {
    t.deptId = "", t.deptName = ""
  }

  function n() {
    t.doctorId = "", t.doctorRowId = "", t.doctorName = ""
  }
  return function() {
    appcan.window.subscribe("EDZY/PatientSelect.patientSelected", function() {
      var o = localStorage.getItem("EDZY/PatientSelect.patient"),
        i = angular.fromJson(o);
      e(function() {
        t.patientId = i.id, t.patientRowId = i.rowId, t.patientName = i.name
      })
    }), appcan.window.subscribe("EDZY/HospitalSelect.hospitalSelected", function() {
      var o = localStorage.getItem("EDZY/HospitalSelect.hospital"),
        a = angular.fromJson(o);
      e(function() {
        i(), n(), t.hospitalId = a.id, t.hospitalName = a.name
      })
    }), appcan.window.subscribe("EDZY/DepartmentSelect.departmentSelected", function() {
      var o = localStorage.getItem("EDZY/DepartmentSelect.department"),
        i = angular.fromJson(o);
      e(function() {
        n(), t.deptId = i.id, t.deptName = i.name
      })
    }), appcan.window.subscribe("EDZY/DoctorSelect.doctorSelected", function() {
      var o = localStorage.getItem("EDZY/DoctorSelect.doctor"),
        i = angular.fromJson(o);
      e(function() {
        t.doctorId = i.id, t.doctorRowId = i.rowId, t.doctorName = i.name
      })
    }), appcan.window.subscribe("EDZY/CancerSelect.cancerSelected", function() {
      var o = localStorage.getItem("EDZY/CancerSelect.cancer"),
        i = angular.fromJson(o);
      e(function() {
        t.tomourId = i.id, t.tomourName = i.name
      })
    }), appcan.window.subscribe("EDZY/CaseCreate.submit", function() {
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
    var o = qlib.getDict()[DICT_KEY.CHECK_RESULT];
    console.log(o);
    var i = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log(i);
    var n = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log(n), e(function() {
      t.checkResultOptions = o, t.checkResult = o[0].rowId, t.isIiiOrIvOptions = i, t.isIiiOrIv = i[0].rowId, t.isMetastasisOptions = n, t.isMetastasis = n[0].rowId
    })
  }
}]).service("setSelectedCheckResult", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.checkResult = o.rowId
    })
  }
}]).service("setSelectedIsIiiOrIv", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.isIiiOrIv = o.rowId
    })
  }
}]).service("setSelectedIsMetastasis", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.isMetastasis = o.rowId
    })
  }
}]).service("submitCase", ["$timeout", "Data", function(e, t) {
  return function() {
    var e = {
      rId: qlib.getUser().loginId
    };
    $.extend(e, t), console.log(e);
    var o = "";
    return t.patientId ? t.hospitalId ? t.deptId ? t.doctorId ? t.tomourId || (o = "请选择癌种") : o = "请选择医生" : o = "请选择科室" : o = "请选择医院" : o = "请选择患者", o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, o, i, n, a) {
        console.log(t), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_CaseDetail"), appcan.window.publish("EDZY/CaseList.refresh", ""), appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow(-1)
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, i) {
        console.error("network error")
      }
    }))
  }
}]).service("getCaseDetail", ["$timeout", "Data", "$filter", "imgSpliter", function(e, t, o, i) {
  return function(o) {
    console.log("caseId: %s", o);
    var n = {};
    console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "case/" + o,
      data: n,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, n, a, c, s) {
        if (appcan.window.closeToast(), console.log(o), "0" != o.status) appcan.window.openToast(o.msg, SimcereConfig.ui.toastDuration);
        else {
          var r = o.data;
          r.caseRepFilesView = i(r.caseRepFiles), r.caseSummFilesView = i(r.caseSummFiles), r.medImagesFilesView = i(r.medImagesFiles), e(function() {
            angular.extend(t, o.data)
          })
        }
      },
      error: function(e, t, o, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openBirthdaySelect", "initOptionSelect", "setSelectedCheckResult", "setSelectedIsIiiOrIv", "setSelectedIsMetastasis", "getCaseDetail", "addImage", "ngqRemoveImage", "ngqViewImages", function(e, t, o, i, n, a, c, s, r, l, d, u, p) {
  e.Data = o, e.openBirthdaySelect = n, e.addImage = d, e.ngqRemoveImage = u, e.ngqViewImages = p, e.setSelectedCheckResult = c, e.setSelectedIsIiiOrIv = s, e.setSelectedIsMetastasis = r, e.openPatientSelect = function() {
    qlib.openPatientSelect()
  }, e.openHospitalSelect = function() {
    qlib.openHospitalSelect()
  }, e.openDepartmentSelect = function() {
    return o.hospitalId ? void qlib.openDepartmentSelect() : void appcan.window.alert("提示", "请先选择医院", ["知道了"])
  }, e.openDoctorSelect = function() {
    return localStorage.setItem("EDZY/DoctorSelect.hospitalId", o.hospitalId), localStorage.setItem("EDZY/DoctorSelect.deptId", o.deptId), o.deptId ? void qlib.openDoctorSelect() : void appcan.window.alert("提示", "请先选择科室", ["知道了"])
  }, e.openCancerSelect = function() {
    qlib.openCancerSelect()
  }, i(), a();
  var m = localStorage.getItem("EDZY/CaseDetail.caseIdEdit");
  if (m) {
    localStorage.removeItem("EDZY/CaseDetail.caseIdEdit"), l(m);
    var I = "setTitleEdit();";
    qlib.evalScriptInWindow("", I)
  }
}]);