#pragma GCC optimize("03")
#include <bits/stdc++.h>
#include "json\single_include\nlohmann\json.hpp"

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
const string abspath = "dataset";
const string jsonNameFile = "texture.json";
const string pathName = "dataset/0.jpg";
const string imgFileName = "0.jpg";
const string savedJsonFileName = "resultTexture.json";
const int numOfDimension = 3;

double hist[channel][channel];

namespace pairToJson {
    struct Image{
        string name;
        double simp;
    };
    void to_json(json& j, const Image& p) {
        j = json{ {"name", p.name}, {"simp", p.simp} };
    }
    void from_json(const json& j, Image& p) {
        j.at("name").get_to(p.name);
        j.at("simp").get_to(p.simp);
    }
}

namespace indexed {
    struct index{
        string name;
        vector< double > vec;
    };
    void to_json(json& j, const index& p) {
        j = json{ {"name", p.name}, {"vector", p.vec}};
    }
    void from_json(const json& j, index& p) {
        j.at("name").get_to(p.name);
        j.at("vector").get_to(p.vec);
    }
}

indexed::index indexedImage;

void img_to_texture_vector(string path, string name){
    double hist[channel][channel];
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
    vector < double > done;
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
                    if (hist[i][j] != 0.0) entropy -= hist[i][j] * log(hist[i][j]);
                }
            }
            done.push_back(contrast);
            done.push_back(homogeneity);
            done.push_back(entropy);
        }
    }
    indexedImage.name = name;
    indexedImage.vec = done;
}

double vectorlength(const vector < double > &x){
    double sum = 0.0;
    for(auto px = x.begin(); px != x.end(); px++){
        sum += (*px) * (*px);
    }
    double ans = sqrt(sum);
    return ans;
}

double cossinesim(const vector < double > &xa, const vector < double > &xb){
    assert(xa.size() == xb.size());
    double sum = 0.0;
    vector < double > a(xa.size(), 0.0);
    vector < double > b(xb.size(), 0.0);
    double lena = vectorlength(xa);
    double lenb = vectorlength(xb);
    for(int i = 0; i < (int)xa.size(); ++i){
        a[i] = xa[i] / lena;
        b[i] = xb[i] / lenb;
    }
    for(auto pa = a.begin(), pb = b.begin(); pa != a.end() && pb != b.end(); pa++, pb++){
        sum += (*pa) * (*pb);
    }
    double ans = sum;
    return ans;
}

bool cmpcossim(const pair < string, double > &p1, const pair < string, double > &p2){
    return p1.second > p2.second;
}

int main(){
    auto beg = high_resolution_clock::now();
    img_to_texture_vector(pathName, imgFileName);
    ifstream file(jsonNameFile);
    json j = json::parse(file);
    vector < pair < string, double > > cossim;
    int p1 = 0;
    for(int i = 0; i < (int)j.size(); ++i){
        indexed::index done;
        indexed::from_json(j[i], done);
        cossim.push_back({done.name, cossinesim(done.vec, indexedImage.vec)});
    }
    sort(cossim.begin(), cossim.end(), cmpcossim);
    vector < pairToJson::Image > v;
    for(int i = 0; i < (int)cossim.size(); ++i){
        if(cossim[i].second < 0.6)  break;
        pairToJson::Image im = {cossim[i].first, cossim[i].second * 100};
        v.push_back(im);
    }
    json jres;
    jres = v;
    ofstream savedJson(savedJsonFileName);
    savedJson << jres; 
    auto en = high_resolution_clock::now();
    auto dur = duration_cast<milliseconds>(en - beg);
    cout << "Finished calculation in " << dur.count() << "ms" << endl;
    return 0;
}