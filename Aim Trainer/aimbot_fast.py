import cv2
import numpy as np
import pyautogui
import mss
import keyboard
import time
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0
monitor = {
    "top": 231,
    "left": 499,
    "width": 984,
    "height": 471
}
sct = mss.mss()
running = False
print("Press Q to start/stop")
print("Press ESC to exit completely")
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
    img = np.array(sct.grab(monitor))
    gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)
    edges = cv2.Canny(gray, 120, 250)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in contours:
        area = cv2.contourArea(c)
        if 500 < area < 8000:
            perimeter = cv2.arcLength(c, True)
            if perimeter == 0:
                continue
            circularity = 4 * np.pi * (area / (perimeter * perimeter))
            if circularity > 0.6:
                M = cv2.moments(c)
                if M["m00"] != 0:
                    x = int(M["m10"] / M["m00"])
                    y = int(M["m01"] / M["m00"])
                    pyautogui.moveTo(x + monitor["left"], y + monitor["top"])
                    pyautogui.click()
                    break
    time.sleep(0.003)