angular.module("myApp", []).service("Data", function() {
  return {
    itemList: [],
    itemListEmpty: !1,
    itemListErr: !1,
    areaList: [],
    areaListEmpty: !1,
    areaListErr: !1,
    keyword: "",
    provinceList: [],
    provinceSelected: "",
    cityList: [],
    citySelected: "",
    isFilterPageActive: !1
  }
}).service("useShop", function() {
  return function(e) {
    var t = angular.toJson(e);
    console.log(t), localStorage.setItem("EDZY/ShopSelect.shop", t), appcan.window.publish("EDZY/ShopSelect.shopSelected"), qlib.closeCurrentWindow(-1)
  }
}).service("getList", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = {
      shopName: t.keyword,
      province: t.provinceSelected,
      city: t.citySelected,
      index: qlib.getNextPageNumber(t.itemList.length),
      pageSize: PAGE_SIZE_DEFAULT
    };
    console.log(i), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "pharmacys",
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(i, r, o, n, c) {
        console.log(i), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), e(function() {
          t.itemListErr = !t.itemList.length
        })) : e(function() {
          t.itemList = t.itemList.concat(i.data.rows), t.itemListEmpty = !t.itemList.length
        })
      },
      error: function(i, r, o, n) {
        appcan.window.openToast(r, SimcereConfig.ui.toastDuration), console.error("network error"), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("getAddrData", ["$timeout", "Data", function(e, t) {
  return function() {
    var i = {};
    console.log(i), appcan.request.ajax({
      type: "GET",
      url: SimcereConfig.server.edzy + "area",
      data: i,
      contentType: "application/json",
      dataType: "json",
      timeout: REQUEST_TIMEOUT,
      success: function(i, r, o, n, c) {
        console.log(i), "0" != i.status ? (appcan.window.openToast(i.msg, SimcereConfig.ui.toastDuration), console.error("res error"), e(function() {
          t.areaListErr = !0
        })) : e(function() {
          t.areaList = t.areaList.concat(i.data), t.areaListEmpty = !t.areaList.length, t.provinceList = t.areaList
        })
      },
      error: function(i, r, o, n) {
        console.error("network error"), e(function() {
          t.itemListErr = !t.itemList.length
        })
      }
    })
  }
}]).service("initScroll", ["$timeout", "Data", function(e, t) {
  return function() {
    t.myScroll1 = new IScroll("#wrapper1"), t.myScroll2 = new IScroll("#wrapper2")
  }
}]).service("toggleAddressSelectLayer", ["Data", function(e) {
  return function() {
    e.isFilterPageActive = !e.isFilterPageActive, e.isFilterPageActive && setTimeout(function() {
      e.myScroll1.refresh(), e.myScroll2.refresh()
    }, 100)
  }
}]).service("subscribe", function() {
  return function() {
    appcan.window.subscribe("EDZY/ZysqList.refresh", function() {
      $timeout(function() {
        Data.isFilterPageActive = !1
      }), Data.itemList.length = 0, getList()
    }), appcan.window.subscribe("EDZY/ZysqList.load", function() {
      $timeout(function() {
        Data.isFilterPageActive = !1
      }), getList()
    })
  }
}).controller("ItemListController", ["$scope", "getList", "useShop", function(e, t, i) {
  e.useShop = i, t()
}]).controller("GlbController", ["$scope", "Data", "getList", "getAddrData", "initScroll", "toggleAddressSelectLayer", function(e, t, i, r, o, n) {
  e.Data = t, e.search = function() {
    t.itemList.length = 0, i()
  }, e.setProvince = function(e) {
    t.provinceSelected = e ? e.name : "", t.cityList = e ? e.sub : [], setTimeout(function() {
      t.myScroll2.refresh()
    }, 100), e || (t.provinceSelected = "", t.citySelected = "", t.isFilterPageActive = !t.isFilterPageActive, t.itemList.length = 0, i())
  }, e.setCity = function(e) {
    t.citySelected = e ? e.name : "", e || (t.citySelected = ""), t.isFilterPageActive = !t.isFilterPageActive, t.itemList.length = 0, i()
  }, e.toggleAddressSelectLayer = n, r(), o()
}]);