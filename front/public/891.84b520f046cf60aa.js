"use strict";(self.webpackChunksantex_academy=self.webpackChunksantex_academy||[]).push([[891],{3891:(rr,F,a)=>{a.r(F),a.d(F,{LoginModule:()=>$});var d=a(6895),n=a(4006),g=a(4144),Z=a(7392),i=a(4859),N=a(9814),f=a(3683),m=a(3546),U=a(8255),I=a(7155),P=a(4850),y=a(455),A=a(4385),L=a(3238),q=a(1572),u=a(9299),T=a(727),c=a(5381),w=a(529),r=a(4650),_=a(7990),C=a(6791),p=a(9549);let v=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(s){return new(s||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-header"]],decls:6,vars:0,consts:[["color","primary",1,"custom-toolbar"],[1,"toolbar-row"],[1,"logo"],["src","../../../../assets/img/incubadoranoccirculo.png","alt","Logo"],[1,"company-name"]],template:function(s,e){1&s&&(r.TgZ(0,"mat-toolbar",0)(1,"mat-toolbar-row",1)(2,"div",2),r._UZ(3,"img",3),r.qZA(),r.TgZ(4,"div",4),r._uU(5,"Incubadora del N.O.C"),r.qZA()()())},dependencies:[f.Ye,f.rD],styles:[".logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:80px}.logo[_ngcontent-%COMP%]{display:flex}.company-name[_ngcontent-%COMP%]{font-size:24px;font-weight:700;margin-left:16px}.custom-toolbar[_ngcontent-%COMP%]{height:90px;display:flex;justify-content:center;align-items:center}.toolbar-row[_ngcontent-%COMP%]{display:flex;align-items:center}@media (max-width: 400px){.company-name[_ngcontent-%COMP%]{font-size:18px}}@media (min-width: 401px) and (max-width: 768px){.company-name[_ngcontent-%COMP%]{font-size:20px}}@media (min-width: 769px) and (max-width: 1024px){.company-name[_ngcontent-%COMP%]{font-size:22px}}@media (min-width: 1025px) and (max-width: 1920px){.company-name[_ngcontent-%COMP%]{font-size:24px}}"]}),o})();function b(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El email es requerido. "),r.qZA())}function S(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xe1xima de caracteres es 255. "),r.qZA())}function J(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xednima de caracteres es 5. "),r.qZA())}function Y(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," Revis\xe1 tu Usuario. "),r.qZA())}function R(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La contrase\xf1a es requerida. "),r.qZA())}function x(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xe1xima de caracteres es 60. "),r.qZA())}function O(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xednima de caracteres es 5. "),r.qZA())}let Q=(()=>{class o{constructor(s,e,l,h){this.formBuilder=s,this.router=e,this.authService=l,this.toastService=h,this.loginForm=this.formBuilder.group({commodity:[null]}),this.formSubscritions=new T.w0}ngOnInit(){this.crearLoginForm()}crearLoginForm(){this.loginForm=this.formBuilder.group({username:new n.p4(null,n.kI.compose([n.kI.required,n.kI.email,n.kI.maxLength(c.Au)])),password:new n.p4(null,n.kI.compose([n.kI.required,n.kI.maxLength(c.Ef)]))})}login(){const s=this.loginForm?.value;this.formSubscritions.add(this.authService.login(s.username,s.password).subscribe(e=>{this.authService.setUser(e),this.router.navigateByUrl("/dashboard")},e=>{const{message:l}=e.error;e instanceof w.UA&&(navigator.onLine?this.toastService.presentToast(401===e.status?l:"Error en la conexi\xf3n."):this.toastService.presentToast("No hay conexi\xf3n a Internet."))}))}checkForm(){this.loginForm.valid&&this.login()}ngOnDestroy(){this.formSubscritions.unsubscribe()}}return o.\u0275fac=function(s){return new(s||o)(r.Y36(n.QS),r.Y36(u.F0),r.Y36(_.e),r.Y36(C.k))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-login-page"]],decls:21,vars:8,consts:[[3,"formGroup","ngSubmit"],[1,"full-width-input"],["matInput","","placeholder","Email","formControlName","username","required",""],[4,"ngIf"],["matInput","","type","password","placeholder","Password","formControlName","password","required",""],["mat-raised-button","","routerLink","/auth/register"],["mat-raised-button","","color","primary",3,"click"]],template:function(s,e){1&s&&(r._UZ(0,"app-header"),r.TgZ(1,"mat-card")(2,"mat-card-content")(3,"form",0),r.NdJ("ngSubmit",function(){return e.loginForm.valid&&e.login()}),r.TgZ(4,"h2"),r._uU(5,"Log In"),r.qZA(),r.TgZ(6,"mat-form-field",1),r._UZ(7,"input",2),r.YNc(8,b,2,0,"mat-error",3),r.YNc(9,S,2,0,"mat-error",3),r.YNc(10,J,2,0,"mat-error",3),r.YNc(11,Y,2,0,"mat-error",3),r.qZA(),r.TgZ(12,"mat-form-field",1),r._UZ(13,"input",4),r.YNc(14,R,2,0,"mat-error",3),r.YNc(15,x,2,0,"mat-error",3),r.YNc(16,O,2,0,"mat-error",3),r.qZA(),r.TgZ(17,"a",5),r._uU(18,"Registrar"),r.qZA(),r.TgZ(19,"button",6),r.NdJ("click",function(){return e.checkForm()}),r._uU(20,"Login"),r.qZA()()()()),2&s&&(r.xp6(3),r.Q6J("formGroup",e.loginForm),r.xp6(5),r.Q6J("ngIf",null==e.loginForm.controls.username||null==e.loginForm.controls.username.errors?null:e.loginForm.controls.username.errors.required),r.xp6(1),r.Q6J("ngIf",null==e.loginForm.controls.username||null==e.loginForm.controls.username.errors?null:e.loginForm.controls.username.errors.maxlength),r.xp6(1),r.Q6J("ngIf",null==e.loginForm.controls.username||null==e.loginForm.controls.username.errors?null:e.loginForm.controls.username.errors.minlength),r.xp6(1),r.Q6J("ngIf",null==e.loginForm.controls.username||null==e.loginForm.controls.username.errors?null:e.loginForm.controls.username.errors.backendErr),r.xp6(3),r.Q6J("ngIf",null==e.loginForm.controls.password||null==e.loginForm.controls.password.errors?null:e.loginForm.controls.password.errors.required),r.xp6(1),r.Q6J("ngIf",null==e.loginForm.controls.password||null==e.loginForm.controls.password.errors?null:e.loginForm.controls.password.errors.maxlength),r.xp6(1),r.Q6J("ngIf",null==e.loginForm.controls.password||null==e.loginForm.controls.password.errors?null:e.loginForm.controls.password.errors.minlength))},dependencies:[d.O5,u.yS,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u,p.TO,p.KE,g.Nt,i.lW,i.zs,m.a8,m.dn,v],styles:["mat-card[_ngcontent-%COMP%]{max-width:400px;margin:2em auto;text-align:center}mat-form-field[_ngcontent-%COMP%]{display:block}"]}),o})();var E=a(8208);function M(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El nombre es requerido. "),r.qZA())}function k(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El apellido es requerido. "),r.qZA())}function B(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El nombre de usuario es requerido. "),r.qZA())}function D(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xednima de caracteres es 5. "),r.qZA())}function z(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xe1xima de caracteres es 255. "),r.qZA())}function X(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El nombre de usuario es requerido. "),r.qZA())}function j(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xednima de caracteres es 5. "),r.qZA())}function G(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," La cantidad m\xe1xima de caracteres es 255. "),r.qZA())}function H(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El password es requerido. "),r.qZA())}function K(o,t){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," El password debe contener 5 carecteres como m\xednimo y al menos una letra minuscula, una letra mayuscula, un n\xfamero y un caracter especial. "),r.qZA())}const W=[{path:"login",component:Q},{path:"register",component:(()=>{class o{constructor(s,e,l,h){this.formBuilder=s,this.userService=e,this.toastService=l,this.router=h,this.registerForm=this.formBuilder.group({commodity:[null]}),this.formSubscritions=new T.w0}ngOnInit(){this.crearRegistroForm()}crearRegistroForm(){this.registerForm=this.formBuilder.group({firstName:new n.p4(null,n.kI.required),lastName:new n.p4(null,n.kI.required),userName:new n.p4(null,n.kI.compose([n.kI.required,n.kI.minLength(c.ZR),n.kI.maxLength(c.Au)])),email:new n.p4(null,n.kI.compose([n.kI.required,n.kI.email])),password:new n.p4(null,n.kI.compose([n.kI.required,n.kI.pattern(c.mS)]))})}register(){const s=this.registerForm?.value;this.formSubscritions.add(this.userService.createUser(s).subscribe(e=>{this.toastService.UserCreateok("Usuario Creado Correctamente"),this.router.navigateByUrl("/login")},e=>{this.toastService.presentToast("eroor al crear usuario")}))}checkForm(){this.registerForm.valid&&this.register()}ngOnDestroy(){this.formSubscritions.unsubscribe()}}return o.\u0275fac=function(s){return new(s||o)(r.Y36(n.QS),r.Y36(E.K),r.Y36(C.k),r.Y36(u.F0))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-register-page"]],decls:41,vars:12,consts:[[1,"my-card"],[3,"formGroup","ngSubmit"],[1,"full-width"],["matInput","","placeholder","Nombre","formControlName","firstName"],[4,"ngIf"],["matInput","","placeholder","Apellido","formControlName","lastName"],["matInput","","placeholder","Usuario","formControlName","userName"],["matInput","","placeholder","email","formControlName","email"],["matInput","","placeholder","Password","type","password","formControlName","password"],["mat-raised-button","","routerLink","/auth/login"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(s,e){1&s&&(r._UZ(0,"app-header"),r.TgZ(1,"mat-card",0)(2,"mat-card-content")(3,"form",1),r.NdJ("ngSubmit",function(){return e.registerForm.valid&&e.register()}),r.TgZ(4,"h2"),r._uU(5,"Registrar"),r.qZA(),r.TgZ(6,"mat-form-field",2)(7,"mat-label"),r._uU(8,"Nombre"),r.qZA(),r._UZ(9,"input",3),r.YNc(10,M,2,0,"mat-error",4),r.qZA(),r.TgZ(11,"mat-form-field",2)(12,"mat-label"),r._uU(13,"Apellido"),r.qZA(),r._UZ(14,"input",5),r.YNc(15,k,2,0,"mat-error",4),r.qZA(),r.TgZ(16,"mat-form-field",2)(17,"mat-label"),r._uU(18,"Usuario"),r.qZA(),r._UZ(19,"input",6),r.YNc(20,B,2,0,"mat-error",4),r.YNc(21,D,2,0,"mat-error",4),r.YNc(22,z,2,0,"mat-error",4),r.qZA(),r.TgZ(23,"mat-form-field",2)(24,"mat-label"),r._uU(25,"email"),r.qZA(),r._UZ(26,"input",7),r.YNc(27,X,2,0,"mat-error",4),r.YNc(28,j,2,0,"mat-error",4),r.YNc(29,G,2,0,"mat-error",4),r.qZA(),r.TgZ(30,"mat-form-field",2)(31,"mat-label"),r._uU(32,"Password"),r.qZA(),r._UZ(33,"input",8),r.YNc(34,H,2,0,"mat-error",4),r.YNc(35,K,2,0,"mat-error",4),r.qZA(),r.TgZ(36,"mat-card-actions")(37,"a",9),r._uU(38,"Cancel"),r.qZA(),r.TgZ(39,"button",10),r._uU(40,"Registrar"),r.qZA()()()()()),2&s&&(r.xp6(3),r.Q6J("formGroup",e.registerForm),r.xp6(7),r.Q6J("ngIf",null==e.registerForm.controls.firstName||null==e.registerForm.controls.firstName.errors?null:e.registerForm.controls.firstName.errors.required),r.xp6(5),r.Q6J("ngIf",null==e.registerForm.controls.lastName||null==e.registerForm.controls.lastName.errors?null:e.registerForm.controls.lastName.errors.required),r.xp6(5),r.Q6J("ngIf",null==e.registerForm.controls.userName||null==e.registerForm.controls.userName.errors?null:e.registerForm.controls.userName.errors.required),r.xp6(1),r.Q6J("ngIf",null==e.registerForm.controls.userName||null==e.registerForm.controls.userName.errors?null:e.registerForm.controls.userName.errors.minlength),r.xp6(1),r.Q6J("ngIf",null==e.registerForm.controls.userName||null==e.registerForm.controls.userName.errors?null:e.registerForm.controls.userName.errors.maxlength),r.xp6(5),r.Q6J("ngIf",null==e.registerForm.controls.email||null==e.registerForm.controls.email.errors?null:e.registerForm.controls.email.errors.required),r.xp6(1),r.Q6J("ngIf",null==e.registerForm.controls.email||null==e.registerForm.controls.email.errors?null:e.registerForm.controls.email.errors.minlength),r.xp6(1),r.Q6J("ngIf",null==e.registerForm.controls.email||null==e.registerForm.controls.email.errors?null:e.registerForm.controls.email.errors.maxlength),r.xp6(5),r.Q6J("ngIf",null==e.registerForm.controls.password||null==e.registerForm.controls.password.errors?null:e.registerForm.controls.password.errors.required),r.xp6(1),r.Q6J("ngIf",null==e.registerForm.controls.password||null==e.registerForm.controls.password.errors?null:e.registerForm.controls.password.errors.pattern),r.xp6(4),r.Q6J("disabled",e.registerForm.invalid))},dependencies:[d.O5,u.yS,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,p.TO,p.KE,p.hX,g.Nt,i.lW,i.zs,m.a8,m.dn,m.hq,v],styles:["mat-card[_ngcontent-%COMP%]{max-width:400px;margin:2em auto;text-align:center}mat-form-field[_ngcontent-%COMP%]{display:block}"]}),o})()}];let V=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[u.Bz.forChild(W),u.Bz]}),o})(),$=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[d.ez,V,n.UX,g.c,i.ot,n.UX,g.c,Z.Ps,N.o9,n.UX,f.g0,g.c,m.QW,U.Tx,Z.Ps,i.ot,I.p0,P.t,y.rP,A.LD,L.Ng,q.Cq]}),o})()}}]);