use cratetorrent::prelude::*;
use serde::Serialize;
use tokio::fs;

#[derive(Serialize)]
pub struct MetainfoResponse {
    name: String,
    trackers: Vec<String>,
    files: Vec<String>,
    piece_len: u32,
    pieces: Vec<u8>,
    info_hash: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub async fn get_torrent_metadata(torrent_path: String) -> Result<MetainfoResponse, String> {
    let metainfo_bytes = fs::read(torrent_path).await.map_err(|e| e.to_string())?;
    let metainfo = Metainfo::from_bytes(&metainfo_bytes).map_err(|e| e.to_string())?;
    Ok(MetainfoResponse {
        name: metainfo.name,
        trackers: metainfo
            .trackers
            .into_iter()
            .map(|t| t.to_string())
            .collect(),
        files: metainfo
            .files
            .into_iter()
            .map(|f| f.path.to_string_lossy().to_string())
            .collect(),
        piece_len: metainfo.piece_len,
        pieces: metainfo.pieces.to_vec(),
        info_hash: String::from_utf8_lossy(metainfo.info_hash.to_owned().as_ref()).to_string(),
    })
}

