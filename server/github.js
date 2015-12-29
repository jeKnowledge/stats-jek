Github = {
  updateLastWeekCommits : function(name){

    //Delete old
    GitCollection.remove({commit:{$exists:true}});

    var d = new Date();
    d.setDate(d.getDate() -7);

    var link = "https://api.github.com/repos/jeknowledge/" + name + "/commits";

    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {
        "access_token": "f94934477049f5d19eaee42816b8fa6dab76ba90",
        "since": d.toISOString()
      }
    };

    HTTP.call('GET', link, arguments, function(error,response){
      var github = RandomCenas.findOne({api:"github"});
      if(response.data.length!==undefined){
        for(var i = 0; i < response.data.length; i++){
          var c = response.data[i];
          var authorCommit=c.author.login; //Commit info

          GitCollection.insert({
            commit: {
              message: c.commit.message,
              date: Date.parse(c.commit.author.date),
              repo: name,
              user: c.author.login
            }
          });

          GitCollection.update({lastCommitsnumb:{$exists:true}},{$inc:{lastCommitsnumb:1}});
        }
      }
    });
  },
  updateRepoData : function(name, data){
    var github=GitCollection.findOne({repositorios:"Lista"});
    var github1=GitCollection.findOne({totalCommits:{$exists:true}});

    //Repo TotalCommits
    var new_commits, sum = 0;

    for(var i = 0; i < data.length; i++){
      sum += data[i].total;
    }

    GitCollection.update(github1._id,{$inc:{totalCommits: sum}});
    //Org TotalCommits
    new_commits = sum;
    if(github.repos[name]){
      new_commits -= github.repos[name]
    }
    //Update Repo Data
    github.repos[name] = sum
    //Save
    GitCollection.update(github._id,{$set:{repos:github.repos}});
  },
  checkRepo : function(name){

    var link = "https://api.github.com/repos/jeknowledge/" + name + "/stats/contributors";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"access_token": "f94934477049f5d19eaee42816b8fa6dab76ba90"}
    };


    HTTP.call('GET', link, arguments, function(error,response){
      var github=GitCollection.findOne({repositorios:"Lista"});

      //does it exist in our db? Or has it changed?
      if(!github.repos[name] || github.repos[name] != response.data.total){
        if(response.data!== null){
          Github.updateRepoData(name.valueOf(), response.data);

        }
      }

    });
  },
  getRepoList : function(){

    var link = "https://api.github.com/orgs/jeknowledge/repos?per_page=50";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"access_token": "f94934477049f5d19eaee42816b8fa6dab76ba90"}
    };

    GitCollection.update({lastCommitsnumb:{$exists:true}},{$set:{lastCommitsnumb:0}});
    GitCollection.update({totalCommits:{$exists:true}},{$set:{totalCommits:0}});

    HTTP.call('GET', link, arguments, function(error,response){
      for(var i = 0; i < response.data.length; i++){
        if(response.data[i].name!=="list2gmaps.js" && response.data[i].name!=="repos.list2gmaps.js") {
          Github.checkRepo(response.data[i].name);
          Github.updateLastWeekCommits(response.data[i].name);
        }
      }
      });
  }

};
