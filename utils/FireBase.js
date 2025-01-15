import { addDoc, collection, GeoPoint, serverTimestamp } from "firebase/firestore"; 
import { db } from "./FireBaseConfig";

export const addListing = async (address, coordinates, createdBy) => {
    try {
        const listingCollectionRef = collection(db, "listing");
        const geoPoint = new GeoPoint(
            coordinates.lat,
            coordinates.lng
        );
        console.log(geoPoint);
        
        const docRef = await addDoc(listingCollectionRef, {
            active: false,
            address,
            coordinates: geoPoint,
            createdBy,
            createdAt: serverTimestamp()
        });
        
        console.log('listing added successfully');
        return docRef.id;
    } catch (error) {
        console.log("Error in adding Listing:", error);
        throw error;
    }
};