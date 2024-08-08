import { Routes, RouterOutlet } from '@angular/router';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UserFormComponent } from './components/nav-menu/update-forms/user-form/user-form.component';
import { PersonFormComponent } from './components/nav-menu/update-forms/person-form/person-form.component';
import { AddressFormComponent } from './components/nav-menu/update-forms/address-form/address-form.component';
import { NavRegistrationComponent } from './components/nav-menu/nav-registration/nav-registration.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

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
                ,children:[
                    {
                        path:"user-data"
                        ,component:UserFormComponent
                    }
                    ,{
                        path:"address-data"
                        ,component:AddressFormComponent
                    }
                    ,{
                        path:"person-data"
                        ,component:PersonFormComponent                
                    }
                ]
            }
        ]
    }

];
