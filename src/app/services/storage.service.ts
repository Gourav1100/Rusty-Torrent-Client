import { STORAGE_KEY } from "../config/const.config";

export default class StorageService {
	private _mode: "light_mode" | "dark_mode" | "brightness_auto";
	private _language: "en" | "es";
	private _storage: {
		mode: "light_mode" | "dark_mode" | "brightness_auto";
		language: "en" | "es";
	};

	constructor() {
		const new_storage_object: typeof this._storage = {
			mode: "brightness_auto",
			language: "en",
		};
		const storage_data = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(new_storage_object));
		let is_storage_valid = true;
		Object.keys(storage_data).forEach((key) => {
			is_storage_valid = is_storage_valid && key in new_storage_object;
		});
		this._storage = (is_storage_valid ? storage_data : new_storage_object) as typeof this._storage;
		this._mode = this._storage.mode;
		this._language = this._storage.language;
	}

	setStorage() {
		Object.keys(this._storage).forEach((key) => {
			(this._storage as any)[key] = (this as any)[key];
		});

		localStorage.setItem(STORAGE_KEY, JSON.stringify(this._storage));
	}
	// getter and setter for mode
	get mode(): typeof this._mode {
		return this._mode;
	}
	set mode(value: typeof this._mode) {
		this._mode = value;
		this.setStorage();
	}

	// getter and setter for language
	get language(): typeof this._language {
		return this._language;
	}
	set language(value: typeof this._language) {
		this._language = value;
		this.setStorage();
	}
}
