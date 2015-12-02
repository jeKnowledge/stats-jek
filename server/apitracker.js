//Inicializa a base de dados com valores default
function initDB(){
  if(RandomCenas.findOne({api: "github"}) === undefined){
    RandomCenas.insert({api:"github", totalCommits: 0, repos: {},lastCommitsnumb:0,pessoas: {} });
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

    'updateCenasTwitFol':function(){
      Twitter.updateTotalFoll();
    }
  });


});
