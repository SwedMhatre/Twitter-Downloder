from flask import Flask, render_template, request, jsonify
import yt_dlp
import os

app = Flask(__name__)

# Windows Downloads folder
DOWNLOAD_DIR = os.path.join(
    os.path.expanduser("~"),
    "Downloads",
    "Recently Downloads"
)

# Create folder if it doesn't exist
os.makedirs(DOWNLOAD_DIR, exist_ok=True)


def download_twitter_video(url, quality="best"):
    ydl_opts = {
        "format": quality,
        "outtmpl": os.path.join(DOWNLOAD_DIR, "%(title)s [%(id)s].%(ext)s"),
        "noplaylist": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        return True, "Download completed successfully!"

    except Exception as e:
        return False, str(e)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()

    url = data.get("url", "").strip()
    quality = data.get("quality", "best")

    if not url:
        return jsonify({
            "success": False,
            "message": "Please enter a Twitter/X video URL."
        }), 400

    success, message = download_twitter_video(url, quality)

    return jsonify({
        "success": success,
        "message": message
    })


if __name__ == "__main__":
    app.run(debug=True)