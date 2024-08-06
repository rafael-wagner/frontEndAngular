import { Routes, RouterOutlet } from '@angular/router';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { NavRegistrationComponent } from './components/nav-menu/nav-registration/nav-registration.component';

export const routes: Routes = [

    {
        path:""
        ,component:LoginCardComponent
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
