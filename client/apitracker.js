if (Meteor.isClient) {
  Template.stats.helpers({
    githubREP: function(){
      return RandomCenas.findOne({api:"github"}).repositorios;
    },
    githubCOM:function(){
      return RandomCenas.findOne({api:"github"}).commits;
    }

  });
  HTTP.call('GET',"https://api.github.com/teams/1366673/repos?access_token=a1879eb374090bd929545cb65b1455923bc2d39d",{},function(error,response){
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
        HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[k]+"/stats/commit_activity?access_token=a1879eb374090bd929545cb65b1455923bc2d39d",{},function(error,response){
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


  /*HTTP.call('GET',"https://api.twitter.com/1.1/followers/ids.json?q=jeknowledge&src=typd",{},function(error,response){
    var DataTwitter=response;
    if(RandomCenas.findOne({api:"twitter"})===undefined){
      RandomCenas.insert({
        api:"twitter",
        followers:[],
        tweets:[],
        createdAt:new Date()
      })
    }


  });*/


}
