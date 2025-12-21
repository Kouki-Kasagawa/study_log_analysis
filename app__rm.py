from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/template") 
def template(): 
    return render_template("template.html", greeting="hello")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
