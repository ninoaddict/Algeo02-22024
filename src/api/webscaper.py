import requests
import sys
import threading
from bs4 import BeautifulSoup
import time

mutex = threading.Lock()
iterator = 1
images = []
pathToFolder = sys.argv[1]
default = ".jpg"

# sys.argv[0] = url
# sys.argv[1] = pathToFolder (diakhiri dengan /)
# sys.argv[2] = jumlah thread (minimal 1)

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
        img = images[ind]
        source = img.get('src')
        lazy_load_source = img.get('data-src')
        outputImg = source
        if source is None:
            outputImg = lazy_load_source
        if outputImg is None:
            continue
        img_data = requests.get(outputImg).content
        img_format = find_image_format(outputImg)
        if img_format == "":
            img_format = default
        with mutex:
            file_name = str(iterator) + img_format
            with open(pathToFolder + file_name, 'wb') as handler:
                handler.write(img_data)
            iterator = iterator + 1


if __name__ == '__main__':
    try:
        start_time = time.time()
        URL = sys.argv[0]
        numOfThread = sys.argv[2]
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")

        images = soup.find_all("img")
        
        threads = []
        
        curLen = len(images)
        st = 0
        numNow = numOfThread
        
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
        
        iterator = 1
        
        print("Finished calculation in " + str(time.time() - start_time) + "ms")
    except Exception as e:
        raise e
