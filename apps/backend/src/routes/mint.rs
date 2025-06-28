use axum::{
    extract::Json as ExtractJson,
    response::Json,
};

use crate::models::{MintRequest, MintResponse, MintError};
use crate::services::mint_service;

#[utoipa::path(
    post,
    path = "/api/mint",
    request_body = MintRequest,
    responses(
        (status = 200, description = "Successfully initiated mint", body = MintResponse),
        (status = 400, description = "Invalid request or unsupported ticker", body = MintError)
    ),
    tag = "minting"
)]
pub async fn mint_tokens(ExtractJson(request): ExtractJson<MintRequest>) -> Result<Json<MintResponse>, Json<MintError>> {
    match mint_service::process_mint(request).await {
        Ok(response) => Ok(Json(response)),
        Err(error) => Err(Json(error)),
    }
} 