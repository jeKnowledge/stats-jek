Template.facebook.helpers({
  facebook:function(){
    return RandomCenas.findOne({api:"facebook"});
  },
  DBposts:function(){
    return RandomCenas.find(
      {
        api:"facebook",
        posts:{$exists:true}
      },
      {
        sort:{"posts.date":-1}
      }
    );
  }
});
