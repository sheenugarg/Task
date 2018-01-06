app.controller('addTaskCtrl',function($scope,$state,LoginTokenService,appServices){
  var accesstoken=LoginTokenService.GetToken();
  if(accesstoken==null || accesstoken==undefined|| accesstoken=="")
  {
    $state.go('mainpage_login');
  }
  $scope.AddTask=function()
  {
    var response=appServices.AddTask($scope.mytask,$scope.mytaskdate,accesstoken);
    response.then(function(success){
      if(success.data.error==0)
      {
        $state.go('homepage.ViewAllTasks');
      }
      else {
        $scope.Add_Task_Message=true;
        $scope.AddTaskMessage="error occurred while inserting Task";
      }
    },function(error){
      $scope.Add_Task_Message=true;
      $scope.AddTaskMessage="error occurred while inserting Task.....Please Try Again Later";
    });
  }
})
