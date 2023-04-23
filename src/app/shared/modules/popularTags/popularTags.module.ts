import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PopularTagsService} from "./services/popularTags.service";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {GetPopularTagsEffect} from "./store/effects/getPopularTags.effect";
import {PopularTagsComponent} from "./components/popularTags/popularTags.component";
import {RouterLink} from "@angular/router";
import {ErrorMessageModule} from "../errorMessage/errorMessage.module";
import {LoadingModule} from "../loading/loading.module";

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('popularTags', reducers), EffectsModule.forFeature([GetPopularTagsEffect]), RouterLink, ErrorMessageModule, LoadingModule],
  providers: [PopularTagsService],
  declarations:[PopularTagsComponent],
  exports:[PopularTagsComponent]
})
export class PopularTagsModule {

}
