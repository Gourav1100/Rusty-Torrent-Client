import { Component, Input } from "@angular/core";
import { AppFeature } from "../../app.feature";
import { Theme } from "../../config/theme.config";
import { TranslateService } from "../../services/translate.service";
import { SEARCHBAR_PREFIX } from "../../config/const.config";

@Component({
	selector: "app-search-bar",
	standalone: true,
	imports: [AppFeature],
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"],
})
export class SearchBarComponent {
	@Input() theme: Theme | null = null;
	searchValue: string = "";

	constructor(private _translate: TranslateService) {}

	getTranslation(text: string) {
		return this._translate.translate(SEARCHBAR_PREFIX + text.toUpperCase());
	}
}
