import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'ngx-flash-messages';
import {UiSwitchComponent, UiSwitchModule} from 'ngx-toggle-switch';
import { ClipboardModule } from 'ngx-clipboard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// components
import {AppComponent} from './app.component';
import {CustomerRegistrationComponent} from './components/common-components/customer-registration/customer-registration.component';
import {ConsultantRegistrationComponent} from './components/common-components/consultant-registration/consultant-registration.component';
import {CompanyRegistrationComponent} from './components/common-components/company-registration/company-registration.component';
import {LoginComponent} from './components/common-components/login/login.component';
import {ChatComponent} from './components/chat-components/chat/chat.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {CatalogComponent} from './components/product-components/catalog/catalog.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CreationComponent} from './components/product-components/creation/creation.component';
import {ProductViewComponent} from './components/product-components/product-view/product-view.component';
import {SelectorComponent} from './components/chat-components/selector/selector.component';
import {OrderComponent} from './components/product-components/order/order.component';

// services
import {AuthService} from './services/auth.service';
import {ProfileService} from './services/profile.service';
import {ProductService} from './services/product.service';

// outlets
import {OrderModalComponent} from './components/modals/OrderModal';
import {ChatRateModalComponent} from './components/modals/ChatRateModal';

// guards
import {PageAccessGuard} from './guards/page-access.guard';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customerRegistration', component: CustomerRegistrationComponent},
  {path: 'companyRegistration', component: CompanyRegistrationComponent},
  {path: 'consultantRegistration', component: ConsultantRegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [PageAccessGuard]},
  {path: 'chat/:id', component: ChatComponent, canActivate: [PageAccessGuard]},
  {path: 'catalog', component: CatalogComponent},
  {path: 'creation', component: CreationComponent},
  {path: 'product-view/:id', component: ProductViewComponent},
  {path: 'selector', component: SelectorComponent},
  {path: 'order/:id', component: OrderComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    CompanyRegistrationComponent,
    ConsultantRegistrationComponent,
    LoginComponent,
    ChatComponent,
    NavbarComponent,
    HomeComponent,
    CatalogComponent,
    ProfileComponent,
    CreationComponent,
    ProductViewComponent,
    SelectorComponent,
    OrderComponent,
    OrderModalComponent,
    ChatRateModalComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule,
    ClipboardModule,
    UiSwitchModule
  ],
  providers: [PageAccessGuard, AuthService, ProfileService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
