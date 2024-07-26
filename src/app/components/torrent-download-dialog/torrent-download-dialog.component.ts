import { Component, Inject } from "@angular/core";
import { AppFeature } from "../../app.feature";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Theme } from "../../config/theme.config";
import { TranslateService } from "../../services/translate.service";
import { TORRENT_DOWNLOAD_DIALOG_PREFIX } from "../../config/const.config";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

export interface Metadata {
	name: string;
	trackers: string[];
	files: string[];
	piece_len: number;
	pieces: number[];
	info_hash: string;
}

export interface FileTreeNode {
	name: String;
	children: FileTreeNode[];
	isSelected: boolean;
}

export interface TrackerTreeNode {
	url: string;
	children: TrackerTreeNode[];
	isSelected: boolean;
}

@Component({
	selector: "app-torrent-download-dialog",
	templateUrl: "./torrent-download-dialog.component.html",
	standalone: true,
	imports: [AppFeature],
	styleUrls: ["./torrent-download-dialog.component.scss"],
})
export class TorrentDownloadDialogComponent {
	_theme: Theme | null = null;
	torrent_title: string = "";
	torrent_hash: string = "";
	torrent_files: string[] = [];
	torrent_directory_tree: FileTreeNode[] = [];
	filesTreeControl = new NestedTreeControl<FileTreeNode>((node) => node.children);
	filesDataSource = new MatTreeNestedDataSource<FileTreeNode>();
	trackersTreeControl = new NestedTreeControl<TrackerTreeNode>((node) => node.children);
	trackersDataSource = new MatTreeNestedDataSource<TrackerTreeNode>();

	isLoading: boolean = true;

	constructor(
		private _translate: TranslateService,
		@Inject(MAT_DIALOG_DATA)
		private data: {
			metadata: Metadata;
			_theme: Theme;
		}
	) {
		this.isLoading = true;
		this._theme = this.data._theme;
		this.torrent_title = this.data.metadata.name;
		this.torrent_hash = this.data.metadata.info_hash;
		this.torrent_files = this.data.metadata.files;
		this.torrent_files.sort();
		this.torrent_directory_tree = [
			{
				name: this.torrent_title,
				children: [],
				isSelected: true,
			},
		];
		this.torrent_files.forEach((file) => {
			const path = file.split("/");
			const filename = path[path.length - 1];
			let current_node = this.torrent_directory_tree[0];
			path.pop();
			path.forEach((part) => {
				if (!current_node.children.some((node) => node.name === part)) {
					current_node.children.push({
						name: part,
						children: [],
						isSelected: true,
					});
				}
				current_node.children.sort(
					(a, b) => b.children.length - a.children.length || a.name.localeCompare(`${b.name}`)
				);
				current_node = current_node.children.find((node) => node.name === part)!;
			});
			current_node.children.push({
				name: filename,
				children: [],
				isSelected: true,
			});
			current_node.children.sort(
				(a, b) => b.children.length - a.children.length || a.name.localeCompare(`${b.name}`)
			);
		});
		this.torrent_directory_tree[0].children.sort(
			(a, b) => b.children.length - a.children.length || a.name.localeCompare(`${b.name}`)
		);
		this.filesDataSource.data = this.torrent_directory_tree;
		this.trackersDataSource.data = this.data.metadata.trackers.map((tracker) => ({
			url: tracker,
			children: [],
			isSelected: true,
		}));
		this.isLoading = false;
	}

	getTranslation(text: string) {
		return this._translate.translate(TORRENT_DOWNLOAD_DIALOG_PREFIX + text.toUpperCase());
	}
	hasChild(_: number, node: FileTreeNode) {
		return !!node.children && node.children.length > 0;
	}
	expandSubTree(node: FileTreeNode) {
		const result = this.isRootNode(node) || this.filesTreeControl.isExpanded(node);
		return result;
	}
	isRootNode(node: FileTreeNode) {
		return JSON.stringify(node) === JSON.stringify(this.torrent_directory_tree[0]);
	}
}
