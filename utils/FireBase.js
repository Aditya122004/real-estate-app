import { addDoc, collection, doc, GeoPoint, serverTimestamp, setDoc,getDoc,query,where,getDocs, deleteDoc} from "firebase/firestore"; 
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
export const updateListing=async(id,type,propertyType,bedroom,bathroom,builtIn,parking,lotSize,area,price ,hoa ,description,
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
            builtIn,
            profileImage,
            fullName
        },
        {
            merge:true
        })
    }
    catch(error){
        console.log("Error",error)
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

export const getImages = async (id) => {
    const docRef = collection(db, "listingImages");
    const q = query(docRef, where("listing_id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return Promise.all(querySnapshot.docs.map(async (doc) => { 
            const data = doc.data();
            const id = doc.id;
            return {
                ...data,
                id: id
            };
        }));
    }
    return null;
};

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

export const getListingHome=async(type)=>{
    const docRef = collection(db, "listing");
    const q = query(docRef, where("active", "==", true),where("type","==",type))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return Promise.all(querySnapshot.docs.map(async (doc) => { 
            const data = doc.data()
            const id = doc.id
            const images = await getImages(id)
            const imageUrls = images ? images.map(image => image.url) : [];
            return {
                ...data,
                id:id,
                images: imageUrls
            }
        }))}
    return null
}

export const searchListing = async (
    address,
    type,
    bedCount,
    bathCount,
    parkingCount,
    propertyType
  ) => {
    const docRef = collection(db, "listing");
    const queryConditions = [
      where("active", "==", true),
      where("type", "==", type),
      where("bedroom", ">=", bedCount),
      where("bathroom", ">=", bathCount),
      where("parking", ">=", parkingCount),
    ];
    if (propertyType !== null) {
      queryConditions.push(where("propertyType", "==", propertyType));
    }
  
    const q = query(docRef, ...queryConditions);
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      return null;
    }
  
    const results = await Promise.all(
      querySnapshot.docs
        .filter((doc) =>
          doc.data().address.toLowerCase().includes(address.toLowerCase())
        )
        .map(async (doc) => {
          const data = doc.data();
          const id = doc.id;
          const images = await getImages(id);
          const imageUrls = images ? images.map(image => image.url) : [];
  
          return {
            ...data,
            id,
            images: imageUrls,
          };
        })
    );
  
    return results.filter((result) => result !== undefined);
  };

  export const getUserListings=async(email)=>{
    const docRef = collection(db, "listing");
    const q = query(docRef, where("createdBy", "==", email))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return Promise.all(querySnapshot.docs.map(async (doc) => { 
            const data = doc.data()
            const id = doc.id
            const images = await getImages(id)
            const imageUrls = images ? images.map(image => image.url) : [];
            return {
                ...data,
                id:id,
                images: imageUrls
            }
        }))}
    return null
  }
export const deleteImagesFirebase=async(id)=>{
    try{
       const imgs=await getImages(id)
       await Promise.all(imgs.map((item) => {
        return deleteDoc(doc(db, 'listingImages', item.id));
    }));
    }
    catch(error){
        console.log(error)
    }
}

export const deleteListing=async(id)=>{
    try{
        await deleteDoc(doc(db,'listing', id));
     }
     catch(error){
         console.log(error)
     }
}