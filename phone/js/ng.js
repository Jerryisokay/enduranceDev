angular.module("ngq", []).filter("joinProducts", [function() {
  return function(e) {
    return _.map(e, function(e) {
      return e.name
    }).join("、")
  }
}]).service("Flow", function() {
  return {
    items: [],
    state: "",
    isEmpty: !1
  }
}).service("getStatTxt", function() {
  var e = {
    1: {
      0: "待审核",
      1: "审批通过",
      2: "审核不通过",
      3: "",
      4: ""
    },
    2: {
      0: "待审核",
      1: "审批通过",
      2: "审核不通过",
      3: "审批通过",
      4: "已封存"
    },
    3: {
      0: "待审核",
      1: "已封存",
      2: "封存已驳回",
      3: "审批通过",
      4: "已封存"
    }
  };
  return function(n, o) {
    var t;
    try {
      t = e[n][o]
    } catch (e) {
      t = n + " " + o
    }
    return t || n + " " + o
  }
}).service("openFlow", [function() {
  return function(e) {
    qlib.openFlow()
  }
}]).service("retrieveFlow", ["$timeout", "Flow", function(e, n) {
  return function() {
    var o = localStorage.getItem("EDZY_Flow.data"),
      t = JSON.parse(o);
    e(function() {
      n.data = t
    })
  }
}]).service("getFlow", ["$timeout", "Flow", function(e, n) {
  return function(o, t) {
    o = localStorage.getItem("EDZY/Flow.id");
    console.log("flowId----"+o);
    var r = {};
    console.log(r), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "process/" + o,
      data: r,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(o, t, r, a, i) {
        appcan.window.closeToast(), console.log(o), "0" != o.status ? console.error("res error") : e(function() {
          n.data = o.data, n.isEmpty = !o.data.items.length
        })
      },
      error: function(e, n, o, t) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).service("ngqOpenImageBrowser", function() {
  return function(e) {
    uexImage.onPickerClosed = function(n) {
      console.log("uexImage.onPickerClosed: " + n);
      var o = JSON.parse(n);
      o.isCancelled ? console.log("uexImage.isCancelled") : o.data.length ? e(o.data[0]) : console.warn("图片列表为空")
    };
    var n = {
        min: 1,
        max: 1,
        quality: 1,
        usePng: !1,
        detailedInfo: !1
      },
      o = JSON.stringify(n);
    uexImage.openPicker(o)
  }
}).service("ngqOpenCamera", function() {
  return function(e) {
    uexCamera.cbOpen = function(n, o, t) {
      console.log("uexCamera.cbOpen image took: " + t), e(t)
    }, uexCamera.open()
  }
}).service("ngqUploadFile", function() {
  return function(e) {
    uexUploaderMgr.cbCreateUploader = function(n, o) {
      appcan.window.openToast("上传中"), console.log("uexUploaderMgr.uploadFile with params: opid=>" + n + ", filePath: " + e.filePath), uexUploaderMgr.uploadFile(n, e.filePath, "file", 1, 800)
    }, uexUploaderMgr.onStatus = function(n, o, t, r, a) {
      switch (a) {
        case 0:
          break;
        case 1:
          e.success && e.success.call(null, r), setTimeout(function() {
            uexUploaderMgr.closeUploader(n)
          }, 500);
          break;
        case 2:
          e.error && e.error.call(null, n), uexUploaderMgr.closeUploader(n)
      }
    }, uexUploaderMgr.createUploader(_.random(0, 999999), e.serverUrl)
  }
}).service("ngqActionSheet", function() {
  return function(e, n, o, t) {
    uexWindow.cbActionSheet = function(e, n, o) {
      console.log("cbActionSheet: " + o), t(o)
    }, uexWindow.actionSheet(e || "选择", n || "取消 ", o)
  }
}).service("ngqRemoveItem", function() {
  return function(e, n) {
    var o = e.indexOf(n);
    e.splice(o, 1)
  }
}).service("ngqRemoveImage", function() {
  return function(e, n, o) {
    e[n + "View"].splice(o, 1);
    var t = e[n].split(",");
    t.splice(o, 1), e[n] = t.join(",")
  }
}).service("ngqViewImages", function() {
  return function(e) {
    var n = e.urls,
      o = 0;
    e.index ? o = e.index : e.url && (o = e.urls.indexOf(e.url)), o < 0 && (o = 0), console.log(n, o);
    var t = {
        displayActionButton: !1,
        displayNavArrows: !1,
        enableGrid: !1,
        startOnGrid: !1,
        startIndex: o,
        data: n
      },
      r = JSON.stringify(t);
    uexImage.openBrowser(r)
  }
}).service("imgSpliter", function() {
  return function(e) {
    var n, o = IMG_BASE_URL;
    return n = e ? e.split(",").map(function(e, n, t) {
      return o + e
    }) : []
  }
}).service("updateImgList", ["$timeout", function(e) {
  return function(n, o, t) {
    var r = IMG_BASE_URL,
      a = r + t,
      i = n[o] || "";
    i = "" == i ? [] : i.split(","), i.push(t), e(function() {
      n[o] = i.join(","), n[o + "View"].push(a)
    })
  }
}]).service("addImage", ["$timeout", "ngqActionSheet", "ngqOpenImageBrowser", "ngqOpenCamera", "ngqUploadFile", "updateImgList", function(e, n, o, t, r, a) {
  return function(e, i) {
    function c(n) {
      var o = JSON.parse(n),
        t = o.data;
      "0" != o.status ? appcan.window.openToast(o.msg || "上传失败", SimcereConfig.ui.toastDuration) : a(e, i, t)
    }

    function u(e) {
      var n = {
        filePath: e,
        serverUrl: SimcereConfig.server.edzy + "upload",
        progress: function(e) {
          s(e)
        },
        success: function(e) {
          appcan.window.closeToast(), c(e)
        },
        error: function() {
          appcan.window.closeToast(), appcan.window.openToast("上传失败", SimcereConfig.ui.toastDuration)
        }
      };
      JSON.stringify(n, "", 2);
      r(n)
    }
    var s = _.throttle(function(e) {
      appcan.window.openToast(e), 100 == e && appcan.window.closeToast()
    }, 300);
    n("上传图片", "取消", ["相册", "相机"], function(e) {
      "0" == e ? o(u) : "1" == e && t(u)
    })
  }
}]);