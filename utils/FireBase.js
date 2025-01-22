import { addDoc, collection, doc, GeoPoint, serverTimestamp, setDoc,getDoc } from "firebase/firestore"; 
import { db } from "./FireBaseConfig";

export const addListing = async (address, coordinates, createdBy) => {
    try {
        
        const geoPoint = new GeoPoint(
            coordinates.lat,
            coordinates.lng
        )
        const listingCollectionRef = collection(db, "listing")
        const docRef = await addDoc(listingCollectionRef, {
            active: false,
            address,
            coordinates: geoPoint,
            createdBy,
            createdAt: serverTimestamp()
        })
        
        return docRef.id
    } catch (error) {
        throw error
    }
};
export const updateListing=async(id,type,propertyType,bedroom,bathroom,builIn,parking,lotSize,area,price ,hoa ,description)=>{
    try{
        await setDoc(doc(db,'listing',id),{
            type,
            propertyType,
            bedroom,
            bathroom,
            lotSize,
            area,
            price,
            hoa,
            description,
            parking,
            builIn
        },
        {
            merge:true
        })
    }
    catch(error){
        console.log("Error")
    }
}
export const getListing=async(id)=>{
    const docRef = doc(db, "listing", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return docSnap.data()
    }return null
}
