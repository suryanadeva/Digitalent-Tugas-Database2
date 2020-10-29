import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Account = {
  account_number: number;
  balance: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string;
};

export type LA = {
  nomor_anterian:number;
  Jenis_layanan : string;
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-be-21.firebaseio.com',
});

const db = admin.firestore();
const accountRef = db.collection('accounts');
const Layanan_AnterianRef = db.collection('Layanan_Anterian');

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private accountRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private Layanan_AnterianRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  
  constructor() {
    this.db = db;
    this.accountRef = accountRef;
    this.Layanan_AnterianRef = Layanan_AnterianRef;
  }

  async addData(account: Account) {;
    try {
      await accountRef.add(account);
    } catch (error) {
      throw error
    }

    return;
  }

  //add La
  async addDataLa(LA: LA) {;
    try {
     // console.log("okk");
      const snapshot = await this.Layanan_AnterianRef.get();
     // LA.nomor_anterian = FieldValue.increment(1)
   // let total = 0;
    //  snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data().nomor_anterian);
     //    total += doc.data().count;
         
    // });
       // console.log(Layanan_AnterianRef.firestore.FieldValue.increment(1));
   //  console.log(doc.data());
      await Layanan_AnterianRef.add(LA);
    } catch (error) {
      throw error
    }

    return;
  }
//get layanan anterian
  async getDataLA() {
    let snapshot;
    try {
      snapshot = await this.Layanan_AnterianRef.get();
    } catch (error) {
      throw error;
    }

    console.log(snapshot);
    return snapshot.docs.map(doc => doc.data());
  }

  async getData() {
    let snapshot;
    try {
      snapshot = await this.accountRef.get();
    } catch (error) {
      throw error;
    }

    console.log(snapshot);
    return snapshot.docs.map(doc => doc.data());
  }

  async getDataById(id: string) {
    let snapshot;
    try {
      snapshot = await accountRef.doc(id).get();
    } catch(error) {
      throw error;
    }

    return snapshot.data();
  }

  //get by id LA
  async getDataByIdLa(id: string) {
    let snapshot;
    try {
      snapshot = await Layanan_AnterianRef.doc(id).get();
    } catch(error) {
      throw error;
    }

    return snapshot.data();
  }



  async updateData(id: string, update: Object) {
    let snapshot;
    try {
      await accountRef.doc(id).update({
        ...update
      });
      snapshot = await accountRef.doc(id).get();
    } catch (error) {
      throw error;
    }

    return snapshot.data();
  }

  //update data LA
  async updateDataLa(id: string, update: Object) {
    let snapshot;
    try {
      await Layanan_AnterianRef.doc(id).update({
        ...update
      });
      snapshot = await Layanan_AnterianRef.doc(id).get();
    } catch (error) {
      throw error;
    }

    return snapshot.data();
  }


  async deleteData(id: string) {
    try {
      await accountRef.doc(id).delete();
    } catch(error) {
      throw error;
    }

    return;
  }

  //delete LA
  async deleteDataLa(id: string) {
    try {
      await Layanan_AnterianRef.doc(id).delete();
    } catch(error) {
      throw error;
    }

    return;
  }

  async getDataByState(state: string) {
    let snapshot;
    try {
      snapshot = await accountRef.where('state', '==', state).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }

  async getDataByJL(jl: string) {
    let snapshot;
    try {
      snapshot = await Layanan_AnterianRef.where('jenis_layanan', '==', jl).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }

  async getDataByAge(age: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('age', '>=', age).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }

  //get by nomer anteri
  async getDataByna(na: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('nomor_anterian', '>=', na).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }
}