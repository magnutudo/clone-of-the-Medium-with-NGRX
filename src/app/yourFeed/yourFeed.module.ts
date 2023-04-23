import {NgModule} from "@angular/core";

import {YourFeedComponent} from "./components/yourFeed/yourFeed.component";
import {CommonModule} from "@angular/common";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";
import {RouterModule} from "@angular/router";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {BannerModule} from "../shared/modules/banner/banner.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";

const routes = [
  {
    path: "feed",
    component: YourFeedComponent
  }
]

@NgModule({
  imports: [CommonModule, FeedTogglerModule, RouterModule.forChild(routes), FeedModule, BannerModule, PopularTagsModule],
  declarations: [YourFeedComponent]
})
export class YourFeedModule {

}
