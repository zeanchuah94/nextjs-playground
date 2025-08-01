import { db } from "../firebase/config";
import { collection, DocumentData, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";


export async function getDocumentList(collectionName: string) {
    try {
        const docRef = collection(db, collectionName);
        const docSnap = await getDocs(docRef);

        if(docSnap.empty)
        {
            console.log("コレクションが見つかりません");
            return null;
        }
        
        return docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("ドキュメントリストの取得に失敗しました:", error);
        return null;
    }
}

// 単一のドキュメントを取得
export async function getDocumentById(collectionName: string, docId: string) {
  try
  {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log("ドキュメントが見つかりません");
      return null;
    }
  }
  catch (error)
  {
    console.error("ドキュメントの取得に失敗しました:", error);
    return null;
  }
}

// ドキュメントの追加
export async function addDocument(collectionName: string, data: DocumentData) {
  try
  {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  }
  catch (error)
  {
    console.error("ドキュメントの追加に失敗しました:", error);
    throw error;
  }
}

// ドキュメントの更新
export async function updateDocument(collectionName: string, docId: string, data: DocumentData) {
  try
  {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return true;
  }
  catch (error)
  {
    console.error("ドキュメントの更新に失敗しました:", error);
    throw error;
  }
}

// ドキュメントの削除
export async function deleteDocument(collectionName: string, docId: string) {
  try
  {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  }
  catch (error)
  {
    console.error("ドキュメントの削除に失敗しました:", error);
    throw error;
  }
}
