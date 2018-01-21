var signUpApp = angular.module('signUpApp', ['ngRoute']);
signUpApp.config(function($routeProvider) {
	$routeProvider
		// route for the about page
		.when('/signup', {
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
signUpApp.factory('user', function() {
	var user = {
		objectID: '',
		username: '',
		password: '',
		reason: '',
		age: '',
		gender: '',
		interestedGender: '',
		marital: '',
		weight: ''
	};
	return {
		getData: function() {
			return user;
		},
		setData: function(newAge, newGender, newInterest, newMarital, newWeight) {
			user.age = newAge;
			user.gender = newGender;
			user.interestedGender = newInterest;
			user.marital = newMarital;
      user.weight = newWeight;
		},
		setReason: function(newReason) {
			user.reason = newReason;
		}
	};
});

signUpApp.controller('SignUpController', [
	'$scope',
	'user',
	'$http',
	function($scope, user, $http) {
		$('#reason').click(function() {
			$('.dropdown-content').show();
			$('#reason').val($('#reason').val());
		});
		$scope.option1 = 'Academic';
		$scope.option2 = 'Personal';
		$scope.option3 = 'Health';
		$scope.option4 = 'Major Life Events';
		$scope.option5 = 'Discrimination';
		$scope.option6 = 'Abuse';
		$scope.option7 = 'Other';
		$('#option1').click(function() {
			$('#reason').val('Academic');
			var arr = [
				'Underachievement',
				'Parental Pressure',
				'Financial Concern',
				'Disinterest in topic(s) of study'
			];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option1' + count);
			}
			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option11').click(function() {
					$('#reason').val('Academic, Underachievement');
					user.setReason(11);
				});
				$('#option12').click(function() {
					$('#reason').val('Academic, Parental Pressure');
					user.setReason(12);
				});
				$('#option13').click(function() {
					$('#reason').val('Academic, Financial Concern');
					user.setReason(13);
				});
				$('#option14').click(function() {
					$('#reason').val('Academic, Disinterest in topic(s) of study');
					user.setReason(14);
				});
			}, 100);
		});
		$('#option2').click(function() {
			$('#reason').val('Personal');
			var arr = [
				'Family',
				'Romantic Relationship',
				'Friendship',
				'Self-esteem'
			];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option2' + count);
				$('#option2' + count)
					.unbind('click')
					.click(function() {
						$('#reason').val(
							$('#reason').val() + ', ' + arr[count - arr.length - 1]
						);
					});
			}

			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option21').click(function() {
					$('#reason').val('Personal, Family');
					user.setReason(21);
				});
				$('#option22').click(function() {
					$('#reason').val('Personal, Romantic Relationship');
					user.setReason(22);
				});
				$('#option23').click(function() {
					$('#reason').val('Personal, Friendship');
					user.setReason(23);
				});
				$('#option24').click(function() {
					$('#reason').val('Personal, Self-esteem');
					user.setReason(24);
				});
			}, 100);
		});
		$('#option3').click(function() {
			$('#reason').val('Health');
			var arr = ['Terminal Illness', 'Genetic Health Issue'];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option3' + count);
			}
			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option31').click(function() {
					$('#reason').val('Health, Terminal Illness');
					user.setReason(31);
				});
				$('#option32').click(function() {
					$('#reason').val('Health, Genetic Health Issue');
					user.setReason(32);
				});
			}, 100);
		});
		$('#option4').click(function() {
			$('#reason').val('Major Life Events');
			var arr = ['Job Loss', 'Moving', 'Death'];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option4' + count);
			}
			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option41').click(function() {
					$('#reason').val('Major Life Events, Job Loss');
					user.setReason(41);
				});
				$('#option42').click(function() {
					$('#reason').val('Major Life Events, Moving');
					user.setReason(42);
				});
				$('#option43').click(function() {
					$('#reason').val('Major Life Events, Death');
					user.setReason(43);
				});
			}, 100);
		});
		$('#option5').click(function() {
			$('#reason').val('Discrimination');
			var arr = ['Racial', 'Gender'];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option5' + count);
			}
			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option51').click(function() {
					$('#reason').val('Discrimination, Racial');
					user.setReason(51);
				});
				$('#option52').click(function() {
					$('#reason').val('Discrimination, Gender');
					user.setReason(52);
				});
			}, 100);
		});
		$('#option6').click(function() {
			$('#reason').val('Abuse');
			var arr = ['Mental', 'Sexual', 'Physical', 'Substance'];
			for (var count = 1; count < arr.length + 1; count++) {
				$('#option' + count).text(arr[count - 1]);
				$('#option' + count).attr('id', 'option6' + count);
			}
			for (var count = arr.length; count < 8; count++) {
				$('#option' + count).hide();
			}
			setTimeout(function() {
				$('#option61').click(function() {
					$('#reason').val('Abuse, Racial');
					user.setReason(61);
				});
				$('#option62').click(function() {
					$('#reason').val('Abuse, Gender');
					user.setReason(62);
				});
				$('#option63').click(function() {
					$('#reason').val('Abuse, Physical');
					user.setReason(63);
				});
				$('#option64').click(function() {
					$('#reason').val('Abuse, Substance');
					user.setReason(64);
				});
			}, 100);
		});
		$('#option7').click(function() {
			$('#reason').val('Other');
			user.setReason(71);
			for (var count = 1; count < 8; count++) {
				$('#option' + count).hide();
			}
		});
		$('.button-right').click(function() {
			window.location.href = 'signup#/continue';
		});
	}
]);

signUpApp.controller('SignUp2Controller', [
	'$scope',
	'user',
	'$http',
	function($scope, user, $http) {
		console.log(user.getData());
		var age;
		var marital;
		$('#age1').click(function() {
			$('#dropdownMenu2').html('18-24 years old');
			age = 1;
		});
		$('#age2').click(function() {
			$('#dropdownMenu2').html('25-34 years old');
			age = 2;
		});
		$('#age3').click(function() {
			$('#dropdownMenu2').html('35-44 years old');
			age = 3;
		});
		$('#age4').click(function() {
			$('#dropdownMenu2').html('45-54 years old');
			age = 4;
		});
		$('#age5').click(function() {
			$('#dropdownMenu2').html('55+ years old');
			age = 5;
		});
		$('#status1').click(function() {
			$('#dropdownMenu3').html('Single');
			marital = 1;
		});
		$('#status2').click(function() {
			$('#dropdownMenu3').html('Married');
			marital = 2;
		});
		$('#status3').click(function() {
			$('#dropdownMenu3').html('Divorced');
			marital = 3;
		});
		$('#status4').click(function() {
			$('#dropdownMenu3').html('Separated');
			marital = 4;
		});
		$('#status5').click(function() {
			$('#dropdownMenu3').html('Widowed');
			marital = 5;
		});
		var limitGender = 1;
		var countGender = 0;
		var selectedGender;
		$('input.form-check-input').on('change', function(evt) {
			if ($(this).val() === selectedGender) {
				countGender--;
			} else if (
				$(this).siblings(':checked').length >= limitGender ||
				countGender >= limitGender
			) {
				this.checked = false;
			} else {
				selectedGender = $(this).val();
				console.log(selectedGender);
				countGender++;
			}
		});
		var limitInterest = 1;
		var countInterest = 0;
		var selectedInterest;
		$('input.form-check-input2').on('change', function(evt) {
			if ($(this).val() === selectedInterest) {
				countInterest--;
			} else if (
				$(this).siblings(':checked').length >= limitInterest ||
				countInterest >= limitInterest
			) {
				this.checked = false;
			} else {
				selectedInterest = $(this).val();
				console.log(selectedInterest);
				countInterest++;
			}
		});

		$('#submitInfo').click(function() {
			console.log($('#dropdownMenu2').val());
			if (
				$('#dropdownMenu2')
					.html()
					.trim() !== 'Select your age'.trim() &&
				$('#dropdownMenu3')
					.html()
					.trim() !== 'Select your status'.trim() &&
				countGender > 0 &&
				countInterest > 0
			) {
				if (selectedInterest == 1) {
					selectedInterest = selectedGender;
				}

        var json = user.getData();
        console.log(json);
        console.log(parseInt(json.interestedGender) * 10);
        console.log(parseInt(json.marital));
				var weight = (json.reason * 1000) + (json.age * 100) + (parseInt(json.interestedGender) * 10) + parseInt(json.marital);
				user.setData(age, selectedGender, selectedInterest, marital, weight);
				json = user.getData();


				console.log(JSON.stringify(json));
				$http
					.post('/user', json)
					.then(function(response) {
						console.log('created account successfully');
						console.log(response);
					})
					.catch(function(response) {
						console.error('error in creating account');
					});
			}
		});
	}
]);
