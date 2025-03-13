from flask import current_app, send_from_directory


@current_app.route("/")
def index():
    return send_from_directory(current_app.static_folder, "index.html")


@current_app.post("/test_route")
def test_route():
    success = True
    msg = ""

    try:
        pass
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg}
