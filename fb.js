/* ربط Firebase: Firestore للبيانات و Authentication لدخول الأدمن */
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPk1dOVSvJGvjB-rvfa0q0M5MY5K0_uZM",
  authDomain: "codecraft-688eb.firebaseapp.com",
  projectId: "codecraft-688eb",
  storageBucket: "codecraft-688eb.firebasestorage.app",
  messagingSenderId: "353434261110",
  appId: "1:353434261110:web:e0958789a2d37171aef157"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// إعدادات الموقع والباقات (قراءة للجميع، كتابة للأدمن فقط)
export const getSite = async () => { const s = await getDoc(doc(db, 'config', 'site')); return s.exists() ? s.data() : null; };
export const getPackages = async () => { const s = await getDoc(doc(db, 'config', 'packages')); return s.exists() ? s.data().list : null; };
export const setSite = o => setDoc(doc(db, 'config', 'site'), o);
export const setPackages = list => setDoc(doc(db, 'config', 'packages'), { list });

// الطلبات (العميل يضيف بس، والأدمن يقرأ ويعدّل ويمسح)
export const addOrder = o => setDoc(doc(db, 'orders', o.id), o);
export const getOrders = async () => {
  const q = await getDocs(query(collection(db, 'orders'), orderBy('d', 'desc')));
  return q.docs.map(d => d.data());
};
export const patchOrder = (id, patch) => updateDoc(doc(db, 'orders', id), patch);
export const removeOrder = id => deleteDoc(doc(db, 'orders', id));

// تسجيل دخول الأدمن
export const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);
export const onUser = cb => onAuthStateChanged(auth, cb);
