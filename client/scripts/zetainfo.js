myApp.directive('zetaInfo',
  function(){
      return {
          restrict: "AE",
          scope: {
              info: "=",
              action: '&'
          },
          templateUrl: "assets/views/zetainfo.html"
      }
  }
);