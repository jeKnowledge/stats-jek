Template.twitter.helpers({
  twitter:function(){
    return RandomCenas.findOne({api:"twitter"});
  },
  dbTweets:function(){
    return RandomCenas.find(
      {
        api: "twitter",
        tweets: {$exists: true}
      },
      {
        sort: {"tweets.date": -1}
      }
    );
  }
});
