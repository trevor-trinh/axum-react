use axum::{
    routing::{get, post},
    Router,
};

pub mod health;
pub mod mint;

pub fn create_routes() -> Router {
    Router::new()
        .route("/api/health", get(health::health_check))
        .route("/api/mint", post(mint::mint_tokens))
}
