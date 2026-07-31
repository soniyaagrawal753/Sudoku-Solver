from typing import List

class Solution:

    def solveSudoku(self, board: List[List[str]]) -> None:

        def isValid(board, row, col, num):
            # Check row
            for j in range(9):
                if board[row][j] == num:
                    return False

            # Check column
            for i in range(9):
                if board[i][col] == num:
                    return False

            # Check 3x3 box
            startRow = (row // 3) * 3
            startCol = (col // 3) * 3

            for i in range(startRow, startRow + 3):
                for j in range(startCol, startCol + 3):
                    if board[i][j] == num:
                        return False

            return True

        def solve(board):
            for i in range(9):
                for j in range(9):
                    if board[i][j] == '.':
                        for num in "123456789":
                            if isValid(board, i, j, num):
                                board[i][j] = num

                                if solve(board):
                                    return True

                                # Backtrack
                                board[i][j] = '.'

                        return False

            return True

        solve(board)


# Driver Code
board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]

obj = Solution()
obj.solveSudoku(board)

print("Solved Sudoku:")
for row in board:
    print(" ".join(row))