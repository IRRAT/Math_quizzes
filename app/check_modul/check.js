'use strict';

angular.module('myApp.check', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/check', {
    templateUrl: 'check_modul/check.html',
    controller: 'CheckCtrl'
  });
}])
.factory('Result', [function(){
	return {correct: 0, wrong: 0};
}])

.controller('CheckCtrl', ["$scope","Quizzes", "QuizIndexes", "Result", function($scope, Quizzes, QuizIndexes, Result) {
	$scope.tab = "check";
	$scope.quizzes = Quizzes;
	$scope.quizIndexes = QuizIndexes;
	$scope.userResult = Result;

	$scope.CheckAnswer = function(isvalid, form) {
		if(isvalid) {
			if($scope.answer == $scope.quiz.answer) {
				$scope.userResult.correct++;
			}
			else $scope.userResult.wrong++;
			$scope.answer = null;
			$scope.quizzes[$scope.randomQuizIndex].checked = true;// mark quiz as checked
			deleteIndex($scope.quizIndexes.array, $scope.randomQuizIndex);
			generateQuiz();
			resetValidation(form);
		}
	}

	$scope.isBegin = function() {
		if(!$scope.quizIndexes.array.length && !$scope.userResult.correct&& !$scope.userResult.wrong) {
			return true;
		}
	}

	$scope.isEnd = function() {
		if(!$scope.isBegin() && !$scope.quizIndexes.array.length) {
			return true;
		}
	}

	generateQuiz();

	function resetValidation(form) {
		if (form) {
 			form.$setPristine();
		}
	}

	function deleteIndex(arr, index) {
		arr.splice(QuizIndexes.findIndex(arr, index), 1);
	}

	function generateQuiz() {
		$scope.randomQuizIndex = $scope.quizIndexes.array[getRandomInt(1, $scope.quizIndexes.array.length) - 1];
		$scope.quiz = $scope.quizzes[$scope.randomQuizIndex];
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

}]);