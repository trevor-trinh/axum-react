use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, ToSchema)]
pub struct ApiResponse {
    pub message: String,
    pub timestamp: u64,
}

#[derive(Deserialize, ToSchema)]
pub struct MintRequest {
    /// Stock ticker symbol (e.g., "AAPL", "TSLA")
    pub ticker: String,
    /// Exchange where the stock is traded (e.g., "NASDAQ", "NYSE")
    pub exchange: String,
    /// Amount of tokens to mint
    pub amount: u64,
    /// Destination address for the minted tokens
    pub to_address: String,
}

#[derive(Serialize, ToSchema)]
pub struct MintResponse {
    pub message: String,
    pub ticker: String,
    pub exchange: String,
    pub amount: u64,
    pub to_address: String,
    /// Internal contract address for this ticker
    pub contract_address: String,
    /// Transaction hash (placeholder for now)
    pub tx_hash: String,
    pub timestamp: u64,
}

#[derive(Serialize, ToSchema)]
pub struct MintError {
    pub error: String,
    pub message: String,
    pub timestamp: u64,
}
