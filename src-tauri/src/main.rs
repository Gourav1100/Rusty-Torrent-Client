// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

fn main() {
    let mut builder = tauri::Builder::default();
    builder = modules::set_handlers(builder);
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
