RandomCenas=new Mongo.Collection("cenas")
if (Meteor.isClient) {
  Session.setDefault('counter', 0);

  Template.stats.helpers({
    github:function(){
      return RandomCenas.findOne({api:"github"}).commits;
    }
  });

  HTTP.call('GET',"https://api.github.com/repos/jeKnowledge/jfalcaomapa/commits", {},function(error,response){
    B=response.data; // numero de commits
    //console.log(response.data);
    if(RandomCenas.findOne({api:"github"})===undefined){
      RandomCenas.insert({api:"github",
      commits: B.length,
      createdAt: new Date()
    })
    }else{ //update se ja existir
    Id=RandomCenas.findOne({api:"github"})._id;
    RandomCenas.update(Id,{$set: {commits: B.length}});
    }
  });

  HTTP.call('GET',"https://api.github.com/orgs/jeKnowledge/teams",{},function(error,response){
    C=response;
    console.log(response);
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
