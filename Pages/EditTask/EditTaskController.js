app.controller('EditTaskCtrl',function($scope,$state,appServices,EditDetailsService,LoginTokenService,$timeout){
var obj=EditDetailsService.GetDetails();
var mytoken=LoginTokenService.GetToken();
if(mytoken==null || mytoken==undefined|| mytoken=="")
{
  $state.go('mainpage_login');
}
$scope.EditTaskId=obj.id;
$scope.EditTaskName=obj.name;
$scope.UpdateTask=function()
  {
    var response=appServices.UpdateTask(mytoken,$scope.EditTaskId,$scope.EditTaskNewName);
    response.then(function(success){
      if(success.data.error==0)
      {
        $state.go('homepage.ViewAllTasks');
      }
      else {
        $scope.Edit_Messages=true;
        $scope.EditMessages="Error Occurred While Updating Task";
      }
    },function(error){
      $scope.Edit_Messages=true;
      $scope.EditMessages="Error Occurred While Updating Task....Try Again Later!!!";
    });
  }
})
