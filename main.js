angular.module('myApp', ['ngAnimate'])
  .controller('InstagramCtrl', function($scope, $q, $http){
    console.log('InstagramCtrl');
    
    // Whenever we receive our promise back then go ahead and run this
    $scope.submitForm = function(){
      searchInstagram($scope.tag)
      .then(function(data){
        $scope.photos = data.data;
        $scope.loading = false;
      }, function(error){
        alert('error: ' + error );
      });
    };    

    //Private function for now, but it could very well be inside of a service. 
    // This would send our promise back to the submitForm whenever is ready. 
    var searchInstagram = function(tag){
      var defer = $q.defer();
      $scope.loading = true;
      // API end-point
      var url = "https://api.instagram.com/v1/tags/"+ tag +"/media/recent";
       
      // API call
      var request = {
        client_id: "96c6601d84304b20a374b8064b973535",
        callback: 'JSON_CALLBACK'
      };

      // Query parameters
      $http({
        method: 'JSONP',
        url: url,
        params: request
      })
      .success(function(data){
          console.log('success', data);
          defer.resolve(data);
      })
      .error(function(data){
          console.log('error:', data);
          defer.reject(data);
      });
        // we return the promise whether is success or error
        return defer.promise;
    };
});


