'use strict';

angular.module('myApp.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings_modul/settings.html',
    controller: 'SettingsCtrl'
  });
}])
.factory('Tags', [function(){
	return {
		add: false,
		sub: false,
		mul: false,
		div: false
	};
}])
.factory('Quizzes', [function(){
	return [{body: "1 + 1 = ", answer: 2, tag: "add", checked: false},
			{body: "2 - 1 = ", answer: 1, tag: "sub", checked: false},
			{body: "4 * 4 = ", answer: 16, tag: "mul", checked: false},
			{body: "10 / 5 = ", answer: 2, tag: "div", checked: false},
			{body: "1 + 2 = ", answer: 3, tag: "add", checked: false},
			{body: "4 + 2 = ", answer: 6, tag: "add", checked: false},
			{body: "4 / 2 = ", answer: 2, tag: "div", checked: false}
			];
}])
.factory('QuizIndexes', [function(){
	return {array: []};
}])
.controller('SettingsCtrl', ["$scope", "Tags", "Quizzes", "QuizIndexes", function($scope, Tags, Quizzes, QuizIndexes) {
	$scope.tab = "settings";
	$scope.tags = Tags;
	$scope.quizzes = Quizzes;
	$scope.quizIndexes = QuizIndexes;


	$scope.init = function() {
		$scope.selectedTags = getTagsArr($scope.tags);
		$scope.quizIndexes.array = getQuizIndexes($scope.quizzes, $scope.selectedTags);
	}

	$scope.$watch('tags', function() {
		$scope.init();
	}, true);

	$scope.init();

	function getQuizIndexes(quizzes, tags) {
		var arr = [];
		angular.forEach(tags, function(tag) {
			angular.forEach(quizzes, function(quiz) {
				if(quiz.tag == tag && quiz.checked == false) {
					this.push(findIndex(quizzes, quiz));
				}
			}, arr);
		});
		return arr;
	};

	function getTagsArr (tags) {
		var arr = [];
		angular.forEach(tags, function(value, key) {
			if (value) {
				this.push(key);
			}
		}, arr);
		return arr;
	};

// for IE 8  if indexOf not supported
	function findIndex(array, value) {
		if (array.indexOf) {
			return array.indexOf(value);
		}

		for(var i=0; i<array.length; i++) {
			if (array[i] === value) return i;
		}
	}

}]);