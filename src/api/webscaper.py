from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import threading
import requests
import sys

############# INSTALASI ##############
# 1. pip install selenium
# 2. pip install webdriver-manager --user
# 3. tambahin '%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\' di path di system variable


# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #
# !!!!!!!!!!!! ALERT !!!!!!!!!!!!!!! #
# !! PASTIKAN INTERNET ANDA BAIK !!! #
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #

URL = sys.argv[1] # URL
pathToFolder = sys.argv[2] # path ke folder, diakhiri '/' (slash)
numOfThread = int(sys.argv[3]) # jumlah thread, minimal 1
SCROLL_PAUSE_TIME = 0.5 # waktu di antara scroll
scrollCount = 5 # berapa kali mau scroll ke bottom page
timeToImplicitlyWait = 10 # waktu untuk driver menunggu image nge-load
images = []
iterator = 1
default = ".jpg"
mutex = threading.Lock()
aliases = ["src", "data-src"]
allowedFormats = [".jpg", ".png", ".jpeg"] # format yang dibolehin


def scroll(driver):
    global SCROLL_PAUSE_TIME, scrollCount, timeToImplicitlyWait
    last_height = driver.execute_script("return document.body.scrollHeight")
    i = 0
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        i += 1
        if i == scrollCount:
            break
    driver.implicitly_wait(timeToImplicitlyWait)
    
    
def find_image_format(path):
    list_dir = path.strip().split('/')
    last_path = list_dir[-1]
    i = len(last_path) - 1
    found = False
    while i >= 0 and not found:
        if last_path[i] == '.':
            found = True
            break
        i = i - 1
    ans = ""
    while found and i < len(last_path):
        if last_path[i] == '?' or last_path[i] == '#':
            break
        ans = ans + last_path[i]
        i = i + 1
    return ans


def procUnitThread(beginning, end):
    global images, iterator, pathToFolder, default, mutex
    for ind in range(beginning, end + 1, 1):
        try:
            img = images[ind]
            source = None
            for alias in aliases:
                if img.get_attribute(alias) is not None:
                    source = img.get_attribute(alias)
                    break
            if source is None or "http" not in source:
                continue
            img_data = requests.get(source).content
            img_format = find_image_format(source)
            if img_format == "":
                img_format = default
            if img_format not in allowedFormats:
                continue
            with mutex:
                file_name = str(iterator) + img_format
                with open(pathToFolder + file_name, 'wb') as handler:
                    handler.write(img_data)
                iterator = iterator + 1
        except Exception as e:
            continue # ERROR DIBIARIN
        
        
if __name__ == '__main__':
    try:
        start_time = time.time()
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        options.add_argument('--headless=new')

        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

        driver.get(URL)
        
        scroll(driver)
        images = driver.find_elements(By.TAG_NAME, 'img')
        
        curLen = len(images)
        st = 0
        numNow = numOfThread
        
        threads = []
        
        for _ in range(numOfThread):
            takeLen = curLen // numNow
            endNow = st + takeLen - 1
            t1 = threading.Thread(target=procUnitThread, args=(st, endNow))
            threads.append(t1)
            st = endNow + 1
            curLen -= takeLen
            numNow -= 1

        for thread in threads:
            thread.start()
        
        for thread in threads:
            thread.join()
        
        print("Finished calculation in " + str(time.time() - start_time) + "ms")
        
    except Exception as e:
        pass # ERROR DIBIARIN