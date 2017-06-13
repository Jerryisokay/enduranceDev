angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    zy: null,
    shopId: "",
    shopName: "",
    id:"",
  }
}).service("getPatientDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, t, o, i, n) {
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
}]).service("getZyList", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, t, i, a) {
    //获取赠药周期列表
  return function() {
    var i = localStorage.getItem("EDZY/PatientDetail.patientId");    //EDZY/PatientDetail.patientId
    console.log("Zy patientId: %s", i);
    var n = {
      rId: qlib.getUser().loginId,
      patientId: i
    };
    console.log(n), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "givencyc",
      data: n,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(i, n, s, r, c) {
        if (appcan.window.closeToast(), console.log(i), "0" != i.status) appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration);
        else {
          console.log("state: %s", i.data.state), "5" == i.data.state;
        }
      },
      error: function(e, o, t, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("addZy", ["$timeout", "Data", function(e, t) {
  return function() {
    return console.log("patientId: %s", t.id), localStorage.setItem("EDZY/ZyDetail.patientId", t.id), void appcan.window.open("EDZY_ZyAdd", "ZyAdd.html", 10)
  }
}]).service("openZyDetail", ["$timeout", "Data", function(t, e) {
  return function(t) {
    return console.log("patientId: %s", t.id), localStorage.setItem("EDZY/ZyDetail.patientId", t.id), void appcan.window.open("EDZY_ZyDetail", "ZyDetail.html", 10)
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, o, t) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getZyDetail", "openFlow", "ngqViewImages", function(e, o, t, i, a, n, s) {
  e.Data = t, e.ngqViewImages = s, e.openFlow = n, e.sMAP = {
    "": "全部",
    0: "待审核",
    1: "通过",
    2: "不通过"
  }, e.openShopSelect = function() {
    return "5" != t.zy.state ? void appcan.window.openToast("当前患者未满足赠药条件", SimcereConfig.ui.toastDuration) : void qlib.openShopSelect()
  }, e.togglePatient = function() {
    t.isPatientDetailActive = !t.isPatientDetailActive
  }, e.toggleCase = function() {
    t.isCaseDetailActive = !t.isCaseDetailActive
  }, e.toggleCycle = function() {
    t.isCycleDetailActive = !t.isCycleDetailActive
  }, i(), a()
}]);