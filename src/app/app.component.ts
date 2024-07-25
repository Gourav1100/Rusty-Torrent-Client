import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "./services/translate.service";
import ThemeService from "./services/theme.service";
import { APP_ROOT_PREFIX } from "./config/const.config";
import { AppFeature } from "./app.feature";
import { SettingsComponent } from "./components/settings/settings.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [AppFeature, SettingsComponent, SearchBarComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {

	constructor(private _translate: TranslateService, public _theme: ThemeService) {}

	ngOnInit(): void {
		this._theme.enableLiveThemeUpdate();
	}
	ngOnDestroy(): void {
		this._theme.disableLiveThemeUpdate();
	}

	getTranslation(text: string) {
		return this._translate.translate(APP_ROOT_PREFIX + text.toUpperCase());
	}
}
