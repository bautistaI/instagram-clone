angular.module('myApp', ['ngAnimate'])
  .controller('InstagramCtrl', function($scope, $q, $http){
    // hide messages by default
    $scope.foundPhotos = true;
    $scope.noPhotos = true;
    $scope.bigImage = true;
    
    // Whenever we receive our promise back then go ahead and run this
    $scope.submitForm = function(){
      searchInstagram($scope.tag)
      .then(function(data){
        $scope.photos = data.data;
        $scope.loading = false;
        $scope.tag = '';
      }, function(error){
        $scope.tag = '';
        $scope.loading = false;
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
        // show found photos message hide no photos found message
        $scope.foundPhotos = false;
        $scope.noPhotos = true;
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

    // on image click display larger version
    $scope.biggerImage = function(){
      $scope.bigImage = false;
      // $scope.largeImage = false;
      $scope.thumbnail = true;
    };
    // on click hide large image show thumbnails
    $scope.thumbnailImage = function(){
      $scope.bigImage = true;
      $scope.thumbnail = false;
    };
});

