var imdb250Controllers = angular.module('imdb250Controllers', []);


function searchAndSort(input, searchTerm, criteria, accending){

		criteria = criteria || "rank";
		var searching = function(movie){
			return movie.title.search(searchTerm)!=-1;
		}
		var compare = function(movie1, movie2){
			return ((movie1[criteria]<movie2[criteria]) ^ accending)? -1 : 1;
		}
		var result = input.filter(searching)
		result.sort(compare);
		// $scope.movieTotal = result.length;
		return result;
}

function searchWithCatagory(input, catagory){
		var result;
		console.log(catagory);
		var searching = function(movie){
			return movie.genre.indexOf(catagory)!=-1;
		}
		if (catagory!='All'){
			result = input.filter(searching);
		}else{
			result = input.slice(0);
		}
		return result;
}

function listController($scope, $http){
	$scope.init = function(){
		$http.get('data/imdb250.json').success(function(data){
			$scope.movies = data;
			$scope.selectedMovies = data;
		});
	};
	$scope.searchChange = function(){
		$scope.selectedMovies = searchAndSort($scope.movies, $scope.searchterm, $scope.criteria, $scope.accending);
	};
	$scope.imgSource = function(movieID){
		movieID = movieID || "tt0111161";
		return "data/images/"+movieID+".jpg";
	};
	$scope.init();
}

function galleryController($scope, $http){
	$scope.init = function(){
		$http.get('data/imdb250.json').success(function(data){
			$scope.movies = data;
			$scope.selectedMovies = data;
			$scope.genres =  ["All", "Action", "Adventure", "Crime", "Comedy", "Drama", "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
		});
	};
	$scope.genreChange = function(genre){
		$scope.selectedMovies = searchWithCatagory($scope.movies, genre);
	};
	$scope.imgSource = function(movieID){
		movieID = movieID || "tt0111161";
		return "data/images/"+movieID+".jpg";
	};
	$scope.init();
}

function detailController($scope, $http, $routeParams){
	$scope.init = function(){
		$http.get('data/imdb250.json').success(function(data){
			$scope.movies = data;
			$scope.setIndex($routeParams.rank-1);
			$scope.indexChange();
		});
	};
	$scope.next = function(){
		$scope.movieIndex = ($scope.movieIndex+1)%$scope.movies.length;
		$scope.indexChange();
	}
	$scope.before = function(){
		$scope.movieIndex = ($scope.movieIndex+$scope.movies.length-1)%$scope.movies.length;
		$scope.indexChange();
	}
	$scope.setIndex = function(index){
		$scope.movieIndex = (index)%$scope.movies.length;
		$scope.indexChange();
	};
	$scope.indexChange = function(){
		$scope.currentMovie = $scope.movies[$scope.movieIndex];
	};
	$scope.imgSource = function(movieID){
		movieID = movieID || "tt0111161";
		return "data/images/"+movieID+".jpg";
	};
	$scope.init();
}

function compareController($scope, $http){
	function random(){
		var length = $scope.movies.length || 1;
		return Math.floor(Math.random() * length);
	}
	$scope.init = function(){
		$http.get('data/imdb250.json').success(function(data){
			$scope.movies = data;
			$scope.leftMovie = $scope.movies[random()];
			$scope.rightMovie = $scope.movies[random()];
		});
	};
	$scope.random = function(){
		$scope.rightMovie = $scope.movies[random()];
	};
	$scope.exchange = function(){
		var temp = $scope.leftMovie;
		$scope.leftMovie = $scope.rightMovie;
		$scope.rightMovie = temp;
	};
	$scope.imgSource = function(movieID){
		movieID = movieID || "tt0111161";
		return "data/images/"+movieID+".jpg";
	};
	$scope.init();
}

imdb250Controllers.controller("listController",["$scope","$http", listController]);
imdb250Controllers.controller("galleryController", ["$scope", "$http", galleryController]);
imdb250Controllers.controller("detailController", ["$scope", "$http", "$routeParams", detailController]);
imdb250Controllers.controller("compareController", ["$scope", "$http", compareController]);