from dataclasses import dataclass
import datetime

@dataclass
class User:
    id: str
    firstname: str
    lastname: str
    email: str
    telephone: str
    password_hash: str
    address_id: int
    referral_code_id: int = 0
    is_premium: bool = False
    is_company_manager: bool = False
    coin_balance: int = 0
    shopping_cart: int = 0
    content_preferences_id: int = 0 
    created_at: datetime = None
    updated_at: datetime = None