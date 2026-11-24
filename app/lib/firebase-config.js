// Connexion avec Google ou Facebook (page /connexion/), par Firebase
// Authentication : le site est statique, Firebase gere les comptes.
//
// A REMPLIR une fois le projet Firebase cree (console.firebase.google.com) :
//   1. Projet > Parametres > Vos applications > Web : copier ici l'objet
//      firebaseConfig (ces valeurs sont publiques par conception) ;
//   2. Authentication > Methode de connexion : activer Google, et Facebook
//      (avec l'identifiant et le secret d'une application Meta for Developers,
//      dont l'URL de redirection est celle indiquee par Firebase) ;
//   3. Authentication > Parametres > Domaines autorises : ajouter
//      sergiohazary.github.io.
// Tant que apiKey est vide, les boutons s'affichent mais annoncent que la
// connexion arrive bientot.
export const FIREBASE = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  appId: '',
};

export const FIREBASE_ACTIF = Boolean(FIREBASE.apiKey);
