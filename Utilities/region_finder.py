import pyautogui
import keyboard
import time

print("Move mouse to TOP-LEFT corner and press 's'")
keyboard.wait('s')
x1, y1 = pyautogui.position()
print(f"Top-left recorded: {x1}, {y1}")

time.sleep(1)

print("Move mouse to BOTTOM-RIGHT corner and press 's'")
keyboard.wait('s')
x2, y2 = pyautogui.position()
print(f"Bottom-right recorded: {x2}, {y2}")

width = x2 - x1
height = y2 - y1

print("\nRectangle:")
print(f"Start: ({x1}, {y1})")
print(f"Width: {width}")
print(f"Height: {height}")