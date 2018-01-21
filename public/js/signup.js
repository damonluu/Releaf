var signUpApp = angular.module('signUpApp', ['ngRoute']);
signUpApp.value('user', {
		  'objectID': '',
		  'username': '',
		  'password': '',
		  'reason': '',
		  'age': '',
		  'gender': '',
      'interestedGender': '',
		  'marital': '',
		  'ethicity': '',
      'active':''
		});
    signUpApp.config(function($routeProvider) {
		  $routeProvider
		    // route for the about page
		    .when('/signup/', {
		      templateUrl: 'pages/step1.html',
		      controller: 'SignUpController'
		    })
		    .when('/continue/', {
		      templateUrl: 'pages/step2.html',
		      controller: 'SignUp2Controller'
		    })
		    .otherwise({
		      redirectTo: '/',
		      templateUrl: 'pages/step1.html',
		      controller: 'SignUpController'
		    });
		});
    signUpApp.controller('SignUpController', ['$scope', 'user', '$http', function($scope, user, $http) {
			$("#reason").click(function(){
			    $(".dropdown-content").show();
					$("#reason").val($('#reason').val());
			});
			$scope.option1 = "Academic";
			$scope.option2 = "Personal";
			$scope.option3 = "Health";
			$scope.option4 = "Major Life Events";
			$scope.option5 = "Discrimination";
			$scope.option6 = "Abuse";
			$scope.option7 = "Other";
			$("#option1").click(function(){
					$("#reason").val('Academic');
					var arr = ["Underachievement","Parental Pressure","Financial Concern","Disinterest in topic(s) of study"]
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option1" + count);
					}
					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option11").click(function () { $("#reason").val('Academic, Underachievement'); });
						$("#option12").click(function () { $("#reason").val('Academic, Parental Pressure'); });
						$("#option13").click(function () { $("#reason").val('Academic, Financial Concern'); });
						$("#option14").click(function () { $("#reason").val('Academic, Disinterest in topic(s) of study')});
					},100);
			});
			$("#option2").click(function(){
					$("#reason").val('Personal');
					var arr = ["Family", "Romantic Relationship", "Friendship", "Self-esteem"];
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option2" + count);
						$("#option2" + count).unbind("click").click(function () {
							$("#reason").val($('#reason').val() + ', ' + arr[count-arr.length-1]);
				    });
					};

					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option21").click(function () { $("#reason").val('Personal, Family'); });
						$("#option22").click(function () { $("#reason").val('Personal, Romantic Relationship'); });
						$("#option23").click(function () { $("#reason").val('Personal, Friendship'); });
						$("#option24").click(function () { $("#reason").val('Personal, Self-esteem')});
					},100);
			});
			$("#option3").click(function(){
					$("#reason").val('Health');
					var arr = ["Terminal Illness", "Genetic Health Issue"];
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option3" + count);
					}
					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option31").click(function () { $("#reason").val('Health, Terminal Illness'); });
						$("#option32").click(function () { $("#reason").val('Health, Genetic Health Issue'); });
					},100);
			});
			$("#option4").click(function(){
					$("#reason").val('Major Life Events');
					var arr = ["Job Loss", "Moving", "Death"];
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option4" + count);
					}
					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option41").click(function () { $("#reason").val('Major Life Events, Job Loss'); });
						$("#option42").click(function () { $("#reason").val('Major Life Events, Moving'); });
						$("#option43").click(function () { $("#reason").val('Major Life Events, Death'); });
					},100);
			});
			$("#option5").click(function(){
					$("#reason").val('Discrimination');
					var arr = ["Racial", "Gender"];
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option5" + count);
					}
					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option51").click(function () { $("#reason").val('Discrimination, Racial'); });
						$("#option52").click(function () { $("#reason").val('Discrimination, Gender'); });
					},100);
			});
			$("#option6").click(function(){
					$("#reason").val('Abuse');
					var arr = ["Mental", "Sexual","Physical","Substance"];
					for(var count = 1; count < arr.length + 1; count++){
						$("#option" + count).text(arr[count-1]);
						$("#option" + count).attr("id", "option6" + count);
					}
					for(var count = arr.length;  count < 8; count++){
						$("#option" + count).hide();
					}
					setTimeout(function() {
						$("#option61").click(function () { $("#reason").val('Abuse, Racial'); });
						$("#option62").click(function () { $("#reason").val('Abuse, Gender'); });
						$("#option63").click(function () { $("#reason").val('Abuse, Physical'); });
						$("#option64").click(function () { $("#reason").val('Abuse, Substance'); });
					},100);
			});
			$("#option7").click(function(){
					$("#reason").val('Other');
					for(var count = 1;  count < 8; count++){
						$("#option" + count).hide();
					}
			});
			$(".button-right").click(function(){
					window.location.href = "signup#/continue";
			});
		}]);

signUpApp.controller('SignUp2Controller', ['$scope', 'user', '$http', function($scope, user, $http) {

}]);
