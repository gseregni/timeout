function intersect(a, b) {
    var t;
    // if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
      // console.log(e.text);
        if (b.indexOf(e.text) !== -1) return true;
    });
}


// Array.prototype.chunk = function(chunkSize) {
//     var array=this;
//     return [].concat.apply([],
//         array.map(function(elem,i) {
//             return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
//         })
//     );
// }
function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}


var myApp = angular.module('timeoutApp',[]);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
  

  $scope.searchTags = [];
  $http({
    method: 'GET',
    url: 'trello.json'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.cards = [];
    // make some fixes on the model coming from trello
    $(response.data.cards).each(function() {
      var card = this;

      if (card.idList != "56d377826442c3764a406d48")
        return;

      console.log(card);
      $scope.cards.push(card);
    });

  }, function errorCallback(response) {
  });

  $scope.getCover = function(card) {
    var ret = "";
    $(card.attachments).each(function() {
      console.log("card");
      if (this.url.endsWith(".jpg")) {
        console.log("card", this.url);
        ret = this.url;
      }
    });
    return ret;
  }
  

}]);

