from flask import Flask, render_template, request, jsonify
from sudoku import solve_sudoku

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/solve", methods=["POST"])
def solve():

    data = request.get_json()
    board = data.get("board")

    if not board:
        return jsonify({
            "success": False,
            "message": "Invalid Sudoku board."
        })

    solution = solve_sudoku(board)

    if solution:
        return jsonify({
            "success": True,
            "board": solution
        })

    return jsonify({
        "success": False,
        "message": "No solution exists for this Sudoku."
    })


if __name__ == "__main__":
    app.run(debug=True)