import {
  Component,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Header } from './app/components/header/header';
import { Footer } from './app/components/footer/footer';
import { CharacterList } from './app/components/character-list/character-list';
import { RouterOutlet, Routes, provideRouter } from '@angular/router';
import { CharacterDetail } from './app/components/character-detail/character-detail';
import { EpisodeList } from './app/components/episode-list/episode-list';
import { EpisodeDetail } from './app/components/episode-detail/episode-detail';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    CharacterList,
    EpisodeList,
    EpisodeDetail,
  ],
  templateUrl: './main.html',
})
export class App {
  name = 'Angular';
}
export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'character/:id', component: CharacterDetail },
  { path: 'episodes', component: EpisodeList },
  { path: 'episode/:id', component: EpisodeDetail },
  { path: '**', redirectTo: 'characters' },
];
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
bootstrapApplication(App, appConfig);
