import pyautogui
import numpy as np
import cv2
import time
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.01
def get_frame():
    screenshot = pyautogui.screenshot()
    frame = np.array(screenshot)
    return cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
def detect_dark_squares(frame):
    lower_dark = np.array([0, 0, 0])
    upper_dark = np.array([70, 70, 70])
    mask = cv2.inRange(frame, lower_dark, upper_dark)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    centers = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if 80 < area < 50000:
            x, y, w, h = cv2.boundingRect(cnt)
            centers.append((x + w // 2, y + h // 2))
    return centers
print("Starting... get ready!")
time.sleep(3)
while True:
    saved_positions = []
    print("Waiting for pattern...")
    while True:
        frame = get_frame()
        spots = detect_dark_squares(frame)
        if len(spots) > 0:
            saved_positions = spots
            time.sleep(0.1)
        elif len(saved_positions) > 0:
            break
    print("Verification: Ensuring all squares are gone...")
    consecutive_clears = 0
    while consecutive_clears < 3:
        frame = get_frame()
        if len(detect_dark_squares(frame)) == 0:
            consecutive_clears += 1
        else:
            consecutive_clears = 0
        time.sleep(0.05)
    print(f"Clicking {len(saved_positions)} positions!")
    saved_positions.sort(key=lambda p: (p[1], p[0]))
    for pos in saved_positions:
        pyautogui.click(pos)
        time.sleep(0.03)
    print("Round done. Waiting for next level...")
    time.sleep(2.0)