angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    name: "",
    idcard: "",
    mobile: "",
    age: "",
    sex: "",
    sexName:"",
    genderOptions: [],
    province: "",
    city: "",
    area: "",
    addr: "",
    saIncome: "",
    lcaIncome: "",
    isEmi:"",
    isEmiName:"",
    isEmiOptions:[],
    isRnum:"",
    isRnumName:"",
    isRnumOptions:[],
    isLcancer:"",
    isLcancerName:"",
    isLcancerOptions:[],
    projDocId:"",
    projDocName:"",
    mitype: "",
    miProvince:"",
    miCity:"",
    otherIns: "",
    idcardFiles: "",
    idcardFilesView: [],
    hkFiles: "",
    hkFilesView: [],
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitPatient", function(e, t, i) {
  return function() {
    appcan.window.subscribe("EDZY/AddressSelect.selected", function() {
      var i = localStorage.getItem("EDZY/AddressSelect.address"),
        n = angular.fromJson(i),
        o = (n.ssqx || "").split(",");
      e(function() {
        t.province = o[0], t.city = o[1], t.area = o[2], t.addr = n.addr, t.ssqxView = [o[0] || "", o[1] || "", o[2] || "", n.addr || ""].join("")
      })
    }), appcan.window.subscribe("EDZY/YbTypeSelect.selected", function() {
      var i = localStorage.getItem("EDZY/YbTypeSelect.item"),
        n = angular.fromJson(i);
      e(function() {
        t.mitype = n.id, t.mitypeName = n.name
      })
    }),appcan.window.subscribe("EDZY/DoctorSelect.doctorSelected", function() {
      var i = localStorage.getItem("EDZY/DoctorSelect.doctor"),
        n = angular.fromJson(i);
      e(function() {
        t.projDocId = n.id, t.projDocName = n.name
      })
    }), appcan.window.subscribe("EDZY/PatientCreate.submit", function() {
      i()
    })
  }
}]).service("openBirthdaySelect", ["$timeout", "Data", function(e, t) {
  return function() {
    qlib.openDatePicker(function(i) {
      e(function() {
        t.birthday = [i.year, i.month, i.day].join("-")
      })
    })
  }
}]).service("initGenderSelect", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = qlib.getDict()[DICT_KEY.GENDER];
    console.log(i), e(function() {
      t.genderOptions = i, t.sex = i[0].rowId, i.sexName = i[0].name
    })
  }
}]).service("setSelectedGender", ["$timeout", "Data", function(e, t) {
  return function(i) {
    e(function() {
      t.sex = i.rowId, t.sexName = i.name
    })
  }
}]).service("initIsEmi", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log(i), e(function() {
      t.isEmiOptions = i, t.isEmi = i[0].rowId,t.isEmiName = i[0].name
    })
  }
}]).service("setIsEmi", ["$timeout", "Data", function(e, t) {
  return function(i) {
    e(function() {
      t.isEmi = i.rowId,t.isEmiName = i.name
    })
  }
}]).service("initIsRnum", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log(i), e(function() {
      t.isRnumOptions = i, t.isRnum = i[0].rowId,t.isRnumName = i[0].name
    })
  }
}]).service("setIsRnum", ["$timeout", "Data", function(e, t) {
  return function(i) {
    e(function() {
      t.isRnum = i.rowId,t.isRnumName = i.name
    })
  }
}]).service("initIsLcancer", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log(i), e(function() {
      t.isLcancerOptions = i, t.isLcancer = i[0].rowId,t.isLcancerName = i[0].name
    })
  }
}]).service("setIsLcancer", ["$timeout", "Data", function(e, t) {
  return function(i) {
    e(function() {
      t.isLcancer = i.rowId,t.isLcancerName = i.name
    })
  }
}]).service("setMiArea",["$timeout", "Data", function(e, t) {
  return function(i) {
    openMiArea(function (data) {
        setTimeout(function(){
            console.log(data),t.miProvince = data.data[0],t.miCity = data.data[1],t.miArea = t.miProvince + t.miCity    
        },100);
        
    })
  }
}]).service("submitPatient", ["$timeout", "Data", function(e, t) {
  return function() {
    var e = {
      rId: qlib.getUser().loginId
    };
    $.extend(e, t), console.log(e);
    var i = "";
    return t.name ? t.sex == t.genderOptions[0].rowId ? i = "请选择性别" : t.idcard && !qlib.checkField("idCard", t.idcard) ? i = "身份证号格式错误" : qlib.checkField("number", t.age) ? qlib.checkField("phone", t.mobile) ? t.province || (i = "请设置联系地址") : i = "联系方式错误" : i = "请填写年龄" : i = "请填写姓名", i ? void appcan.window.alert("提示", i, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "patient",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, i, n, o, a) {
        console.log(t), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_PatientDetail"), appcan.window.publish("EDZY/PatientList.refresh", ""), appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow(-1)
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, i, n) {
        appcan.window.openToast(t, SimcereConfig.ui.toastDuration), console.error("network error")
      }
    }))
  }
}]).service("getPatientDetail", ["$timeout", "Data", "$filter", "imgSpliter", function(e, t, i, n) {
  return function(i) {
    console.log("patientId: %s", i);
    var o = {};
    console.log(o), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "patient/" + i,
      data: o,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(i, o, a, r, s) {
        if (appcan.window.closeToast(), console.log(i), "0" != i.status) appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration);
        else {
          var c = i.data;
          c.idcardFilesView = n(c.idcardFiles), c.hkFilesView = n(c.hkFiles), c.assApplyFilesView = n(c.assApplyFiles), c.ecoEvlFilesView = n(c.ecoEvlFiles), c.infNotiCirmFilesView = n(c.infNotiCirmFiles), c.ssqxView = [c.province || "", c.city || "", c.area || "", c.addr || ""].join(""),c.miArea = [c.miProvince || "", c.miCity || ""].join(""),  e(function() {
            angular.extend(t, i.data)
          })
        }
      },
      error: function(e, t, i, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, i) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openBirthdaySelect", "initGenderSelect", "setSelectedGender","initIsEmi","setIsEmi","initIsRnum","setIsRnum","initIsLcancer","setIsLcancer","setMiArea", "getPatientDetail", "addImage", "ngqViewImages", "ngqRemoveImage", function(e, t, i, n, o, a, r, ie, se, ir, sr, il, sl, sm, s, c, l, d) {
  e.Data = i, e.openBirthdaySelect = o, e.setSelectedGender = r, e.setIsEmi = se, e.setIsRnum = sr, e.setIsLcancer = sl, e.setMiArea =sm, e.openAddressSelect = function() {
    qlib.openAddressSelect()
  }, e.openDoctorSelect = function(){
      localStorage.setItem("EDZY/DoctorSelect.isProjDoc",'0'),
      qlib.openDoctorSelect()
  }, e.openYbTypeSelect = function() {
    qlib.openYbTypeSelect()
  }, e.addImage = c, e.ngqRemoveImage = d, e.ngqViewImages = l, n(), a(); ie(); ir(); il();
  var p = localStorage.getItem("EDZY/PatientDetail.patientIdEdit");
  if (p) {
    localStorage.removeItem("EDZY/PatientDetail.patientIdEdit"), s(p);
    var u = "setTitleEdit();";
    qlib.evalScriptInWindow("", u)
  }
}]);