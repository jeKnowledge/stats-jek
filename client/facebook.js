Template.facebook.helpers({
  facebookTot:function(){
    return FbookCollection.findOne({totalLikes:{$exists:true}});
  },
  facebookDif:function(){
    return FbookCollection.findOne({difLikes:{$exists:true}});
  },
  facebookTotMent:function(){
    return FbookCollection.findOne({totalMents:{$exists:true}});
  },
  facebookLastEv:function(){
    return FbookCollection.findOne({lastEvent:{$exists:true}});
  },
  DBposts:function(){
    return FbookCollection.find(
      {
        posts:{$exists:true}
      },
      {
        sort:{"posts.date":-1}
      }
    );
  }
});
