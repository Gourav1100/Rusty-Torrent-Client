// src/app/services/translation.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import StorageService from "./storage.service";

@Injectable({
	providedIn: "root",
})
export class TranslateService {
	private translations: any = {};
	private currentLang: string = "en";
	private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private _storage: StorageService) {
		this.currentLang = this._storage.language;
		this.loadTranslations(this.currentLang);
	}

	loadTranslations(lang: string) {
		this.loading.next(true);
		this.http.get(`/assets/i18n/${lang}.json`).subscribe((translations) => {
			this.translations = translations;
			this.currentLang = lang;
			this._storage.language = lang as any;
			this.loading.next(false);
		});
	}

	translate(key: string): string {
		if (this.loading.value) {
			return key;
		}
		let result = this.translations;
		key.split(".").forEach((part) => {
			result = result ? result[part] : undefined;
		});
		return result || key;
	}

	setLanguage(lang: string) {
		this.loadTranslations(lang);
	}

	getCurrentLang(): string {
		return this.currentLang;
	}
}
