exports.commonResponse=(message,success,data)=>{
       return {
         message:message ?? null,
         data:data ?? null,
         success
       }
}