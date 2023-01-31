import praw

reddit = praw.Reddit(
    client_id="3w1z65bGLrtdLA",
    user_agent="newapp",
    client_secret="2vHRL35CdtLCu7AFsEf-fz3iQBI",
)


def get_hot():
    return reddit.subreddit("HipHopHeads").hot(limit=10)
