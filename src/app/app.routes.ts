import { Routes, RouterOutlet } from '@angular/router';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NavRegistrationComponent } from './components/nav-menu/nav-registration/nav-registration.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [

    {
        path:""
        ,component:LoginCardComponent
        ,pathMatch: 'full'
    },
    {
        path:"new-user"
        ,component:NewUserFormComponent
        ,pathMatch: 'full'
    }
    ,{
        path:"home"
        ,component:NavMenuComponent
        ,children:[
            {
                path:'register'
                ,component:NavRegistrationComponent
            }
            ,{
                path:"list"
                ,component:UserListComponent
                ,pathMatch: 'full'
            }
        ]
    }

];
