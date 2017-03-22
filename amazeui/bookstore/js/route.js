angular.module('routeApp',['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list.html',
				controller: 'BookListController'
			})
			.when('/:id', {
				templateUrl: 'detail.html',
				controller: 'BookDetailController'
			})
			.otherwise({
				redirectTo: '/'
			})
	}])