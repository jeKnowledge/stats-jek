Github = {
  updateRepoData : function(name, data){

    var github = RandomCenas.findOne({api:"github"});

    //Repo TotalCommits
    var new_commits, sum = 0;
    for(var i = 0; i < data.length; i++)
      sum += data[i].total;

    //Org TotalCommits
    new_commits = sum;
    if(github.repos[name])
      new_commits -= github.repos[name]

    //Update Repo Data
    github.repos[name] = sum

    //Save
    RandomCenas.update(github._id,{
      $set: {totalCommits: github.totalCommits + new_commits, repos: github.repos}
    });
  },
  checkRepo : function(name){

    var link = "https://api.github.com/repos/jeknowledge/" + name + "/stats/contributors";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"access_token": "44288a326e1468aa17ec5eaddcb77f85e53029e6"}
    };


    HTTP.call('GET', link, arguments, function(error,response){
      var github = RandomCenas.findOne({api:"github"});

      //does it exist in our db? Or has it changed?
      if(!github.repos[name] || github.repos[name] != response.data.total)
        Github.updateRepoData(name.valueOf(), response.data);

      //getLastWeekCommits();

    });
  },
  getRepoList : function(){

    var link = "https://api.github.com/orgs/jeknowledge/repos";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"access_token": "44288a326e1468aa17ec5eaddcb77f85e53029e6"}
    };


    HTTP.call('GET', link, arguments, function(error,response){

      for(var i = 0; i < response.data.length; i++)
        Github.checkRepo(response.data[i].name);

    });
  }

};