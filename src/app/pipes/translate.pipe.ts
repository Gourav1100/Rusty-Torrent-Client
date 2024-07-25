// src/app/pipes/translate.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../services/translate.service";

@Pipe({
	name: "translate",
	pure: false,
})
export class TranslatePipe implements PipeTransform {
	constructor(private _translateService: TranslateService) {}

	transform(value: string): string {
		return this._translateService.translate(value);
	}
}
