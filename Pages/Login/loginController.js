app.controller('loginctrl',function($scope,$state,appServices,LoginTokenService){
$scope.login=function()
 {
   var response=appServices.login($scope.login_email,$scope.login_password);
   response.then(function(success){
     if(success.data.error==0)
     {
       LoginTokenService.AddToken(success.data.token);
       $state.go('homepage.AddTask');
     }
     if(success.data.error==1)
     {
       $scope.Login_Messages=true;
       $scope.LoginMessages=success.data.message;
     }
   },function(err){
     $scope.Login_Messages=true;
     $scope.LoginMessages="Error Occurred In Communicating To Server";
   });
 }
})
