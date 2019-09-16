# Personal Sticky Notes

##### EN
	Personal Sticky Notes for statement of Firestore and Vuejs technologies
##### PT-BR
	Bloco de anotações pessoal para demonstrativo das tecnologias Firestore e Vuejs

1. Firebase / Firestore
2. Login
3. Register / with a database profile
4. Forgot Password
5. Change Password
6. Quasar / Vue
7. A Simple Sticky Notes

### How to Settings Firebase
In the path "src / boot / firebase.js" you will find the following information;
No caminho "src/boot/firebase.js", você vai encontrar as seguintes informações;
```
const Config = {
  apiKey: "apiKey",
  authDomain: "apiKey.firebaseapp.com",
  databaseURL: "https://apiKey.firebaseio.com",
  projectId: "apiKey",
  storageBucket: "apiKey.appspot.com",
  messagingSenderId: "apiKey",
  appId: "1:apiKey"
};
```
##### EN
Edit them according to your project created on firebase.com and good studies.

##### PT-BR
Edite-as de acordo com seu projeto criado no firebase.com e bons estudos

### How to Install / Como instalar
	yarn -i | npm install

### How to run / Como executar
	yarn quasar dev | or | quasar dev

### How to build / Como criar build
##### For build SPA / Para uma build de SPA

	yarn quasar build | or | quasar build

##### For PWA build / Para uma build PWA

	yarn quasar build -m pwa | or | quasar build -m pwa
