import time
import pyautogui
from mss import mss
def super_fast_clicker():
    print("Starting in 5 seconds... Move mouse to the target!")
    time.sleep(5)
    x, y = pyautogui.position()
    monitor = {"top": y, "left": x, "width": 1, "height": 1}
    with mss() as sct:
        print(f"Monitoring {x}, {y} for green...")
        while True:
            img = sct.grab(monitor)
            b, g, r = img.pixel(0, 0)
            if g > r + 50 and g > 150:
                pyautogui.click()
                print(f"Ultra-fast click! RGB: ({r}, {g}, {b})")
                break
if __name__ == "__main__":
    super_fast_clicker()