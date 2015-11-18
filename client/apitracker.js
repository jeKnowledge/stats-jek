Template.stats.helpers({
  githubREP: function(){
    return RandomCenas.findOne({api:"github"}).repositorios;
  },
  githubCOM:function(){
    return RandomCenas.findOne({api:"github"}).commits;
  },
  twitterFOL:function(){
    return RandomCenas.findOne({api:"twitter"}).followers;
  },
  twitterTWT:function(){
    return RandomCenas.findOne({api:"twitter"}).tweets;
  }

});

Template.stats.events({
  'click button' : function(){
    /*
    var d = new Date();
    d.setDate(d.getDate() - 7);

    var link = "https://api.github.com/repos/jeknowledge/" + "b3-tour" + "/commits";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {
        "access_token": "87c7bbdab315e2767296510f7914a7298fe79347",
        "since": d.toISOString()
      }
    };


    HTTP.call('GET', link, arguments, function(error,response){
      var github = RandomCenas.findOne({api:"github"});

      for(var i = 0; i < response.data.length; i++){
        console.log(response.data[i]);
      }

    });*/

    Meteor.call("updateGithub");
  }
});
/*HTTP.call('GET',"https://api.github.com/teams/1366673/repos?access_token=",{},function(error,response){
  var Data1=response.data;
  if(RandomCenas.findOne({api:"github"})===undefined){
    Meteor.call('addCenasGit');
    var Id=RandomCenas.findOne({api:"github"})._id;
    for(i=0;i<Data1.length;i++){
      Meteor.call('updateCenasGitRep',Data1[i].name);
      HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[i]+"/stats/commit_activity",{},function(error,response){
        var Data2=response.data;
        Meteor.call('updateCenasGitComm',Data2.length);
      });
    }
  }else if(RandomCenas.findOne({api:"github"}).repositorios.length!==Data1.length){
    var Id=RandomCenas.findOne({api:"github"})._id;
    for(k=RandomCenas.findOne({api:"github"}).repositorios.length;k<Data1.length;k++){
      Meteor.call('updateCenasGitRep',Data1[k].name);

      HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[k]+"/stats/commit_activity",{},function(error,response){
        var sum=0;
        for(k=0;k<response.data.length;k++){
          sum+=response.data[k].total;
        }
        Meteor.call('updateCenasGitComm',sum);
      });
    }
  }else if(RandomCenas.findOne({api:"github"}).repositorios.length===Data1.length){
    var Id=RandomCenas.findOne({api:"github"})._id;
    Meteor.call('resetCenasComm');
    for(k=0;k<RandomCenas.findOne({api:"github"}).repositorios.length;k++){
      HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[k]+"/stats/commit_activity?access_token=",{},function(error,response){
        var sum=0;
        for(k=0;k<response.data.length;k++){
          console.log("aqui")
          sum+=response.data[k].total;
        }
        Meteor.call('updateCenasGitComm',sum);
      });
    }
  }
});
Meteor.call('addCenasTwitter');
Meteor.call('updateCenasTwitFol');*/
