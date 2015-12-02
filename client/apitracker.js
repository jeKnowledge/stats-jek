Template.stats.helpers({
  });


Template.stats.events({
  'click #aGithub':function(){
    $(".twitter").css('display', 'none');
    $(".facebook").css('display', 'none');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'block');
  },
  'click #aTwitter':function(){
    $(".twitter").css('display', 'block');
    $(".facebook").css('display', 'none');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'none');
  },
  'click #aFacebook':function(){
    $(".twitter").css('display', 'none');
    $(".facebook").css('display', 'block');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'none');
  },
   'click #aSlack':function(){
      $(".twitter").css('display', 'none');
      $(".facebook").css('display', 'none');
      $(".slack").css('display', 'block');
      $(".github").css('display', 'none');
    }
});
Template.github.events({
  'click button' : function(){
    Meteor.call("updateGithub");
  }

});
Template.twitter.events({
  'click button' : function(){
    Meteor.call("updateCenasTwitFol");
  }
});


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
