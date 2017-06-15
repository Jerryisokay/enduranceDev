angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    itemListLoaded: !1,
    patient: null,
    id:"",
  }
}).service("subscribe", ["$timeout", "Data", "getList", function(t, e, i) {
  return function() {
    appcan.window.subscribe("EDZY/YyList.refresh", function() {
      i()
    })
  }
}]).service("getPatientDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, t, o, i, n) {
    //获取患者详情
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
          c.idcardFilesView = n(c.idcardFiles), c.hkFilesView = n(c.hkFiles), c.ssqxView = [c.province || "", c.city || "", c.area || "", c.addr || ""].join(""), e(function() {
            t.patient = o.data;
            t.patient.miArea = t.patient.miProvince + t.patient.miCity;
            console.log("data-----"+JSON.stringify(o.data));
          });
          var l = 'qlib.setHeaderState("' + o.data.flowType + '", "' + o.data.state + '")';
          console.log(l), qlib.evalScriptInWindow("", l), localStorage.setItem("EDZY/Flow.id", o.data.flowId), console.log("FlowId: %s", o.data.flowId)
        }
      },
      error: function(o, i, n, a) {
        // appcan.window.openToast("网络连接不可用", 2e3), console.error(i), e(function() {
          // //t.itemListErr = !t.itemList.length
        // })
      }
    })
  }
}]).service("getList", ["$timeout", "Data", function(t, e) {
    //获取诊疗信息列表
  return function() {
    if (!e.loading) {
        e.loading = !0;
        var i = localStorage.getItem("EDZY/PatientDetail.patientId");    //EDZY/PatientDetail.patientId
        console.log("Zy patientId: %s", i);
        var n = {
          rId: qlib.getUser().loginId,
          patientId: i,
          version: '1',
        };
        console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
          type: "GET",
          url: SimcereConfig.server.edzy + "case",
          data: n,
          contentType: "application/json",
          dataType: "json",
          timeout: REQUEST_TIMEOUT,
          success: function(i, n, s, r, c) {
            e.loading = !1, appcan.window.closeToast(), console.log(i), "2" == i.status && (i.status = "0", i.data = []), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), t(function() {
                e.itemListErr = !e.itemList.length
              })) : t(function() {
                e.itemList = e.itemList.concat(i.data), e.itemListEmpty = !e.itemList.length;
                console.log("e.itemListEmpty----"+e.itemListEmpty);
              })
          },
          error: function(e, o, t, i) {
            appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
          }
        })
    }
  }
}]).service("getCycleList", ["$timeout", "Data", function(t, e) {
    return function(o) {
        o.detailActive = !o.detailActive;
        if(!o.onload)
            //根据诊疗信息Id查询用药周期
            var n = {
              caseId: o.id,
            };
            console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
              type: "GET",
              url: SimcereConfig.server.edzy + "cycle",
              data: n,
              contentType: "application/json",
              dataType: "json",
              timeout: REQUEST_TIMEOUT,
              success: function(i, n, s, r, c) {
                e.loading = !1, appcan.window.closeToast(), console.log(i), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error") : t(function() {
                    o.cycleList = e.itemList.concat(i.data)
                  })
              },
              error: function(e, o, t, i) {
                appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
              }
            })
        
    }
}).service("openCaseDetail", ["$timeout", "Data", function(e, t) {
  return function() {
    localStorage.setItem("EDZY/ZyzqDetail.patientId", t.id), void appcan.window.open("EDZY_ZyzqCreate", "ZyzqCreate.html", 10)
  }
}]).service("openCycleDetail", ["$timeout", "Data", function(e, t) {
  return function() {
    localStorage.setItem("EDZY/ZyzqDetail.patientId", t.id), void appcan.window.open("EDZY_ZyzqCreate", "ZyzqCreate.html", 10)
  }
}]).service("cycleCreate", ["$timeout", "Data", function(e, t) {
  return function() {
    localStorage.setItem("EDZY/ZyzqDetail.patientId", t.id), void appcan.window.open("EDZY_ZyzqCreate", "ZyzqCreate.html", 10)
  }
}]).service("cyclesubmit", ["$timeout", "Data", function(e, t) {
  return function() {
    localStorage.setItem("EDZY/ZyzqDetail.patientId", t.id), void appcan.window.open("EDZY_ZyzqCreate", "ZyzqCreate.html", 10)
  }
}]).service("caseCreate", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return console.log("ZyzqId: %s", t.id), localStorage.setItem("EDZY/ZyzqDetail.ZyzqId", t.id), void appcan.window.open("EDZY_ZyzqDetail", "ZyzqDetail.html", 10)
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data","getList","getCycleList", function(e, o, t, i, a, n) {
    e.openZyDetail = a, i();
}]).controller("GlbController", ["$scope", "$timeout", "Data","getPatientDetail","openFlow", "ngqViewImages","caseCreate", function(e, o, t, i, a, n, s) {
  e.Data = t, e.ngqViewImages = n, e.openFlow = a, e.caseCreate = s, i();
}]);