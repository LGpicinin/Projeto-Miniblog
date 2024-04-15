import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB85mB_OXAOC_Vz79q1dEI1P2coQtzLIXI",
  authDomain: "miniblog-8a731.firebaseapp.com",
  projectId: "miniblog-8a731",
  storageBucket: "miniblog-8a731.appspot.com",
  messagingSenderId: "550615139267",
  appId: "1:550615139267:web:e18d6b1e3d13eedadab376"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};