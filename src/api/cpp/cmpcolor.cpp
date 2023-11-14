#pragma GCC optimize("03")
#include <iostream>
#include <chrono>
#include <string>
#include <fstream>
#include <cmath>
#include "lib/json.hpp"

#define STB_IMAGE_IMPLEMENTATION
#include "lib/stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "lib/stb_image_write.h"

using namespace std;
using namespace std::chrono;
using json = nlohmann::json;
namespace fs = std::filesystem;

const string jsonFileName = "color.json";
const string jsonResName = "result.json";

typedef struct
{
    string fileName;
    double similarity;
} ResFormat;

vector<vector<int>> hist(16, vector<int>(72, 0));

int getHIndex(double H)
{
    int idxH;
    if (316 <= H && H <= 360)
        idxH = 0;
    else if (0 <= H && H < 26)
        idxH = 1;
    else if (26 <= H && H < 41)
        idxH = 2;
    else if (41 <= H && H < 121)
        idxH = 3;
    else if (121 <= H && H < 191)
        idxH = 4;
    else if (191 <= H && H < 271)
        idxH = 5;
    else if (271 <= H && H < 296)
        idxH = 6;
    else if (296 <= H && H < 316)
        idxH = 7;
    return idxH;
}

int getSIndex(double S)
{
    int idxS;
    if (0 <= S && S < 0.2)
        idxS = 0;
    else if (0.2 <= S && S < 0.7)
        idxS = 1;
    else if (0.7 <= S && S <= 1)
        idxS = 2;
    return idxS;
}

int getVIndex(double V)
{
    int idxV;
    if (0 <= V && V < 0.2)
        idxV = 0;
    else if (0.2 <= V && V < 0.7)
        idxV = 1;
    else if (0.7 <= V && V <= 1)
        idxV = 2;
    return idxV;
}

void img_to_color_vector(string path)
{
    int width, height, channels;
    unsigned char *img = stbi_load(path.c_str(), &width, &height, &channels, 3);

    int w[5];
    int h[5];
    w[0] = 0;
    h[0] = 0;
    w[1] = width / 4;
    h[1] = height / 4;
    w[2] = width / 2;
    h[2] = height / 2;
    w[3] = width * 3 / 4;
    h[3] = height * 3 / 4;
    h[4] = width;
    w[4] = height;
    int idxCnt = 0;
    unsigned char *p = img;
    for (int wi = 0; wi < 4; wi++)
    {
        for (int hi = 0; hi < 4; hi++)
        {
            for (int i = w[wi]; i < w[wi + 1]; i++)
            {
                for (int j = h[hi]; j < h[hi + 1]; j++)
                {
                    int idx = i * height * 3 + j * 3;
                    double R = p[idx];
                    double G = p[idx + 1];
                    double B = p[idx + 2];
                    R /= 255;
                    G /= 255;
                    B /= 255;
                    double cMax, cMin, delta, H, S, V;
                    cMax = max(R, G);
                    cMax = max(cMax, B);
                    cMin = min(R, G);
                    cMin = min(cMin, B);
                    delta = cMax - cMin;

                    if (delta == 0)
                        H = 0;
                    else if (cMax == R)
                    {
                        H = (G - B) / delta;
                        if (H < 0)
                            H += 6;
                        H *= 60;
                    }
                    else if (cMax == G)
                    {
                        H = (B - R) / delta;
                        H += 2;
                        H *= 60;
                    }
                    else if (cMax == B)
                    {
                        H = (R - G) / delta;
                        H += 4;
                        H *= 60;
                    }
                    if (cMax == 0)
                        S = 0;
                    else
                        S = (delta / cMax);
                    V = cMax;
                    int idxH = getHIndex(H), idxS = getSIndex(S), idxV = getVIndex(V);
                    hist[idxCnt][idxH * 9 + idxS * 3 + idxV]++;
                }
            }
            idxCnt++;
        }
    }
    stbi_image_free(img);
}

int mult[16] = {1,1,1,1,1,4,4,1,1,4,4,1,1,1,1,1};

double simp(vector<vector<int>> cmp){
    double rest = 0;
    for (int i = 0; i < 16; i++){
        double sum = 0;
        double aSum = 0;
        double bSum = 0;
        for (int j = 0; j < 72; j++){
            sum += cmp[i][j] * hist[i][j];
            aSum += cmp[i][j] * cmp[i][j];
            bSum += hist[i][j] * hist[i][j];
        }
        double temp = sum/(sqrt(aSum) * sqrt(bSum));
        rest += temp * mult[i];
    }
    rest /= 28;
    return rest;
}

bool cmpResFormat(const ResFormat a, const ResFormat b){
    return a.similarity > b.similarity;
}

vector<ResFormat> res;
int main()
{
    auto beg = high_resolution_clock::now();
    string pathW;
    string absPath = "public/images/test";
    for (const auto &entry: fs::directory_iterator(absPath)){
        pathW = entry.path().string();
    }
    img_to_color_vector(pathW);

    // check from file
    std::ifstream inputFile(jsonFileName);

    if (!inputFile.is_open())
    {
        std::cerr << "Error opening file." << std::endl;
        return 1;
    }

    json jsonData;
    json jOut;
    inputFile >> jsonData;
    inputFile.close();

    int cnt = 0;
    for (const auto &pipi : jsonData)
    {
        string name = pipi["name"];
        vector<vector<int>> vec = pipi["vec"];
        double temp = simp(vec) * 100;
        if (temp > 60){
            ResFormat tmpk;
            tmpk.fileName = name;
            tmpk.similarity = temp;
            res.push_back(tmpk);
        }
    }
    sort(res.begin(), res.end(), cmpResFormat);

    for (int i = 0; i < res.size(); i++){
        jOut.push_back({{"name", res[i].fileName}, {"simp", res[i].similarity}});
    }

    ofstream file(jsonResName);
    file << jOut;
    file.close();

    auto en = high_resolution_clock::now();
    auto dur = duration_cast<milliseconds>(en - beg);
    cout << "Finished calculation in " << dur.count() << "ms" << endl;
    return 0;
}