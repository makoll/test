// -*- coding: utf-8 -*-
$(function() {
  jQuery.support.cors = true; // force cross-site scripting (as of jQuery 1.5)

  $(document).bind("deviceready", function() {
  });

  $("#search").bind('click', function() {

    var displayMap = $('#map_canvas');
    var expandedMap = new google.maps.Map(displayMap[0], {
      'mapTypeId' : google.maps.MapTypeId.ROADMAP,
      'scrollwheel' : false
    });

    // 北西端の座標を設定
    var sw = new google.maps.LatLng(35.803361, 139.950213);
    // 東南端の座標を設定
    var ne = new google.maps.LatLng(35.803361, 139.950213);
    // 範囲を自動調整
    expandedMap.fitBounds(new google.maps.LatLngBounds(sw, ne));

    google.maps.event.addListener(expandedMap, 'zoom_changed', function() {
      zoomLevel = expandedMap.getZoom();
      if(isNullBlank(zoomLevel) || 15 < zoomLevel) {
        expandedMap.setZoom(15);
      }
    });

    var lat = 35.803361;
    var lng = 139.950213;

    // 各ポイントをマーカー表示する。
    var marker = new google.maps.Marker({
      'position' : new google.maps.LatLng(lat, lng),
      'map' : expandedMap
    });

//    // ajax通信を行う。
//    $.ajax({
//      'url' : 'http://192.168.0.2/script_controller.php',
//      'type' : 'GET',
//      'success' : function(returnData, status, xhr) {
//      },
//      'complete' : function() {
//      },
//      'error':function(XMLHttpRequest, textStatus, errorThrown){
//        alert(errorThrown); // "No Transport"
//      }
//    });
  });
});


/**
 * 文字列がnullまたはブランクかのチェックを行う。
 * @param {string} str 文字列
 * @return {boolean} 文字列がnullかブランクの場合true、その他の場合はfalse
 */
function isNullBlank(str) {
  return (str == null || str === '');
};
