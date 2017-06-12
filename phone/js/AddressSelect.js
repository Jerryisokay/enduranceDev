function openAddressPicker(e) {
  if ("undefined" == typeof uexWheelPickView) return void e({
    data: ["江苏省", "南京市", "玄武区"],
    index: [0, 0, 0]
  });
  var i = {
      src: "wgt://data/ssq.json",
      select: [0, 0, 0]
    },
    n = JSON.stringify(i);
  uexWheelPickView.onConfirmClick = function(i) {
    var n = i.replace(/'/g, '"'),
      s = JSON.parse(n);
    e(s)
  }, uexWheelPickView.open(n)
}

function confirm() {
  var e = $(".n-ipt-ssqx").val(),
    i = $(".n-address").val();
  if ("" == e) appcan.window.openToast(CR.ADDRESS_SSQX_EMPTY, SimcereConfig.ui.toastDuration);
  else if ("" == i) appcan.window.openToast(CR.ADDRESS_ADDR_EMPTY, SimcereConfig.ui.toastDuration);
  else {
    var n = {
        ssqx: e,
        addr: i
      },
      s = JSON.stringify(n);
    console.log(s), localStorage.setItem("EDZY/AddressSelect.address", s), appcan.window.publish("EDZY/AddressSelect.selected", ""), qlib.closeCurrentWindow()
  }
}