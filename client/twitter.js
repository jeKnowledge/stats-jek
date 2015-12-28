Template.twitter.helpers({
  twitter:function(){
    return TwitterCollection.findOne({totalFoll:{$exists:true}});
  },
  dbTweets:function(){
    return TwitterCollection.find(
      {
        tweets: {$exists: true}
      },
      {
        sort: {"tweets.date": -1}
      }
    );
  }
});
