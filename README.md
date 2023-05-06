# ![Title](https://capsule-render.vercel.app/api?type=transparent&fontColor=000000&text=Real%20Time%20Squat%20Classifier%20using%20Media-Pipe%20&height=200&fontSize=42&desc=Google%20Explore%20CSR%202023%20SNU%20GSDS&descAlignY=76&descAlign=50)

## Abstract

**Real Time Squat Classifying Service** built with React, TensorflowJS, MediaPipe, Firebase. Check out! https://real-time-squat-classifier.web.app/

<div align="center">
<img src=images/squat.gif width="640" height="400"/> <br> <br>
</div>

## Introduction

<!-- prettier-ignore -->
Recently, AI technology is conquering the field of video beyond images. Our team developed an AI service that classifies users' squat video received through webcams into seven labels and shows them in real time. The frontend of the website was developed using React, and the service was designed to perform inference on the browser using TensorflowJS so that no separate server or cloud was required. Through the MediaPipe framework, data was received by detecting the user's real-time pose and storing the results in local storage. Our main reference paper was [1]. <br> <br>

## Data

This project used the data from [https://hi.cs.waseda.ac.jp/~ogata/Dataset.html](https://hi.cs.waseda.ac.jp/~ogata/Dataset.html). The data consist of 7 labels of squat pose.

<div align="center">
<img src=images/data.png width="478" height="256" /><br> <br>
</div>

## Model Architecture

Model architecture is like below. First model, called CID, we replaced average pooling of the original paper to FC Layer, which led to the better result. Second one, since temporal distance can be interpreted as sinusoidal waves, we implemented fourier transform to the data and developed a model that deals with transformed data.

<!-- prettier-ignore -->
<div align="center">
<img src=./images/model.png width="522" height="195" />
<div align="center">[Model 1] CID</div>
<img src=./images/model2.png width="522" height="170" />
<div align="center">[Model 2] FFT</div>
</div><br> <br>

## Experiment

We conducted an experiment to compare the reference model from the paper and ours.

<div align="center">

<!-- prettier-ignore-start -->
|           |   Paper   | Experiment |    CID    |   FFT    |
| :-------: | :-------: | :--------: | :-------: | :------: |
| Parameter |   3.1M    |3.1M|    6M     | 0.3~2.5M |
| Accuracy  | 0.75-0.89 | 0.50-0.65  | 0.71-0.82 | 0.62-0.7 |
<!-- prettier-ignore-end -->

</div>

Gradcam result is like below.

<div align="center">
<img src=./images/gradcam.png width="630" height="182" />
</div>

## Reference

```
[1] R. Ogata, E. Simo-Serra, S. Iizuka and H. Ishikawa, "Temporal Distance Matrices for Squat Classification," 2019 IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), Long Beach, CA, USA, 2019, pp. 2533-2542, doi: 10.1109/CVPRW.2019.00309.
```
