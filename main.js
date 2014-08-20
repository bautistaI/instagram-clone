angular.module('myApp', [])
  .controller('InstagramCtrl', function($scope, $q, $http){
   
    $scope.submit = function(){
       var url = "https://api.instagram.com/v1/tags/{tag}/media/recent";

       // var searchTag = $scope.myForm.searchTag.$dirty; 
    
       var request = {
         apikey: "96c6601d84304b20a374b8064b973535",
         outputMode: 'json',
         q: keyword,
         jsonp: 'JSON_CALLBACK'
        };
      
      $http({
        method: 'JSONP',
        url: url,
        params: request
      })
      .success(function(data, status){
        alert('success', status)
      })
      .error(function(data, status){
        alert('error:', status);
      })
    };
  });


