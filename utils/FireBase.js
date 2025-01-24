import { addDoc, collection, doc, GeoPoint, serverTimestamp, setDoc,getDoc,query,where,getDocs } from "firebase/firestore"; 
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
export const updateListing=async(id,type,propertyType,bedroom,bathroom,builIn,parking,lotSize,area,price ,hoa ,description,
    profileImage,fullName)=>{
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
            builIn,
            profileImage,
            fullName
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

export const uploadImageFirebase=async(listing_id,url)=>{
    try {
        const listingCollectionRef = collection(db, "listingImages")
        const docRef = await addDoc(listingCollectionRef, {
            listing_id,
            url
        })
        return docRef.id
    } catch (error) {
        throw error
    }
}

export const getImages=async(id)=>{
    const docRef = collection(db, "listingImages");
    const q = query(docRef, where("listing_id", "==", id))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => doc.data())
    }
    return null
}

export const publishListingFirebase=async(id)=>{
    try{
        await setDoc(doc(db,'listing',id),{
            active:true
        },
        {
            merge:true
        })
    }
    catch(error){
        console.log("Error")
    }
}
