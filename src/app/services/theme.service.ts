import { Injectable } from "@angular/core";
import { MODES } from "../config/const.config";
import { getTheme, Theme } from "../config/theme.config";
import StorageService from "./storage.service";

@Injectable({
	providedIn: "root",
})
export default class ThemeService {
	private _mode: "light_mode" | "dark_mode" | "brightness_auto" = "brightness_auto";
	private _mode_index: number = 0;
	private _current_theme: Theme | null = null;

	private _live_theme_update_timeout: any;
	constructor(private _storage: StorageService) {
		this._mode = this._storage.mode;
		this._mode_index = MODES.indexOf(this._mode);
		this.setTheme();
	}

	private setTheme() {
		const time = new Date().getHours();
		if (this.mode == "brightness_auto") {
			this._current_theme = getTheme(time < 19 && time >= 7 ? "light_mode" : "dark_mode");
		} else {
			this._current_theme = getTheme(this.mode);
		}
	}

	nextTheme() {
		this._mode_index = (this._mode_index + 1) % MODES.length;
		this.mode = MODES[this._mode_index] as typeof this.mode;
		this._storage.mode = this.mode;
	}

	get mode(): typeof this._mode {
		return this._mode;
	}
	set mode(vale: typeof this._mode) {
		this._mode = vale;
		this.setTheme();
	}

	get theme(): Theme | null {
		return this._current_theme;
	}

	enableLiveThemeUpdate() {
		const time = 60 - new Date().getSeconds();
		const hour = new Date().getHours();
		let last_mode = hour < 19 && hour >= 7 ? "light_mode" : "dark_mode";
		const TIMEOUT_FUNCTION = () => {
			const hour = new Date().getHours();
			const time = 60 - new Date().getSeconds();
			const new_mode = hour < 19 && hour >= 7 ? "light_mode" : "dark_mode";
			if (last_mode != new_mode && this.mode == "brightness_auto") {
				last_mode = new_mode;
				this.setTheme();
			}
			this._live_theme_update_timeout = setTimeout(TIMEOUT_FUNCTION, time * 1000);
		};
		this._live_theme_update_timeout = setTimeout(TIMEOUT_FUNCTION, time * 1000);
	}

	disableLiveThemeUpdate() {
		clearTimeout(this._live_theme_update_timeout);
	}
}
