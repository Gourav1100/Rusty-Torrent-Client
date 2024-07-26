pub mod torrent;

use tauri::{Builder, Wry};

pub fn set_handlers(builder: Builder<Wry>) -> Builder<Wry> {
    builder.invoke_handler(tauri::generate_handler![torrent::get_torrent_metadata,])
}
