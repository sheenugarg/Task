app.controller("ViewTaskCtrl", function($scope,appServices,LoginTokenService,$state,EditDetailsService,$timeout) {
  $scope.alltasks=[];
  $scope.taskDeleted="";
  var mytoken=LoginTokenService.GetToken();
  if(mytoken==null || mytoken==undefined|| mytoken=="")
  {
    $state.go('mainpage_login');
  }
  $scope.ViewAllTasks=function()
  {
    var response=appServices.ViewAllTasks(mytoken);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.alltasks=success.data.data;
      }
      else {
        $scope.View_Task_Messages=true;
        $scope.ViewTaskMessages="Error Occurred";
      }
    },function(error){
      $scope.View_Task_Messages=true;
      $scope.ViewTaskMessages="Error Occurred While Communicating To Server!!!";
    });
  }
  $scope.ViewAllTasks();
  $scope.GetTaskStatus=function(status)
  {
    if(status==true)
    {
      return "images/complete.jpg";
    }
    else {
      return "images/incomplete.png";
    }
  }
  $scope.GetClassOnTaskStatus=function(taskDate,taskStatus)
  {
    var today=new Date();
    taskDate=new Date(taskDate);
    if(taskStatus==true)
    {
      return "complete";
    }
    else if(today>taskDate)
    {
      return "overdue";
    }
    else {
      return "normal";
    }
  }
  $scope.ChangeTaskStatus=function(taskid)
  {
    var response=appServices.ChangeTaskStatus(mytoken,taskid);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.ViewAllTasks();
      }
      else {
        $scope.View_Task_Messages=true;
        $scope.ViewTaskMessages="Error occurred while updating task status";
        ClearViewTaskMessages();
      }
    },function(error){
      $scope.View_Task_Messages=true;
      $scope.ViewTaskMessages="Error occurred while updating task status..........Please Try again later";
      ClearViewTaskMessages();
    });
  }
  function ClearViewTaskMessages()
  {
    $timeout(function(){
      $scope.ViewTaskMessages="";
      $scope.View_Task_Messages=false;
    },1000);
  }
  $scope.EditTask=function(id,task)
  {
    EditDetailsService.AddDetails(id,task);
    $state.go('homepage.editTask');
  }
  $scope.DeleteTask=function(taskid)
  {
      $scope.taskDeleted=taskid;
  }
  $scope.ConfirmDeletion=function()
  {
    var response=appServices.DeleteTask(mytoken,$scope.taskDeleted);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.ViewAllTasks();
      }
      else {
        $scope.View_Task_Messages=true;
        $scope.ViewTaskMessages="Error occurred while deleting task";
        ClearViewTaskMessages();
      }
    },function(error){
      $scope.View_Task_Messages=true;
      $scope.ViewTaskMessages="Error occurred while communicating to server";
      ClearViewTaskMessages();
    });
  }
  $scope.CancelDeletion=function()
  {
    $scope.taskDeleted="";
    $scope.ViewAllTasks();
  }
});
