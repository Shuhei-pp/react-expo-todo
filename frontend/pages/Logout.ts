import { firebaseAuth } from "../utils/firebase";

export const Logout = () => {
  firebaseAuth.signOut().then(()=>{
    console.log("ログアウトしました");
  })
  return
}
