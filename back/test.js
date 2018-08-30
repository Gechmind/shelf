let request = require('async-request'),response;

async function test(){
   var result =  await request("http://img7.doubanio.com/view/subject/s/public/s28296984.jpg");
   console.log(result.body);
}

test();