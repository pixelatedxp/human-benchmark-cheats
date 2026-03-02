import cv2
import numpy as np
import pyautogui
import mss
import time
import keyboard
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0
monitor = {
    "top": 0,
    "left": 0,
    "width": 1920,
    "height": 1080
}
sct = mss.mss()
running = False
print("Press Q to start/stop")
print("Press ESC to exit")
while True:
    if keyboard.is_pressed("esc"):
        print("Exited.")
        break
    if keyboard.is_pressed("q"):
        running = not running
        print("Running:", running)
        time.sleep(0.3)
    if not running:
        time.sleep(0.01)
        continue
    screenshot = np.array(sct.grab(monitor))
    frame = cv2.cvtColor(screenshot, cv2.COLOR_BGRA2BGR)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (9, 9), 2)
    circles = cv2.HoughCircles(
        blurred,
        cv2.HOUGH_GRADIENT,
        dp=1.2,
        minDist=50,
        param1=50,
        param2=30,
        minRadius=10,
        maxRadius=60
    )
    if circles is not None:
        circles = np.uint16(np.around(circles))
        x, y, r = circles[0][0]
        pyautogui.moveTo(x, y)
        pyautogui.click()
    time.sleep(0.01)