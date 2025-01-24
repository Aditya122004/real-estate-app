import { supabase } from "./SupabaseConfig";

export const ImageUpload=async(file,fileName,fileExt)=>{
    try{
        await supabase.storage.from('listingImages').upload(`${fileName}`,file,{
            contentType:`image/${fileExt}`,
            upsert:false
        })
    }
    catch(error){
        console.log(error)
    }
    
}