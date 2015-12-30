//Inicializa a base de dados com valores default
function initDB(){
  if(RandomCenas.findOne({api: "github"}) === undefined){
    RandomCenas.insert({api:"github", totalCommits: 0, repos: {},lastCommitsnumb:0 });

  }
  if(GitCollection.findOne({repositorios:"Lista"})===undefined){
    GitCollection.insert({repositorios:"Lista",repos:{}});
    GitCollection.insert({totalCommits:0})
  }

};

Meteor.startup(function () {

  initDB();


  Meteor.methods({
    'updateGithub':function(){
      Github.getRepoList();
    },

    'updateCenasTwitFol':function(){
      Twitter.updateTotalFoll();
    },
    'updateFacebook':function(){
      Facebook.getFacebookStats();
    },
    'updateSlack':function(){
      Slack.LastMsg();
    }
  });

});
