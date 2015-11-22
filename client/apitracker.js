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

Template.github.events({
  'click button' : function(){

    Meteor.call("updateGithub");
    //Meteor.call("updateCenasTwitFol");
  }
});

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
console.log(rString);


 /*var link="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=jeknowledge"
  var arguments={
    headers: {"User-Agent":"Meteor/1.0"},
    params : {
      "oauth_consumer_key":"AWzYAlWFRhcPgDU9zsownZMg3",
      "oauth_nonce":rString,
      "oauth_signature":"tnnArxj06cWHq44gCs1OSKk%2FjLY%3D",
      "oauth_signature_method":"HMAC-SHA1",
      "oauth_timestamp":""+(new Date().getTime()/1000).toFixed(0)+"",
      "oauth_token":"4175010201-TEp9qNKzN2vYCaM0O4mvjkj0GMjJFZIbGPYaVv4",
      "oauth_version":"1.0"
    }
  };
  HTTP.call('POST',link,arguments,function(error,response){
      console.log(error);
  })
*/
