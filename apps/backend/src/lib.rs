use axum::Router;
use tower_http::cors::CorsLayer;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

pub mod models;
pub mod routes;
pub mod services;

use models::{ApiResponse, MintRequest, MintResponse, MintError};

#[derive(OpenApi)]
#[openapi(
    info(
        title = "Token Minting API",
        version = "0.1.0",
        description = "API for minting stock tokens on-chain"
    ),
    paths(
        routes::health::health_check,
        routes::mint::mint_tokens
    ),
    components(
        schemas(ApiResponse, MintRequest, MintResponse, MintError)
    ),
    tags(
        (name = "api", description = "General API endpoints"),
        (name = "minting", description = "Token minting operations")
    )
)]
pub struct ApiDoc;

pub async fn create_app() -> Router {
    routes::create_routes()
        .merge(SwaggerUi::new("/api/docs").url("/api/openapi.json", ApiDoc::openapi()))
        .layer(CorsLayer::permissive())
}