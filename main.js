angular.module('myApp', ['ngAnimate'])
  .controller('InstagramCtrl', function($scope, $q, $http){
    // hide messages by default
    $scope.foundPhotos = true;
    $scope.noPhotos = true;

    // hide invalid search message
    $scope.invalidSearch = true;
    
    // Whenever we receive our promise back from the searchInstagram function, then go ahead and run this
    $scope.submitForm = function(){
      var validForm = $scope.myForm.$valid;
      var validSearch = $scope.myForm.myTag.$dirty;

      if(validForm && validSearch){
        $scope.invalidSearch = true;
        searchInstagram($scope.tag)
        .then(function(data){
          $scope.photos = data.data;
          $scope.loading = false;
          $scope.tag = '';
        }, function(error){
          $scope.tag = '';
          $scope.loading = false;
        });
      }else{
        $scope.invalidSearch = false;
      }
    };

    //Private function for now, but it could very well be inside of a service. 
    // This would send our promise back to the submitForm whenever is ready. 
    var searchInstagram = function(tag){
      // instance of defer object
      var defer = $q.defer();

      // hide loading gif animation on true
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
      .success(function(data, meta){
        console.log('success', data);
        // display the error message from the meta object
        $scope.apiError = data.meta.error_message;
     
        // show found photos message hide no photos found message
        $scope.foundPhotos = false;
        $scope.noPhotos = true;
        $scope.searchTag = tag;
        
        defer.resolve(data);
      })
      .error(function(data){
        // hide found photos message show no photos found message
        $scope.foundPhotos = true;
        $scope.noPhotos = false;
        defer.reject(data);
      });
        // we return the promise whether is success or error
        return defer.promise;
    };
});