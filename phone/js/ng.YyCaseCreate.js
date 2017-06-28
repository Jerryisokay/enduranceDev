/**  新增诊疗信息 **/

angular.module("myApp", ["ngq"]).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    hospitalId: "",
    hospitalName: "",
    deptId: "",
    deptName: "",
    doctorId: "",
    doctorRowId: "",
    doctorName: "",
    diseaseDiagRowId:"",        //疾病诊断 rowId
    diseaseDiagName:"",
    cytologyGradeRowId: "",    //病理学。
    cytologyGradeName:"",
    clinicalStagesRowId:"",     //临床分期Id
    clinicalStagesName:"",
    egrfRowId:"",               //EGRF检测Id
    egrfName:"",
    RegimenName:"",
    theraRegimenRowId: "",      //治疗方案rowId
    theraRegimenName:"",
    combinedTreatRowId: "",     //联合治疗Id
    combinedTreatName: "",
    chemoRegimenRowId:"",       //化疗Id
    chemoRegimenName:"",
    pd:"",
    caseRepFiles:"",            //病理报表扫描件
    caseRepFilesView:[],
    chestCTBFiles:"",           //胸部CT报告（治疗前）
    chestCTBFilesView:[],          
    chestCTFFiles:"",           //胸部CT报告（治疗后）
    chestCTFFilesView:[],           
    assApplyFiles:"",           //首次援助申请表扫描件
    assApplyFilesView:[],           
    infNotiCirmFiles:"",        //患者告知书、患者知情同意书
    infNotiCirmFilesView:[],        
    ecoEvlFiles:"",             //经济评估扫描件
    ecoEvlFilesView:[],             
    
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
  
  
  function c(){
      t.chemoRegimenRowId = "", t.chemoRegimenName = ""
  }
  
  return function() {
    appcan.window.subscribe("EDZY/PatientSelect.patientSelected", function() {
      //患者
      var o = localStorage.getItem("EDZY/PatientSelect.patient"),
        i = angular.fromJson(o);
      e(function() {
        t.patientId = i.id, t.patientRowId = i.rowId, t.patientName = i.name
      })
    }), appcan.window.subscribe("EDZY/HospitalSelect.hospitalSelected", function() {
      //医院
      var o = localStorage.getItem("EDZY/HospitalSelect.hospital"),
        a = angular.fromJson(o);
      e(function() {
        i(), n(), t.hospitalId = a.id, t.hospitalName = a.name
      })
    }), appcan.window.subscribe("EDZY/DepartmentSelect.departmentSelected", function() {
      //科室
      var o = localStorage.getItem("EDZY/DepartmentSelect.department"),
        i = angular.fromJson(o);
      e(function() {
        n(), t.deptId = i.id, t.deptName = i.name
      })
    }), appcan.window.subscribe("EDZY/DoctorSelect.doctorSelected", function() {
      //医生
      var o = localStorage.getItem("EDZY/DoctorSelect.doctor"),
        i = angular.fromJson(o);
      e(function() {
        t.doctorId = i.id, t.doctorRowId = i.rowId, t.doctorName = i.name
      })
    }), appcan.window.subscribe("EDZY/DiseaseSelect.selected", function() {
      //疾病诊断
      var o = localStorage.getItem("EDZY/DiseaseSelect.item"),
        i = angular.fromJson(o);
      e(function() {
        t.diseaseDiagRowId = i.id, t.diseaseDiagName = i.name
      })
    }), appcan.window.subscribe("EDZY/CytologySelect.selected", function() {
      //病理学/或细胞学/组织学诊断或分级
      var o = localStorage.getItem("EDZY/CytologySelect.item"),
        i = angular.fromJson(o);
      e(function() {
        t.cytologyGradeRowId = i.id, t.cytologyGradeName = i.name
      })
    }), appcan.window.subscribe("EDZY/LcfqSelect.selected", function() {
      //临床分期
      var o = localStorage.getItem("EDZY/LcfqSelect.item"),
        i = angular.fromJson(o);
      e(function() {
        t.clinicalStagesRowId = i.id, t.clinicalStagesName = i.name
      })
    }), appcan.window.subscribe("EDZY/EGFRSelect.selected", function() {
      //EGR检测
      var o = localStorage.getItem("EDZY/EGFRSelect.item"),
        i = angular.fromJson(o);
      e(function() {
        t.egrfRowId = i.id, t.egrfName = i.name
      })
    }),appcan.window.subscribe("EDZY/ZlfaSelect.selected", function() {
      var o = localStorage.getItem("EDZY/ZlfaSelect.theraRegimen");
        console.log("o------"+o);
       var n = angular.fromJson(o);
       e(function() {
           c(), t.theraRegimenRowId = n.rowId, t.theraRegimenName = n.name , t.RegimenName = n.name;
           var d = localStorage.getItem("EDZY/ZlfaSelect.combinedTreat");
           if(d){
               var f = JSON.parse(d);
               e(function() {
                   console.log("f------"+d),
                t.combinedTreatRowId = f.rowId, t.combinedTreatName = f.name, t.RegimenName = t.theraRegimenName + '/' + f.name;
              });
          }
      });
      
    }), appcan.window.subscribe("EDZY/HlfsSelect.selected", function() {
      var o = localStorage.getItem("EDZY/HlfsSelect.regimen"),
        n = angular.fromJson(o);
      e(function() {
        t.chemoRegimenRowId = n.rowId, t.chemoRegimenName = n.name
      })
    }), appcan.window.subscribe("EDZY/pdSelect.selected", function() {
      //EGR检测
      var o = localStorage.getItem("EDZY/pdSelect.item"),
        i = angular.fromJson(o);
      e(function() {
        t.pd = i.id, t.pdName = i.name
      })
    }),appcan.window.subscribe("EDZY/YyCaseCreate.submit", function() {
      o()
    })
  }
}]).service("submitCase", ["$timeout", "Data", function(e, t) {
  return function() {
    var pId = localStorage.getItem("EDZY/PatientDetail.patientId");
    var pRowId = localStorage.getItem("EDZY/PatientDetail.patientRowId");
    var e = {
      rId: qlib.getUser().loginId,
      patientId: pId,
      patientRowId: pRowId,
    };
    $.extend(e, t), console.log(e);
    var o = "";
    if(e.combinedTreatRowId && !e.chemoRegimenRowId){
        void appcan.window.alert("提示", "请选择化疗方式", ["知道了"]); return; 
    }
    return e.patientId ? e.hospitalId ? e.deptId ? e.doctorId ? e.theraRegimenRowId ? e.egrfRowId ? e.clinicalStagesRowId ? e.cytologyGradeRowId ? e.diseaseDiagRowId || (o = "请选择疾病诊断") : o = "请选择病理学/或细胞学/组织学诊断或分级" : o = "请选择临床分期" : o = "请选择EGRF检测" : o = "请选择治疗方案" : o = "请选择医生" : o = "请选择科室" : o = "请选择医院" : o = "请选择患者", o ? void appcan.window.alert("提示", o, ["知道了"]) : (appcan.window.openToast(CR.TOAST_WAITING), void appcan.request.ajax({
      type: "POST",
      url: SimcereConfig.server.edzy + "case",
      data: e,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(t, o, i, n, a) {
        console.log(t), "0" != t.status ? (appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDuration), console.error("res error")) : (e.id && qlib.closeWindowByName("EDZY_YyCaseDetail"), appcan.window.publish("EDZY/YyList.refresh", ""), appcan.window.openToast(t.msg || "操作失败", SimcereConfig.ui.toastDurationCb), setTimeout(function() {
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
          r.caseRepFilesView = i(r.caseRepFiles), r.chestCTBFilesView = i(r.chestCTBFiles), r.chestCTFFilesView = i(r.chestCTFFiles), r.assApplyFilesView = i(r.assApplyFiles), r.infNotiCirmFilesView = i(r.infNotiCirmFiles), r.ecoEvlFilesView = i(r.ecoEvlFiles), r.RegimenName = (!r.combinedTreatName) ? r.theraRegimenName : r.theraRegimenName+"/"+r.combinedTreatName, e(function() {
            angular.extend(t, o.data)
          })
        }
      },
      error: function(e, t, o, i) {
        appcan.window.openToast("网络连接不可用", 2e3), console.error("network error")
      }
    })
  }
}]).controller("ItemListController", ["$scope", "$timeout", "Data", function(e, t, o) {}]).controller("GlbController", ["$scope", "$timeout", "Data", "subscribe", "getCaseDetail", "addImage", "ngqRemoveImage", "ngqViewImages", function(e, t, o, i, l, d, u, p) {
  e.Data = o, e.addImage = d, e.ngqRemoveImage = u, e.ngqViewImages = p,  e.openPatientSelect = function() {
    qlib.openPatientSelect()
  }, e.openHospitalSelect = function() {
    qlib.openHospitalSelect()
  }, e.openDepartmentSelect = function() {
    return o.hospitalId ? void qlib.openDepartmentSelect() : void appcan.window.alert("提示", "请先选择医院", ["知道了"])
  }, e.openDoctorSelect = function() {
    return localStorage.setItem("EDZY/DoctorSelect.hospitalId", o.hospitalId), localStorage.setItem("EDZY/DoctorSelect.deptId", o.deptId), o.deptId ? void qlib.openDoctorSelect() : void appcan.window.alert("提示", "请先选择科室", ["知道了"])
  },e.openLcfqSelect = function() {
    qlib.openLcfqSelect();
  },e.openCytologySelect = function(){
      appcan.window.open("CytologySelect", "CytologySelect.html", 10)
  },e.openEGFRSelect = function(){
      appcan.window.open("EGRFSelect", "EGRFSelect.html", 10)
  },e.openDiseaseSelect = function() {
      appcan.window.open("DiseaseSelect", "DiseaseSelect.html", 10)
  },e.openZlfaSelect = function(){
      appcan.window.open("ZlfaSelect", "ZlfaSelect.html", 10)
  }, e.openChemotherapySelect = function(){
      return o.combinedTreatRowId ? void appcan.window.open("ChemotherapySelect", "ChemotherapySelect.html", 10) : void appcan.window.alert("提示", "请先选择治疗方案", ["知道了"])
  },e.openPdSelect = function(){
      appcan.window.open("pdSelect", "pdSelect.html", 10)
  }, i();
  var m = localStorage.getItem("EDZY/YyCaseDetail.caseIdEdit");
  if (m) {
    localStorage.removeItem("EDZY/YyCaseDetail.caseIdEdit"), l(m);
    var I = "setTitleEdit();";
    qlib.evalScriptInWindow("", I)
  }
}]);