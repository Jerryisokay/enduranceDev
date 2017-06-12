angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    zy: null,
    shopId: "",
    shopName: ""
  }
}).service("getZyDetail", ["$timeout", "Data", "$filter", "getFlow", "imgSpliter", function(e, o, t, i, a) {
  return function() {
    var i = localStorage.getItem("EDZY/ZyDetail.patientId");
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
          console.log("state: %s", i.data.state), "5" == i.data.state && appcan.window.publish("EDZY/ZyDetail.enableZyBtn", "");
          var l = i.data.patient;
          l.idcardFilesView = a(l.idcardFiles), l.hkFilesView = a(l.hkFiles), l.assApplyFilesView = a(l.assApplyFiles), l.ecoEvlFilesView = a(l.ecoEvlFiles), l.infNotiCirmFilesView = a(l.infNotiCirmFiles), l.ssqxView = [l.province || "", l.city || "", l.area || "", l.addr || ""].join(""), i.data.cases.forEach(function(e) {
            e.caseRepFilesView = a(e.caseRepFiles), e.caseSummFilesView = a(e.caseSummFiles), e.medImagesFilesView = a(e.medImagesFiles), e.cycles.forEach(function(e) {
              e.begin_end_View = e.beginDate + " ~ " + e.endDate, e.productsView = t("joinProducts")(e.products), e.invoiceFilesView = a(e.invoiceFiles)
            })
          }), e(function() {
            o.zy = i.data
          }), localStorage.setItem("EDZY/Flow.id", i.data.flowId), console.log("FlowId: %s", i.data.flowId)
        }
      },
      error: function(e, o, t, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("subscribe", ["$timeout", "Data", "abortZy", "deleteZy", "applyZy", function(e, o, t, i, a) {
  return function() {
    appcan.window.subscribe("EDZY/abortFlow", function(e) {
      t(e)
    }), appcan.window.subscribe("EDZY/deleteFlow", function(e) {
      i(e)
    }), appcan.window.subscribe("EDZY/ZyDetail.apply", function() {
      a()
    }), appcan.window.subscribe("EDZY/ShopSelect.shopSelected", function() {
      var t = localStorage.getItem("EDZY/ShopSelect.shop"),
        i = JSON.parse(t);
      e(function() {
        o.shopId = i.id, o.shopName = i.name
      })
    })
  }
}]).service("abortZy", ["$timeout", "Data", "getZyDetail", function(e, o, t) {
  return function(e) {
    var t = {
      id: o.zy.id,
      reason: e || ""
    };
    console.log(t), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "xxxx/cancel",
      data: t,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, i, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/ZyList.refresh", "abortZy"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("deleteZy", ["$timeout", "Data", "getZyDetail", function(e, o, t) {
  return function(e) {
    var t = o.zy.id,
      i = {
        id: t,
        remark: e || ""
      };
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "xxxx/delete",
      data: i,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, i, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/ZyList.refresh", "deleteZy"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    })
  }
}]).service("applyZy", ["$timeout", "Data", "getZyDetail", function(e, o, t) {
  return function() {
    var e = localStorage.getItem("EDZY/ZyDetail.patientId");
    console.log("Zy patientId: %s", e);
    var t = {
      rId: qlib.getUser().loginId,
      patientId: e,
      drugStoreId: o.shopId,
      drugStoreName: o.shopName
    };
    console.log(t);
    var i = "";
    return t.rId ? t.patientId ? t.drugStoreId || (i = "请选择领药药店") : i = "患者id不可为空" : i = "代表id不可为空", i ? void appcan.window.alert("提示", i, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "/med/given/apply",
      data: t,
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(e, o, t, i, a) {
        appcan.window.closeToast(), console.log(e), "0" != e.status ? (appcan.window.openToast(e.msg, SimcereConfig.ui.toastDuration), console.error("res error")) : (appcan.window.publish("EDZY/ZyList.refresh", "applyZy"), appcan.window.openToast(e.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow()
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, o, t, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error(o)
      }
    }))
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