import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "./services/translate.service";
import ThemeService from "./services/theme.service";
import { APP_ROOT_PREFIX } from "./config/const.config";
import { AppFeature } from "./app.feature";
import { SettingsComponent } from "./components/settings/settings.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { MatDialog } from "@angular/material/dialog";
import { TorrentDownloadDialogComponent } from "./components/torrent-download-dialog/torrent-download-dialog.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [AppFeature, SettingsComponent, SearchBarComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private _translate: TranslateService, public _theme: ThemeService, public _dialog: MatDialog) {}

	ngOnInit(): void {
		this._theme.enableLiveThemeUpdate();
	}
	ngOnDestroy(): void {
		this._theme.disableLiveThemeUpdate();
	}

	getTranslation(text: string) {
		return this._translate.translate(APP_ROOT_PREFIX + text.toUpperCase());
	}

	async addFile() {
		const path = await open({
			multiple: false,
			title: this.getTranslation("add_torrent_dialog"),
			filters: [{ name: "Torrent", extensions: ["torrent"] }],
		});
		if (path) {
			const metadata = await invoke("get_torrent_metadata", { torrentPath: path });
			this._dialog.open(TorrentDownloadDialogComponent, {
				width: "700px",
				panelClass: this._theme.theme?.dialog?.split(" "),
				data: {
					metadata,
					_theme: this._theme.theme,
				},
			});
		}
	}
}
