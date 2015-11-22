//Inicializa a base de dados com valores default
function initDB(){
  if(RandomCenas.findOne({api: "github"}) === undefined){
    RandomCenas.insert({api:"github", totalCommits: 0, repos: {},lastCommitsnumb:0});
  }
  if(RandomCenas.findOne({api:"twitter"})=== undefined){
    RandomCenas.insert({api:"twitter",totalFoll:0,tweets:{}});
  }
}


Meteor.startup(function () {

  initDB();

  Meteor.methods({
    'updateGithub':function(){
      Github.getRepoList();
    },
    'addCenasTwitter':function(){
      RandomCenas.insert({
        api:"twitter",
        followers:0,
        tweets:0,
        createdAt:new Date()
      })
    },
    'updateCenasTwitFol':function(){
      Twitter.updateTotalFoll();
    }
  });

  //Meteor.call("updateGithub");

  /*T.get('users/show', { screen_name: 'jeknowledge' },  function (err, data, response) {
  console.log(data);
});

T.get('search/tweets', { q:@jeknowledge },function(err,data,response){
console.log(data);
});*/

});
