import { createClient } from "@supabase/supabase-js";

const key = ""
const url = ""

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