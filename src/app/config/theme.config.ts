export interface Theme {
	body: string;
	header: string;
	body_secondary: string;
	settings_item?: string;
	settings_item_label?: string;
	input?: string;
}

const common_theme: Partial<Theme> = {
	body: "h-screen overflow-y-auto font-mono",
	header: "px-8 py-2 flex justify-between",
	body_secondary: "py-5 px-2 border-2 border-yellow-500 rounded-xl justify-center",
	settings_item:
		"flex p-2 gap-2 w-full justify-between hover:bg-yellow-200 hover:scale-105 transition-all duration-300 drop-shadow-lg rounded-xl",
	input: "border-b-2 px-4 outline-none mx-4 bg-transparent flex h-fit p-2 transition-all duration-300",
};

const theme: {
	light_mode: Theme;
	dark_mode: Theme;
} = {
	dark_mode: {
		body: "bg-stone-700 text-white",
		body_secondary: "bg-stone-800 text-white",
		header: "bg-stone-900",
		settings_item: "text-white hover:text-black",
		input: "text-yellow-400 border-yellow-200 placeholder:text-yellow-200 focus:border-yellow-400",
	},
	light_mode: {
		body: "bg-stone-50",
		body_secondary: "bg-stone-100 text-white",
		header: "bg-yellow-400",
		settings_item: "text-black",
		input: "text-black border-black placeholder:text-black",
	},
};

export function getTheme(theme_name: "light_mode" | "dark_mode" | "brightness_auto"): Theme {
	let final_theme: Theme = theme[theme_name as "light_mode" | "dark_mode"];
	Object.keys({ ...theme[theme_name as "light_mode" | "dark_mode"], ...common_theme }).forEach(
		(key_string: string) => {
			const key: keyof Theme = key_string as keyof Theme;
			final_theme[key] =
				(theme[theme_name as "light_mode" | "dark_mode"][key] || "") + " " + (common_theme[key] || "");
		}
	);
	return final_theme;
}
