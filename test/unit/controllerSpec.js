'use strict';

/* jasmine specs for controllers go here */
describe('CharterPrototype controllers', function() {

  describe('SwimLanesController', function(){
    var scope, ctrl, http;

    beforeEach(module('charterPrototype'));

    beforeEach(inject(function($httpBackend, $rootScope, $controller) {
      http = $httpBackend;
      http.expectGET('server/data.json').respond({
	"data": {
		"top_movies": {
			"count": 6,
			"assets": [
				{
					"name": "Avengers",
					"entitled": true,
					"poster": "poster_avengers.png"
				},
				{
					"name": "The Grey",
					"entitled": true,
					"poster": "poster_grey.png"
				},
				{
					"name": "Expendables",
					"entitled": false,
					"poster": "poster_expendables.png"
				},
				{
					"name": "Spiderman",
					"entitled": true,
					"poster": "poster_spiderman.png"
				},
				{
					"name": "Titans",
					"entitled": false,
					"poster": "poster_titans.png"
				},
				{
					"name": "White House",
					"entitled": true,
					"poster": "poster_white_house.png"
				}
			]
		},
		"action": {
			"count": 14,
			"assets": [
				{
					"name": "Boom",
					"entitled": true,
					"poster": "poster_boom.png"
				},
				{
					"name": "Avatar",
					"entitled": true,
					"poster": "poster_avatar.png"
				},
				{
					"name": "Burlesque",
					"entitled": false,
					"poster": "poster_burlesque.png"
				},
				{
					"name": "Identity",
					"entitled": true,
					"poster": "poster_identity.png"
				},
				{
					"name": "Ironman",
					"entitled": false,
					"poster": "poster_ironman.png"
				},
				{
					"name": "Ironman 3",
					"entitled": true,
					"poster": "poster_ironman_3.png"
				},
				{
					"name": "Pi",
					"entitled": false,
					"poster": "poster_pi.png"
				},
				{
					"name": "Stolen",
					"entitled": true,
					"poster": "poster_stolen.png"
				},
				{
					"name": "Neighbors",
					"entitled": true,
					"poster": "poster_neighbors.png"
				},
				{
					"name": "The Other Woman",
					"entitled": true,
					"poster": "poster_other_woman.png"
				},
				{
					"name": "Poppers",
					"entitled": false,
					"poster": "poster_poppers.png"
				},
				{
					"name": "Transformers",
					"entitled": true,
					"poster": "poster_transformers.png"
				},
				{
					"name": "Beauty",
					"entitled": false,
					"poster": "poster_beauty.png"
				},
				{
					"name": "40",
					"entitled": true,
					"poster": "poster_40.png"
				}
			]
		}
	}
});
      scope = $rootScope.$new();
      ctrl = $controller('SwimLanesController', {$scope:scope});
    }));


    it('should create media model with no more than 12 assets in each category', function() {
      expect(scope.media).toBeUndefined();
      http.flush();
      expect(scope.media.data.action.assets.length).toBe(12);
    });
    
    it('should create one swim lane for each category', function() {
    	expect(scope.swimLanes).toBeUndefined();
      http.flush();
      expect(scope.swimLanes.length).toBe(2);
      expect(scope.swimLanes).toEqual(['top_movies', 'action']);
    });

  });
});
