RandomCenas=new Mongo.Collection("cenas")
if (Meteor.isClient) {

  Template.stats.helpers({
    githubREP: function(){
      return RandomCenas.findOne({api:"github"}).repositorios;
    },
    githubCOM:function(){
      return RandomCenas.findOne({api:"github"}).commits;
    }

  });
  HTTP.call('GET',"https://api.github.com/teams/1366673/repos?access_token=b0617692aaf46fae957280f5e9f4143dfb1b1bcd",{},function(error,response){
    var Data1=response.data;
    if(RandomCenas.findOne({api:"github"})===undefined){
      RandomCenas.insert({
        api:"github",
        repositorios:[],
        commits:[],
        createdAt:new Date()
      });
      var Id=RandomCenas.findOne({api:"github"})._id;
      for(i=0;i<Data1.length;i++){
        RandomCenas.update(Id,{$push:{repositorios:Data1[i]}});
        HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[i]+"/stats/commit_activity",{},function(error,response){
          var Data2=response.data;
          RandomCenas.update(Id,{$push:{commits:1}})
        });
      }
    }else if(RandomCenas.findOne({api:"github"}).repositorios.length!==Data1.length){
      var Id=RandomCenas.findOne({api:"github"})._id;
      RandomCenas.update(Id,{$set:{commits:[]}})
      for(k=RandomCenas.findOne({api:"github"}).repositorios.length;k<Data1.length;k++){
        RandomCenas.update(Id,{$push:{repositorios:Data1[k]}});
        console.log("infinitoooooooo");
        HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[k]+"/stats/commit_activity",{},function(error,response){
          var sum=0;
          for(k=0;k<response.data.length;k++){
            sum+=response.data[k].total;
          }
          RandomCenas.update(Id,{$push:{commits:sum}})
        });
      }
    }else if(RandomCenas.findOne({api:"github"}).repositorios.length===Data1.length && RandomCenas.findOne({api:"github"}).repositorios.length!==0){
      var Id=RandomCenas.findOne({api:"github"})._id;
      RandomCenas.update(Id,{$set:{commits:[]}})
      for(k=0;k<RandomCenas.findOne({api:"github"}).repositorios.length;k++){
        HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/"+RandomCenas.findOne({api:"github"}).repositorios[k]+"/stats/commit_activity?access_token=b0617692aaf46fae957280f5e9f4143dfb1b1bcd",{},function(error,response){
          var sum=0;
          for(k=0;k<response.data.length;k++){
            sum+=response.data[k].total;
          }
          RandomCenas.update(Id,{$push:{commits:sum}})
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

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
