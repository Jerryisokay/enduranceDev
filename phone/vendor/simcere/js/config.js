/**
 * Created by mitty on 16/12/6.
 */
var SimcereConfig = {
    "appId": "aaaio10008",
    "appKey": "f617f351-308f-4b1c-b7e5-7344f9ec0026",
    "widgets": {
        "Contacts": "aaaio10007",
        "NN": "aaaio10010",
        "BBS": "aaaio10012"
    },
    "server": {
        "emm": "https://modev.isimcere.com:18443",
        "mas": "http://modev.isimcere.com:9999",
        "bbs": "http://192.168.6.73:8081/source/plugin/zywx/rpc/",
        "edzy": "http://modev.isimcere.com:40002/xsdoc/"
    },
    "ui": {
        "toastDuration": 2000,
        "toastDurationCb": 2000,
    },
    "emmLoginDomain": "simcere"
};

var REQUEST_TIMEOUT = 5000;
var IMG_BASE_URL = 'http://modev.isimcere.com:8888/uploads/enduzengyao/';
//文案
var CR = {
    'TOAST_WAITING': '请稍候',
    'HOSPITAL_SELECTED': '医院选择完成',
    'DEPARTMENT_SELECTED': '科室选择完成',
    'ZW_SELECTED': '职务选择完成',
    'ZC_SELECTED': '职称选择完成',
    'SCOPEDPRODUCT_SELECTED': '涉及产品选择完成',
    'SCOPEDPRODUCT_EMPTY': '未选择涉及产品',
    'PATIENT_SELECTED': '患者选择完成',
    'DOCTOR_SELECTED': '医生选择完成',
    'CANCER_SELECTED': '癌种选择完成',

    'FLOW_ABORT_TITLE': '提示',
    'FLOW_ABORT_CONTENT': '撤销流程？',
    'FLOW_ABORT_PLACEHOLDER': '备注',
    'FLOW_ABORT_BTN': '取消,继续',
    'FLOW_DELETE_TITLE': '提示',
    'FLOW_DELETE_CONTENT': '确认要封存？',
    'FLOW_DELETE_PLACEHOLDER': '备注',
    'FLOW_DELETE_BTN': '取消,继续',

    'ADDRESS_SSQX_EMPTY': '请填写完整地址',
    'ADDRESS_ADDR_EMPTY': '请填写完整地址',
    'ADDRESS_ADDR_SELECTED': '地址已选择',
    
    'TREATMENT_EMPTY': '请选择治疗方案',
    'COMBINE_TREATMENT_EMPTY':'请选择联合治疗方案',
    'CHEMO_TREATMENT_EMPTY':'请选择化疗方案',
};
//
var DICT_KEY = {
    'CHECK_RESULT': 'ed_check_result',//检查结果
    'CLINICAL_STAGES': 'ed_clinical_stages',//临床分期
    'EVALUATE': 'ed_evaluate',//医疗评价
    'INSURANCE_TYPE': 'ed_insurance_type',//保险类型
    'PRO_FROM': 'ed_pro_from',//产品来源
    'GENDER': 'ed_sex',//性别
    'BOOLEAN': 'ed_yes_or_no',//布尔值
    'THERAED':'ed_thera_regimen',  //治疗方案
    'CHEMOTHERAPY':'ed_chemotherapy_regimen',    //化疗方案
    'COMBINED':'ed_combined_treat',    //联合治疗
    'CYTOLOGY':'ed_cytology_grade', //细胞学诊断或分级
    'DISEASE_DIAG':'ed_disease_diag', //疾病诊断
    'EGRF':'ed_egrf',  //EGRF
    'PD':'ed_pd',   //PD
};
//
var PAGE_SIZE_DEFAULT =10;
//
var AUDIT_STATE_TXT = {
    "0": "审核中",
    "1": "通过",
    "2": "驳回",
    "3": "撤销",
    "4": "已封存"
};