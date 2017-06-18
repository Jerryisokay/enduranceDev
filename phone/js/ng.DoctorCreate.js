angular.module("myApp", ["ngq"]).service("Data", function() {
  console.log("Data");
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    hospitalId: "",
    hospitalName: "",
    province: "",
    city: "",
    area: "",
    addr: "",
    deptId: "",
    deptName: "",
    name: "",
    genderOptions: [],
    sex: "",
    sexName: "",
    positionId: "",
    positionName: "",
    titleId: "",
    titleName: "",
    products: "",
    productsView: [],
    idcard: "",
    mobile: "",
    email: "",
    birthday: "",
    isProjDocOptions:[],
    isProjDoc: "",
    isProjDocName:""
  }
}).service("serviceName", ["$timeout", "Data", function(e, t) {
  return function() {}
}]).service("subscribe", ["$timeout", "Data", "submitDoctor", function(e, t, o) {
  return function() {
    appcan.window.subscribe("EDZY/HospitalSelect.hospitalSelected", function() {
      var o = localStorage.getItem("EDZY/HospitalSelect.hospital"),
        n = angular.fromJson(o);
      e(function() {
        t.hospitalId = n.id, t.hospitalName = n.name, t.province = "", t.city = "", t.area = "", t.addr = n.addr
      })
    }), appcan.window.subscribe("EDZY/DepartmentSelect.departmentSelected", function() {
      var o = localStorage.getItem("EDZY/DepartmentSelect.department"),
        n = angular.fromJson(o);
      e(function() {
        t.deptId = n.id, t.deptName = n.name
      })
    }), appcan.window.subscribe("EDZY/ZwSelect.Zw_SELECTED", function() {
      var o = localStorage.getItem("EDZY/ZwSelect.Zw"),
        n = angular.fromJson(o);
      e(function() {
        t.positionId = n.id, t.positionName = n.name
      })
    }), appcan.window.subscribe("EDZY/ZcSelect.ZcSelected", function() {
      var o = localStorage.getItem("EDZY/ZcSelect.Zc"),
        n = angular.fromJson(o);
      e(function() {
        t.titleId = n.id, t.titleName = n.name
      })
    }), appcan.window.subscribe("EDZY/ScopedProductSelect.scopedProductSelected", function() {
      var o = localStorage.getItem("EDZY/ScopedProductSelect.scopedProduct"),
        n = angular.fromJson(o);
      e(function() {
        t.products = n, t.productsView = _.map(n, function(e) {
          return e.name
        }).join("、")
      })
    }), appcan.window.subscribe("EDZY/DoctorCreate.submit", function() {
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
}]).service("initGenderSelect", ["$timeout", "Data", function(e, t) {
  return function() {
    var o = qlib.getDict()[DICT_KEY.GENDER];
    console.log(o), e(function() {
      t.genderOptions = o, t.sex = o[0].rowId, t.sexName = o[0].name
    })
  }
}]).service("setSelectedGender", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.sex = o.rowId,t.sexName = o.name
    })
  }
}]).service("initIsProjDoc", ["$timeout", "Data", function(e, t) {
  return function() {
    var o = qlib.getDict()[DICT_KEY.BOOLEAN];
    console.log("BOOLEAN----"+o), e(function() {
      t.isProjDocOptions = o, t.isProjDoc = o[0].rowId, t.isProjDocName = o[0].name
    })
  }
}]).service("setIsProjDoc", ["$timeout", "Data", function(e, t) {
  return function(o) {
    e(function() {
      t.isProjDoc = o.rowId,t.isProjDocName = o.name;
      //console.log("data-----"+JSON.stringify(t));
    })
  }
}]).service("submitDoctor", ["$timeout", "Data", function(e, t) {
  return function() {
    var e = {
      rId: qlib.getUser().loginId
    };
    $.extend(e, t), console.log("e----"+e);
    var o = "";
    return t.hospitalId ? t.deptId ? t.name ? t.positionId ? t.titleId ? t.products.length ? t.idcard && !qlib.checkField("idCard", t.idcard) ? o = "身份证格式错误" : t.mobile && !qlib.checkField("phone", t.mobile) ? o = "手机号码格式错误" : t.email && !qlib.checkField("email", t.email) && (o = "邮箱格式错误") : o = "请选择涉及产品" : o = "请选择职称" : o = "请选择职务" : o = "请输入医生姓名" : o = "请选择科室" : o = "请选择医院", o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "doctor",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, o, n, i, c) {
        console.log(t), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_DoctorDetail"), appcan.window.publish("EDZY/DoctorList.refresh", "submitDoctor"), appcan.window.openToast(t.msg, SimcereConfig.ui.toastDurationCb), setTimeout(function() {
          qlib.closeCurrentWindow(-1)
        }, SimcereConfig.ui.toastDurationCb))
      },
      error: function(e, t, o, n) {
        console.error("network error")
      }
    }))
  }
}]).service("getDoctorDetail", ["$timeout", "Data", "$filter", function(e, t, o) {
  return function(n) {
    console.log("doctorId: %s", n);
    var i = {};
    console.log(i), appcan.window.openToast(CR.TOAST_WAITING), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "doctor/" + n,
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(n, i, c, r, a) {
        appcan.window.closeToast(), console.log(n), "0" != n.status ? appcan.window.openToast(n.msg, SimcereConfig.ui.toastDuration) : e(function() {
          angular.extend(t, n.data), t.productsView = o("joinProducts")(n.data.products)
        })
      },
      error: function(e, t, o, n) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "openBirthdaySelect", "initGenderSelect", "setSelectedGender", "initIsProjDoc", "setIsProjDoc", "getDoctorDetail", function(e, t, o, n, i, c, r, p, s, a) {
  console.log("controller-----"+JSON.stringify(o));
  console.log("n----"+n);
  e.Data = o, e.openBirthdaySelect = i, e.setSelectedGender = r, e.setIsProjDoc = s, e.openHospitalSelect = function() {
    qlib.openHospitalSelect()
  }, e.openDepartmentSelect = function() {
    qlib.openDepartmentSelect()
  }, e.openZwSelect = function() {
    qlib.openZwSelect()
  }, e.openZcSelect = function() {
    qlib.openZcSelect()
  }, e.openScopedProductSelect = function() {
    console.log(o.products);
    var e = _.map(o.products, function(e) {
        return e.id
      }),
      t = JSON.stringify(e);
    localStorage.setItem("EDZY/ScopedProductsSelect.checkedView", t), qlib.openScopedProductSelect()
  }, n(), c(); p();
  var l = localStorage.getItem("EDZY/DoctorDetail.doctorIdEdit");
  if (l) {
    localStorage.removeItem("EDZY/DoctorDetail.doctorIdEdit"), a(l);
    var d = "setTitleEdit();";
    qlib.evalScriptInWindow("", d)
  }
}]);