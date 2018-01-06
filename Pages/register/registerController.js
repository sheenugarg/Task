app.controller('registerCtrl',function($scope,$state,appServices){
  $scope.signup=function()
    {
      var response=appServices.signup($scope.user_email,$scope.user_password,$scope.user_confirm_password);
      response.then(function(success){
        $state.go('mainpage_login');
      },function(err){
        $scope.Register_Messages=true;
        $scope.RegisterMessages=err.data.message;
      });
    }
})
