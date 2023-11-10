#pragma GCC optimize("03")
#include <bits/stdc++.h>
#include "lib/json/single_include/nlohmann/json.hpp"

#define STB_IMAGE_IMPLEMENTATION
#include "lib/stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "lib/stb_image_write.h"

using namespace std;
using namespace std::chrono;
using json = nlohmann::json;
namespace fs = std::filesystem;

const int channel = 256;
const double pi = acos(-1.0);
const vector<int> dxs = {0, -1, -1, -1, 0};
const vector<int> dys = {1, 1, 0, -1, -1};
const vector<int> distances = {1};
const string abspath = "../public/images/dataset";
const string preProcessJsonFileName = "texture.json";

double hist[channel][channel];

vector< double > res;

void img_to_texture_vector(string path){
    int width, height, ori, desired = 3;
    unsigned char *img = stbi_load(path.c_str(), &width, &height, &ori, desired);
    if(img == NULL){
        return;
    }
    int img_size = width * height * desired;
    int g_img_size = width * height;
    unsigned char *gray_img = (unsigned char*)malloc(g_img_size);
    for(unsigned char *p = img, *pg = gray_img; p != img + img_size; p += 3, pg++){
        int R = *p;
        int G = *(p + 1);
        int B = *(p + 2);
        double Y = 0.29 * R + 0.587 * G + 0.114 * B;
        int valY = round(Y);
        valY = max(0, min(255, valY));
        unsigned char conv = valY;
        *pg = conv;
    }
    for(auto &d: distances){
        assert(dxs.size() == dys.size());
        for(int i = 0; i < (int)dxs.size(); ++i){
            int dx = dxs[i], dy = dys[i];
            dx *= d;
            dy *= d;
            for(int i = 0; i < channel; ++i){
                for(int j = 0; j < channel; ++j){
                    hist[i][j] = 0.0;
                }
            }
            double cnt = 0.0;
            for (int i = -dx; i < height; ++i) {
                for (int j = max(0, -dy); j < min(width, width - dy); ++j) {
                    assert(i + dx < height && j + dy < width);
                    int curIndex = i * width + j, nextIndex = (i + dx) * width + j + dy;
                    hist[gray_img[curIndex]][gray_img[nextIndex]] += 1.0;
                    hist[gray_img[nextIndex]][gray_img[curIndex]] += 1.0;
                    cnt += 2.0;
                }
            }
            for (int i = 0; i < channel; ++i) {
                for (int j = 0; j < channel; ++j) {
                    hist[i][j] /= cnt;
                }
            }
            double contrast = 0.0;
            double homogeneity = 0.0;
            double entropy = 0.0;
            for (int i = 0; i < channel; ++i) {
                for (int j = 0; j < channel; ++j) {
                    contrast += hist[i][j] * (i - j) * (i - j);
                    homogeneity += (hist[i][j] / (1 + (i - j) * (i - j)));
                    if (hist[i][j] != 0.0) entropy += hist[i][j] * -log(hist[i][j]);
                }
            }
            res.push_back(contrast);
            res.push_back(homogeneity);
            res.push_back(entropy);
        }
    }
}

int main(){
    auto beg = high_resolution_clock::now();
    for(const auto &entry: fs::directory_iterator(abspath)){
        img_to_texture_vector(entry.path().string());
    }
    json j;
    j = res;
    ofstream file(preProcessJsonFileName);
    file << j; 
    auto en = high_resolution_clock::now();
    auto dur = duration_cast<milliseconds>(en - beg);
    cout << "Finished calculation in " << dur.count() << "ms" << endl;
    return 0;
}