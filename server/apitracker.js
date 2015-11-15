if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      'addCenasTwitter':function(){
          RandomCenas.insert({
            api:"twitter",
            followers:0,
            tweets:0,
            createdAt:new Date()
          })
        },
      'addCenasGit':function(){
        RandomCenas.insert({
          api:"github",
          repositorios:[],
          commits:[],
          createdAt:new Date()
        })
      },
      'updateCenasGitRep':function(rep){
        if(RandomCenas.findOne({api:"github"})!== undefined){
          var Id=RandomCenas.findOne({api:"github"})._id;
          RandomCenas.update(Id,{$push:{repositorios:rep}})
        }
      },
      'updateCenasGitComm':function(com){
        if(RandomCenas.findOne({api:"github"})!== undefined){
          var Id=RandomCenas.findOne({api:"github"})._id;
          RandomCenas.update(Id,{$push:{commits:com}})
        }
      },
      'resetCenasComm':function(){
        var Id=RandomCenas.findOne({api:"github"})._id;
        RandomCenas.update(Id,{$set:{commits:[]}})
      },
      'updateCenasTwitFol':function(fol){
        var Id2=RandomCenas.findOne({api:"twitter"})._id;

      }
    });


    var Twit = Meteor.npmRequire('twit')

    var T = new Twit({
    consumer_key:  'AWzYAlWFRhcPgDU9zsownZMg3',
    consumer_secret: 'aYpL3zMPfqRgtX1uCuBnotLsPQpEREEXVNPfNYna9FiIwTeDYR',
    access_token:  '4175010201-TEp9qNKzN2vYCaM0O4mvjkj0GMjJFZIbGPYaVv4',
    access_token_secret:  'EPpcJyN27E4P4LccSyWzvhJpYaTHflNFOv3DuR05kTP2j'
    });

    Twit.get("search/tweets",{q:"@jeknowledge"},function(err,data,response){
      console.log(data);
    });



    /*T.get('users/show', { screen_name: 'jeknowledge' },  function (err, data, response) {
      console.log(data.followers_count);

      if(cenas.findOne({api:"twitter"})===undefined){
      cenas.insert({
        api:"twitter",
        followers:data.followers_count,
        tweets:[],
        createdAt:new Date()
      });
      var Id2=cenas.findOne({api:"twitter"});
      }
    });
    /*T.get('search/tweets', { q:@jeknowledge },function(err,data,response){
      console.log(data);
    });*/


});
}
