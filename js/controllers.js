'use strict';

/* Controllers */

var FILTER_OPTION_WIDTH = 220;
var CLOCK_TICK_INTERVAL = 1000;

var charterPrototype = angular.module('charterPrototype', []);

charterPrototype.controller('TimeController', ['$scope', '$timeout', '$http',
	function($scope, $timeout, $http) {
		$scope.currentTime = "Loading...";
		$scope.currentTemperature = '';
		$scope.currentWeatherIcon = '';
		$scope.currentWeatherIconStyle = {};
		$scope.weather = {currentWeatherIconStyle: {}};
		
		
		$http.get('http://api.openweathermap.org/data/2.5/weather?q=Denver,CO').
			success(function(data) {
				$scope.weather.currentTemperature = ((data.main.temp - 273.15)*1.8 + 32).toFixed(0) + '°';
				$scope.weather.currentWeatherIcon = 'http://openweathermap.org/img/w/'+ data.weather[0].icon + '.png';
				$scope.weather.currentWeatherIconStyle.background = 'url('+$scope.weather.currentWeatherIcon+')' + 'no-repeat center center'; 
			}).
			error(function(data) {
				$scope.weather.currentTemperature = '67°';
				$scope.weather.currentWeatherIcon = 'assets/images/icon_weather.png';
				$scope.weather.currentWeatherIconStyle.background = 'url('+$scope.weather.currentWeatherIcon+')' + 'no-repeat center center'; 
	    });
		

    var tick = function() {
        $scope.currentTime = Date.now();
        $timeout(tick, CLOCK_TICK_INTERVAL);
    };
    
    var showWeather = function() {
	    $scope.currentTemperature = $scope.weather.currentTemperature;
	    $scope.currentWeatherIcon = $scope.weather.currentWeatherIcon;
	    $scope.currentWeatherIconStyle = $scope.weather.currentWeatherIconStyle;
    };

    // Start the timer
    $timeout(tick, CLOCK_TICK_INTERVAL);
    $timeout(showWeather, CLOCK_TICK_INTERVAL);
	}
]);

charterPrototype.controller('SwimLanesController', ['$scope', '$http', 
	function($scope, $http) {
		$http.get('server/data.json').success(function(data) {
			$scope.media = data;
			
			$scope.swimLanes = Object.keys($scope.media.data);
			$scope.currentSwimLane = $scope.swimLanes[0];
				
			angular.forEach($scope.media.data, function(media, k) {
				media.viewAll = false;
				media.assets.splice(12);
				angular.forEach(media.assets, function(mediaItem, j) {
					mediaItem.swimLane = k;
					mediaItem.selected = false;
				});
			});
			
			
			$scope.currentMediaItemIndex = 0;
			$scope.previousMediaItemIndex = 0;
			$scope.currentFilterIndex = 0;
			$scope.media.data[$scope.currentSwimLane].assets[$scope.currentMediaItemIndex].selected = true;
		});
		
		$scope.filterOptions = [
		{'id': 'all_charter', 
		 'title': 'All Charter'},
		{'id': 'with_subscription', 
		 'title': 'With Subscription'}
		];
		$scope.isFilterActive = false;
		$scope.currentTime = new Date().getTime() / 1000;
		
		$scope.handleKeyDown = function(e) {
			if ($scope.isFilterActive === false) {
				$scope.changeMediaItemSelection(e);
			}
			else {
				$scope.changeFilter(e);
			}
		};
		
		$scope.activateFilter = function(e) {
			var filterList = e.target.parentNode;
			if ( filterList.classList.contains('active') ) {
				filterList.classList.remove('active');
				$scope.isFilterActive = false;
			}
			else {
				filterList.classList.add('active');
				$scope.isFilterActive = true;
			}
		};
		
		$scope.shouldShowAccessControl = function(media) {
			if (!media.entitled && $scope.filterOptions[$scope.currentFilterIndex].id === 'all_charter') {
				return true;
			}
			else {
				return false;
			}		
		};
		
		$scope.shouldShowMedia = function(media) {
				var currentFilter = $scope.filterOptions[$scope.currentFilterIndex].id;
				if (media.entitled && currentFilter === 'with_subscription') {
					return true;
				}
				else if (currentFilter === 'all_charter') {
					return true;
				}
				else {
					return false;
				}
		};
		
		$scope.changeFilter = function(e) {
			if ($scope.isFilterActive === true) {
				switch(e.keyCode) {
					case 37:
						//console.log('Change filter: left');
						$scope.goToFilter(-1);
						break;
					case 38:
						//console.log('Change filter: up');
						$scope.goToFilter(1);
						break;
					case 39:
						//console.log('Change filter: right');
						$scope.goToFilter(1);
						break;
					case 40:
						//console.log('Change filter: down');
						$scope.goToFilter(-1);
						break;
				}
			}
		};
		
		$scope.goToFilter = function(direction) {
			var firstFilter = document.querySelector('li.filter-option:first-child');
			firstFilter.addEventListener( 'webkitAnimationEnd', function(e) { 
				console.log(e);
				firstFilter.classList.remove('bounce-left','bounce-right');
			}, false);
			if (direction > 0) {
				if ($scope.currentFilterIndex > 0) {
					$scope.currentFilterIndex -= 1;					
				}
				else {
					firstFilter.classList.add('bounce-right');
				}
			}
			else {
				if ($scope.currentFilterIndex < $scope.filterOptions.length - 1) {
					$scope.currentFilterIndex += 1;
				}
				else {
					firstFilter.classList.add('bounce-left');
				}
			}		
			firstFilter.style.marginLeft = (direction) * FILTER_OPTION_WIDTH * $scope.currentFilterIndex + 'px';
		};
		
		$scope.changeMediaItemSelection = function(e) {			
			switch(e.keyCode) {
					case 37:
						//console.log('Change media item: left');
						$scope.goToMediaItem(-1);
						break;
					case 38:
						//console.log('Change swim lane: up');
						$scope.goToSwimLane(1);
						break;
					case 39:
						//console.log('Change media item: right');
						$scope.goToMediaItem(1);
						break;
					case 40:
						//console.log('Change swim lane: down');
						$scope.goToSwimLane(-1);
						break;
				}
		};
		
		$scope.goToMediaItem = function(direction) {
			var index = $scope.currentMediaItemIndex;
			
			$scope.clearMediaSelection($scope.media.data[$scope.currentSwimLane].assets[index]);
			
			if (direction > 0) {
				if (index < $scope.media.data[$scope.currentSwimLane].assets.length - 1) {
					if ( !$scope.media.data[$scope.currentSwimLane].viewAll ) {
						while(index < $scope.media.data[$scope.currentSwimLane].assets.length - 1) {
							index += 1;
							if ( $scope.shouldShowMedia($scope.media.data[$scope.currentSwimLane].assets[index]) ) {
								break;
							}
						}
						if (!$scope.shouldShowMedia($scope.media.data[$scope.currentSwimLane].assets[index])) {
							index = 0;
						}
					}
				}
				//Rollover to beginning of swim lane if user reaches end of media items.
				else {
					index = 0;
				}
			}
			else {
				if (index > 0) {
					while(index > 0) {
						index -= 1;
						if ( $scope.shouldShowMedia($scope.media.data[$scope.currentSwimLane].assets[index]) ) {
							break;
						}
					}
				}
				//Slide in 'View All Option'
				else {
					$scope.media.data[$scope.currentSwimLane].viewAll = true;
					return;
				}
			}
			$scope.makeMediaSelection($scope.media.data[$scope.currentSwimLane].assets[index]);
		};
		
		$scope.goToSwimLane = function(direction) {
			var index = $scope.swimLanes.indexOf($scope.currentSwimLane);
			var swimLane = $scope.currentSwimLane;
			
			if (direction < 0) {
				if (index < $scope.swimLanes.length - 1) {
					index += 1;
				}
			}
			else {
				if (index > 0) {
					index -= 1;
				}
			}
			swimLane = $scope.swimLanes[index];
			
			var equivalentMediaItemInNextSwimLane = $scope.media.data[swimLane].assets[$scope.currentMediaItemIndex];					
			var lastMediaItemInNextSwimLane = null;
			for (var j = $scope.media.data[swimLane].assets.length - 1; j > 0; j--) {
				lastMediaItemInNextSwimLane = $scope.media.data[swimLane].assets[j];			
				if ( $scope.shouldShowMedia(lastMediaItemInNextSwimLane) ) {
					break;
				}
			}
			
			if (equivalentMediaItemInNextSwimLane !== undefined) {
				if ( $scope.shouldShowMedia(equivalentMediaItemInNextSwimLane) ) {
					$scope.makeMediaSelection(equivalentMediaItemInNextSwimLane);
				}
				else {
					var nextClosestIndex = $scope.currentMediaItemIndex;
					while ( !$scope.shouldShowMedia(equivalentMediaItemInNextSwimLane) ) {
						if (nextClosestIndex < $scope.media.data[swimLane].assets.length - 1) {
							nextClosestIndex += 1;
						}
						else {
							nextClosestIndex = $scope.media.data[swimLane].assets.indexOf(lastMediaItemInNextSwimLane);
						}
						equivalentMediaItemInNextSwimLane = $scope.media.data[swimLane].assets[nextClosestIndex];
					}
					$scope.makeMediaSelection(equivalentMediaItemInNextSwimLane);
				}
			}
			else {
				$scope.makeMediaSelection(lastMediaItemInNextSwimLane);
			}
		};
		
		$scope.makeMediaSelection = function(media) {
			$scope.clearMediaSelection(media);
			$scope.resetViewAll();
			media.selected = true;
			if ( $scope.didSwimLaneChange(media) ) {
				$scope.changeSwimLane(media);
			}
			$scope.currentMediaItemIndex = $scope.media.data[media.swimLane].assets.indexOf(media);
		};
		
		$scope.clearMediaSelection = function(media) {
			$scope.previousMediaItemIndex = $scope.currentMediaItemIndex;
			media.selected = false;
			$scope.media.data[$scope.currentSwimLane].assets[$scope.currentMediaItemIndex].selected = false;
		};
		
		$scope.didSwimLaneChange = function(media) {
			if (media.swimLane !== $scope.currentSwimLane) {
				return true;
			}
			else {
				return false;
			}
		};
		
		$scope.resetViewAll = function() {
			$scope.media.data[$scope.currentSwimLane].viewAll = false;
		};
		
		$scope.changeSwimLane = function(media) {
			$scope.currentSwimLane = media.swimLane;
		};
		
		$scope.getMediaItemSlideStyle = function(swimLane) {
			//TODO: currentMediaItemIndex increments/decrements by more than 1 when items are filtered...this cause a slightly jumpy left/right scroll
			var style = {};
			style['margin-left'] = $scope.currentSwimLane === swimLane ? ($scope.currentMediaItemIndex)*-75+'px' : '0px';
			return style;
		};
	
	}]);