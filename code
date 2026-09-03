import yt_dlp

def download_twitter_video(url, quality='best'):
    ydl_opts = {
        'format': quality,
        'outtmpl': '%(id)s.%(ext)s',
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"Downloading video from: {url}")
            ydl.download([url])
            print("Download completed successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    video_url = input("Enter Twitter video link: ").strip()
    print("Quality options: 'best', 'worst', or specific format selector (e.g., 'bv[height<=720]+ba/b')")
    choice = input("Enter quality choice (default 'best'): ").strip() or 'best'
    
    download_twitter_video(video_url, choice)
