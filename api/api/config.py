import os

import dotenv

dotenv.load_dotenv()

GENIUS_ACCESS_TOKEN = os.getenv("GENIUS_ACCESS_TOKEN")
CLIENT_ID = os.getenv("client_id")
USER_AGENT = os.getenv("user_agent")
CLIENT_SECRET = os.getenv("client_secret")
