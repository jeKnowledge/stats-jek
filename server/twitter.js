var Twit = Meteor.npmRequire('twit');

var T = new Twit({
  consumer_key:  'AWzYAlWFRhcPgDU9zsownZMg3',
  consumer_secret: 'aYpL3zMPfqRgtX1uCuBnotLsPQpEREEXVNPfNYna9FiIwTeDYR',
  access_token:  '4175010201-TEp9qNKzN2vYCaM0O4mvjkj0GMjJFZIbGPYaVv4',
  access_token_secret:  'EPpcJyN27E4P4LccSyWzvhJpYaTHflNFOv3DuR05kTP2j'
});

Twitter={
  updateTotalFoll:function(){

    TwitterCollection.remove({tweets: {$exists: true}});
    TwitterCollection.insert({totalFoll:0});
    
    T.get('statuses/user_timeline', { screen_name: 'jeknowledge', count:5 },  Meteor.bindEnvironment(function (err, data, response){
      TwitterCollection.update({totalFoll:{$exists:true}},{$set:{totalFoll:data[0].user.followers_count}});
      for(i=0;i<5;i++){
        var c=data[i];
        TwitterCollection.insert({
            tweets:{
              message: c.text,
              date: Date.parse(c.created_at),
              fav:c.favorite_count,
              retweet:c.retweet_count
          }
        });
      }

    }));
  }
};
