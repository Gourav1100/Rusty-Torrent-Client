import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TranslatePipe } from "./pipes/translate.pipe";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import ThemeService from "./services/theme.service";
import { TranslateService } from "./services/translate.service";
import StorageService from "./services/storage.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
	imports: [RouterOutlet],
	declarations: [TranslatePipe],
	exports: [
		RouterOutlet,
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatSlideToggleModule,
		TranslatePipe,
		HttpClientModule,
		MatTooltipModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatDialogModule,
		MatTabsModule,
		MatTreeModule,
		MatCheckboxModule,
	],
	providers: [StorageService, TranslateService, ThemeService],
})
export class AppFeature {}
