app.service('appServices',function(config,$http) {
  var ipAddress=config.ipAddress;
  this.login=function(email,password)
  {
    return $http
    ({
      method: 'POST',
      url: ipAddress+'/login',
      headers: {
        'Content-Type': "application/json"
        },
      data: { email: email,password:password}
    });

  }
  this.AddTask=function(task,mydate,mytoken)
  {
    return $http({
      method: 'POST',
      url: ipAddress+'/add_task',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken
        },
      data: { task: task,date:mydate}
    });
  }
  this.UpdateTask=function(mytoken,taskid,taskname)
  {
      return $http({
        method: 'POST',
        url: ipAddress+'/edit_task',
        headers: {
          'Content-Type': "application/json",
          'access_token':mytoken,
          'task_id':taskid
          },
        data: { task:taskname}
      });
  }
  this.signup=function(email,password,confirm_password){
    return $http({
      method: 'POST',
      url: ipAddress+'/register',
      headers: {
        'Content-Type': "application/json"
        },
      data: { email: email, password: password, con_password: confirm_password }
});
  }
  this.ViewAllTasks=function(mytoken)
  {
    return $http({
      method: 'GET',
      url: ipAddress+'/view_all_task',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken
        }
    });
  }
  this.ChangeTaskStatus=function(mytoken,taskid)
  {
    return $http({
      method: 'GET',
      url: ipAddress+'/task_status',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken,
        'task_id':taskid
      }
    });
  }
  this.DeleteTask=function(mytoken,taskid)
  {
    return $http({
      method: 'DELETE',
      url: ipAddress+'/delete',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken,
        'task_id':taskid
        }
    });
  }
});
