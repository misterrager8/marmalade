import praw

from api import config

reddit = praw.Reddit(
    client_id=config.CLIENT_ID,
    user_agent=config.USER_AGENT,
    client_secret=config.CLIENT_SECRET,
)


def get_hot():
    return [
        dict(title=i.title, url=i.url)
        for i in reddit.subreddit("HipHopHeads").hot(limit=15)
    ]
