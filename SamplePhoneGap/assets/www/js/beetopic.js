// -*- coding: utf-8 -*-
$(function() {
  jQuery.support.cors = true; // force cross-site scripting (as of jQuery 1.5)

  $(document).bind("deviceready", function() {
  });

  $("#reload_map").bind('click', function() {

    var displayMap = $('#map_canvas');
    var expandedMap = new google.maps.Map(displayMap[0], {
      'mapTypeId' : google.maps.MapTypeId.ROADMAP,
      'scrollwheel' : false
    });

    // 北西端の座標を設定
    var sw = new google.maps.LatLng(35.803361, 139.950213);
    // 東南端の座標を設定
    var ne = new google.maps.LatLng(35.803561, 139.950513);
    // 範囲を自動調整
    expandedMap.fitBounds(new google.maps.LatLngBounds(sw, ne));

    google.maps.event.addListener(expandedMap, 'zoom_changed', function() {
      zoomLevel = expandedMap.getZoom();
      if(isNullBlank(zoomLevel) || 15 < zoomLevel) {
        expandedMap.setZoom(15);
      }
    });

    var lat= 35.804061;
    var lng = 139.951013;

    // 各ポイントをマーカー表示する。
    var marker = new google.maps.Marker({
      'position' : new google.maps.LatLng(lat, lng),
      'map' : expandedMap
    });

    var lat2 = 35.803361;
    var lng2 = 139.950213;

    // 各ポイントをマーカー表示する。
    var marker2 = new google.maps.Marker({
      'position' : new google.maps.LatLng(lat2, lng2),
      'map' : expandedMap
    });

    // マーカークリック時のイベントを定義する。
    google.maps.event.addListener(marker, 'click', function(event) {
      popupWindow(this);
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

  $("#move_content_button").bind('click', function() {

    var displayMap = $('#content_map');
    var expandedMap = new google.maps.Map(displayMap[0], {
      'mapTypeId' : google.maps.MapTypeId.ROADMAP,
      'scrollwheel' : false
    });

    // 北西端の座標を設定
    var sw = new google.maps.LatLng(35.803361, 139.950213);
    // 東南端の座標を設定
    var ne = new google.maps.LatLng(35.803561, 139.950513);
    // 範囲を自動調整
    expandedMap.fitBounds(new google.maps.LatLngBounds(sw, ne));

    google.maps.event.addListener(expandedMap, 'zoom_changed', function() {
      zoomLevel = expandedMap.getZoom();
      if(isNullBlank(zoomLevel) || 15 < zoomLevel) {
        expandedMap.setZoom(15);
      }
    });

    var lat= 35.804061;
    var lng = 139.951013;

    // 各ポイントをマーカー表示する。
    var marker = new google.maps.Marker({
      'position' : new google.maps.LatLng(lat, lng),
      'map' : expandedMap
    });
  });

  $("#reload_map2").bind('click', function() {

    var displayMap = $('#map_canvas2');
    var expandedMap = new google.maps.Map(displayMap[0], {
      'mapTypeId' : google.maps.MapTypeId.ROADMAP,
      'scrollwheel' : false
    });

    // 北西端の座標を設定
    var sw = new google.maps.LatLng(35.803361, 139.950213);
    // 東南端の座標を設定
    var ne = new google.maps.LatLng(35.803561, 139.950513);
    // 範囲を自動調整
    expandedMap.fitBounds(new google.maps.LatLngBounds(sw, ne));

    google.maps.event.addListener(expandedMap, 'zoom_changed', function() {
      zoomLevel = expandedMap.getZoom();
      if(isNullBlank(zoomLevel) || 15 < zoomLevel) {
        expandedMap.setZoom(15);
      }
    });
  });

  document.addEventListener("menubutton", onMenuKeyDown, false);

  function onMenuKeyDown() {
    $("#menu").show();
  }

  /**
   * ウインドウをポップアップする。
   *
   * @param {Object} marker 各ポイントのマーカー
   */
  function popupWindow(marker) {

    var contentParent = $('<a />', {
      'href' : '#event'
    });

    contentParent.html('突発20代飲み会');

    // 各ポイントの名前、コメント、画像をあわせてメッセージとし、マーカークリック時に表示する。
    var nowExpandingMapsWindow = new google.maps.InfoWindow({
      'content' : contentParent.get(0)['outerHTML'],
      'class' : 'popup'
    });
    nowExpandingMapsWindow.open(marker.getMap(), marker);
  }
});


/**
 * 文字列がnullまたはブランクかのチェックを行う。
 * @param {string} str 文字列
 * @return {boolean} 文字列がnullかブランクの場合true、その他の場合はfalse
 */
function isNullBlank(str) {
  return (str == null || str === '');
};
