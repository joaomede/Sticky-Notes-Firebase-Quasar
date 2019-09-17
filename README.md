# Personal Sticky Notes

##### EN
	Personal Sticky Notes for statement of Firestore and Vuejs technologies
##### PT-BR
	Bloco de anotações pessoal para demonstrativo das tecnologias Firestore e Vuejs
- [x] Firebase / Firestore
- [x] Login
- [x] Register / with a database profile
- [x] Forgot Password
- [x] Change Password
- [x] Quasar / Vue
- [x] CRUD
- [x] Realtime Firestore Methods (Socket's)
- [x] A Simple Sticky Notes
- [x] Permission "Admin and Normal" on Profiles

### How to Settings Firebase
##### In the path "src / boot / firebase.js" you will find the following information;

##### No caminho "src/boot/firebase.js", você vai encontrar as seguintes informações;
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

#### OBS:
##### PT-BR
Existe dois tipos de usuários, o Admin e o Normal, o usuário admin consegue editar a versão do app nas nuvens, com isso, o app compara com a versão no próprio App, e se for diferente, ele apagar o cache, até que as duas versões se equiparem, essa foi uma solução encontrada para que o app sempre se atualize automaticamente nos dispositivos dos usuários, sem que eles fiquem navegando em versão antigas.
##### EN
There are two types of users, Admin and Normal, the admin user can edit the app version in the clouds, so the app compares with the app version itself, and if different, he clears the cache until If two versions match, this was a solution found so that the app always updates automatically on users' devices, without them navigating on older versions.

##### Versão do projeto - Version of Projects
##### PT-BR
A versão do app fica no caminho "src/mixins/mixinsVersionCheck.js", é necessário mudá-la, primeiro no firebase através do menu lateral, para só depois mudar no arquivo, fazer a build e posteriormente o deploy.
##### EN
The app version is in the path "src / mixins / mixinsVersionCheck.js", you need to change it, first in firebase through the side menu, then only change in the file, build and later deploy.

#### O Modelo - The Model
```
{
  "app": [
    {
      "uid": "userUid",
      "textColor": "#00ff33",
      "backgroundColor": "#55ff66",
      
      "stickyNotes": [
        {
          "idStickyNotes": "idStickyNotes",
          "content": "content here",
          "createdAt": "timestamp here"
        }
      ]
    }
  ],
  "version": {
    "version": "v1.0.0"
  },
  "users": [
    {
      "uid": "userUid",
      "name": "user name",
      "email": "email@exemple.com",
      "permission": "normal | admin"
    }
  ]
}
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
