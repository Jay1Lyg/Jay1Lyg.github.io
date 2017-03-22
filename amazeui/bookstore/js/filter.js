angular.module('filterApp',[])
	.filter('statusTextFilter', function() {
		return function(input) {
			return input === "true" ? "正常出售" : "暂无库存"
		}
	})
	.filter('statusColorFilter', function() {
		return function(input) {
			return input === "true" ? "green-text" : "red-text"
		}
	})