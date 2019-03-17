         function detectBrowser() {
            var useragent = navigator.userAgent;
            var mapdiv = document.getElementById("googleMap");

            if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
                mapdiv.style.width = '100%';
                mapdiv.style.height = '100%';
            } else {
                mapdiv.style.width = '600px';
                mapdiv.style.height = '800px';
            }
        }

      var map;
      var pos;
      var pos;
      var dest;
      var searchBox;
      var end;
      function initMap() {



        var myLatLng = {lat: -25.363, lng: 131.044};

         map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 12,
          center: myLatLng
        });


           searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

            // var input = document.getElementById('pac-input');

            //call renderer to display directions
            directionsDisplay.setMap(map);


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
             pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          console.log(pos.lat);
          console.log(pos.lng);
          var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Hello World!'
        });

            map.setCenter(pos);
            //console.log(pos.lat);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }



        // console.log(pos.lat);



        google.maps.event.addListener(searchBox, 'places_changed', onChangeHandler);

        /* var markers = [

                ['imperial oversees', 19.091584, 72.837677],

            ];
            var position = new google.maps.LatLng(markers[0][1], markers[0][2]);
             marker = new google.maps.Marker({
                    position: position,
                    map: map,

                });
          */



          document.getElementById("myBtn").addEventListener("click", function(){
          var selectedMode = document.getElementById('mode').value;
          directionsService.route({

                        // origin: document.getElementById('start').value,
                        origin: pos,

                        // destination: marker.getPosition(),
                        destination:dest,

                        travelMode: google.maps.TravelMode[selectedMode]
                    }, function(response, status) {
                        if (status === 'OK') {
                           //console.log(pos);
                            //console.log(document.getElementById("mapsearch").value)
                            console.log(response.routes[0]);
                            console.log(response.routes[0].fare);
                            document.getElementById("p2").innerHTML = response.routes[0].fare.text;
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
          });

       // console.log(pos.lat);


      }



        var onChangeHandler = function() {
             var locations = searchBox.getPlaces();
             dest = locations[0].geometry.location;
             end = locations[0].place_id;
             console.log(locations);
             var marker = new google.maps.Marker({
             position: locations[0].geometry.location,
             map: map,
             title: locations[0].name
            });
           }


        //start = {lat: pos.lat(), lng: pos.lng()};
        //ending = {lat: dest.lat(), lng:dest.lng()};
      function distanceFinder(){
       var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [pos],
          destinations: [dest],
          travelMode: 'TRANSIT',
           transitOptions: {
            modes: ['BUS', 'TRAIN']
           },
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';




            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;

              for (var j = 0; j < results.length; j++) {

                //console.log(document.getElementById("p1").value);
                document.getElementById("p1").innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
              }
            }
          }
        });

      }