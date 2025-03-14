import lyricsgenius

genius = lyricsgenius.Genius(
    access_token="3KaKKqUB6Ds6Z2L9Og00enY9wYTLDXuOQk_pNdbT6KxilwvMfd2EaYTjfV-GAPwd"
)


def search_albums(term):
    return [
        i.get("result")
        for i in genius.search_albums(term).get("sections")[0].get("hits")
    ]
