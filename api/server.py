from api import config, create_app

if __name__ == "__main__":
    app = create_app(config)
    app.run(debug=True)
