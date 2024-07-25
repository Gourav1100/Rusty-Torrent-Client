import { Component, Input, OnInit } from "@angular/core";
import { Theme } from "../../config/theme.config";
import { AppFeature } from "../../app.feature";
import { TranslateService } from "../../services/translate.service";
import { SETTINGS_PREFIX } from "../../config/const.config";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	standalone: true,
	imports: [AppFeature],
	styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
	@Input() theme: Theme | null = null;
	constructor(private _translate: TranslateService) {}

	getTranslation(text: string) {
		return this._translate.translate(SETTINGS_PREFIX + text.toUpperCase());
	}
}
