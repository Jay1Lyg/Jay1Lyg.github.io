angular.module('ctrlApp',[])
	.controller('BookListController', ['$scope', '$http', function($scope, $http) {
		$scope.orderby = "title";
		$http({
			method: 'get',
			url: 'db/books.json'
		}).success(function(res) {
			//res {"datas":[...]}
			//console.log(res)
			$scope.books = res.datas;
		}).error(function(error) {
			console.log(error)
		})
	}])
	.controller('BookDetailController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		//console.log($routeParams.id)
		$scope.id = $routeParams.id;

		$scope.imgSrc = $routeParams.id
		$scope.changeSrc = function(image) {
			$scope.imgSrc = image;
		}

		$http({
			method: 'get',
			url: 'db/' + $routeParams.id + '.json'
		}).success(function(res) {
			console.log(res)
			$scope.book = res;
		}).error(function(err) {
			console.log(err)
		})

	}])