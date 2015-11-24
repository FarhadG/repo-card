
angular.module('MyApp')

.controller('AppCtrl', function($scope) {

  $scope.repoCardData = {
    repo: null,
    username: null,
    title: null,
    subtitle: null,
    thumb: null,
    background: null,
    info: null,
    position: {
      bottom: 20,
      left: 20
    }
  };

  $scope.configure = function() {
    RepoCard.configure($scope.repoCardData);
    console.log('configured');
  };


  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.rating1 = 3;
  $scope.rating2 = 2;
  $scope.rating3 = 4;

  $scope.disabled1 = 0;
  $scope.disabled2 = 70;

});
