'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.check',
  'myApp.settings'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/check'});
}]).
controller('NavCtrl', ['$scope','$location', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
}]);
