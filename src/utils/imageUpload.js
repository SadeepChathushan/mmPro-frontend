import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zemZ1anNlY2VveHd5d2RmdWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0ODU3OTEsImV4cCI6MjA1MjA2MTc5MX0.QtDzZZvzfzDSpTDERfZzRCBXw5IcJibx7g0oVM-SQ3g`;
const url = "https://mszfujseceoxwywdfulj.supabase.co";


export default function uploadMediaToSupabase(file){
    return new Promise((resolve, reject) =>{
        if(file==null){
            reject("File not added");
        }

        let fileName = file.name;
        const extension = fileName.split(".")[fileName.split(".").length - 1];

        const supabase = createClient(url, key);

        const timestamp = new Date().getTime();

        fileName = timestamp + "." + extension;

        supabase.storage.from("images").upload(fileName,file,{
            casheControl : "3600",
            upsert : false,

        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.pubicUrl;
            resolve(publicUrl);
        }).catch((err)=>{
            reject(err);
        });
    });
    
}