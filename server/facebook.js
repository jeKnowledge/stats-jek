Facebook={
  getFacebookStats:function(){
    var d = new Date();
    d.setDate(d.getDate() - 7);

    var link = "https://graph.facebook.com/v2.5/jeknowledge?fields=likes";
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {
        "access_token": "CAAXbhZBRfBXcBAHURIw8VmueLZBxpxCuZC2flsGZCVAmZBvzSMiNAPlFjOuoGyYv1T0rHhsG8blme4Vp3aGPkqgI06XF4IzZC2PPhmBIfxfrFkEPbzVTZB3SHVYEKEZBtcVpKLMJCBdv9gktrS3bfb18yFbzRegmnoZCjMZCQTiWDIF7bL3AkXqOVqp6kjCLmZAU7EZD",
      }
    };

    var Id3=RandomCenas.findOne({api:"facebook"})._id;

    HTTP.call('GET',link,arguments,function(error,response){
      RandomCenas.update(Id3,{$set:{totalLikes:response.data.likes}});
    });

    RandomCenas.remove({posts:{$exists:true}})
    var link2="https://graph.facebook.com/v2.5/jeknowledge?fields=posts.since("+d.toISOString()+")"
    HTTP.call('GET',link2,arguments,function(error,response){
      var maxN=response.data.posts.data.length;
      var data=response.data.posts.data;
      for (i=0;i<maxN;i++){
        RandomCenas.insert({
          api:"facebook",
          posts:{
            message:data[i].message,
            date:data[i].created_time,
            vat:data[i].story
          }
        });
      }
    });

    var link3="https://graph.facebook.com/v2.5/jeknowledge?fields=tagged.since("+d.toISOString()+")";
    var call3=HTTP.call('GET',link3,arguments);
    console.log(call3.data.tagged.data.length);
    RandomCenas.update(Id3,{$set:{totalMents:call3.data.tagged.data.length}});

    var link4="https://graph.facebook.com/v2.5/jeknowledge?fields=events";
    var call4=HTTP.call('GET',link4,arguments);
    var data1=call4.data.events.data[0];
    RandomCenas.update(Id3,{$set:{lastEvent:{
      nome:data1.name,
      descriçao:data1.description,
      lugar:data1.place.name,
      data:data1.start_time.substring(0,10) 
    }
    }});
    /*var link2="https://graph.facebook.com/v2.2/oauth/access_token?grant_type=fb_exchange_token&client_id=1648751582053751&client_secret=7813719a7e72e52df6addda824ea7a9d&fb_exchange_token=CAAXbhZBRfBXcBAI2hH7V3g8uYvkWv9tolZC7KGexiwyseVovHZCsRTjnEarejySYZBPDvZBJAiFMxA88PYZBFSd5vpyznvh7bLc1tD5igxvASHZAywjRHwWWDkSbuWNY6i0pJDV5yZCR7MZBWsTqsVbe15udKujmdYc0L6fKCEnnuqyryg7DVu1hzNybjg3gOnbZATcmTeg577NgZDZD"
    HTTP.call('GET',link2,arguments,function(error,response){
        console.log(response);
    });*/
  },

};
