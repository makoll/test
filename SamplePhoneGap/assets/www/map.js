// -*- coding: utf-8 -*-
$(function() {
  jQuery.support.cors = true; // force cross-site scripting (as of jQuery 1.5)
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map;
  var marker;
  var currentLocation;

  $(document).bind("deviceready", initializeMap);

  var displayMap = $('#map_canvas2');
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

  $("#search").click(function() {

    // ajax通信を行う。
    $.ajax({
      'url' : 'http://192.168.0.2/script_controller.php',
      'type' : 'GET',
      'success' : function(returnData, status, xhr) {
      },
      'complete' : function() {
      },
      'error':function(XMLHttpRequest, textStatus, errorThrown){
        alert(errorThrown); // "No Transport"
      }
    });
  });

  $("#reflesh").click(function() {

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
  });

  $("#zoomin").click(function() {
    var zoom = map.getZoom();
    map.setZoom(zoom + 1);
  });

  $("#zoomout").click(function() {
    var zoom = map.getZoom();
    map.setZoom(zoom - 1);
  });

  function onError(e) {
    alert('code: '    + e.code    + '\n' + 'message: ' + e.message + '\n');
  }

  function initializeMap() {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLocation = new google.maps.LatLng(35.803361, 139.950213);
      var options = {
        zoom: 10, center: currentLocation,
        disableDefaultUI: true, mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map($("#map_canvas").get(0), options);
      map.setCenter(currentLocation);
      directionsDisplay.setMap(map);
      marker = new google.maps.Marker({
        position: currentLocation,
        map: map, title: "Current Location"
      });
    }, onError);
  }

  function setCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLocation = new google.maps.LatLng(35.803361, 139.950213);
      map.setCenter(currentLocation);
      marker.setPosition(currentLocation);
    }, onError);
  }

  function searchDirections() {
    var _waypoints =  [$("#wp1").val(), $("#wp2").val(), $("#wp3").val()];
    var waypoints = $.map(_waypoints, function(v, i) {
      if (v !== "") return {location: v};
      else return null;
    });
    var request = {
      origin: $("#origin").val(), destination: $("#destination").val(),
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      unitSystem: google.maps.DirectionsUnitSystem.METRIC,
      waypoints: waypoints
    };
    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        alert('Status: ' + status);
      }
    });
  }
});
