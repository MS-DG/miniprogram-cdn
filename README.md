# miniprogram-cdn

auzre cn cdn compress for miniprogarm

CDN 图片压缩处理，小程序自适应,仅仅支持Azure https://docs.azure.cn/zh-cn/cdn/cdn-image-processing


`npm i miniprogram-cdn`

### quick start

```js
import {config,adaptiveImage,adaptiveLandscapeImage,progressiveImage,thumbnail} from "miniprogram-cdn";

config.Quality=90;//config 可全局配置

url0 = thumbnail(url);//生成小尺寸模糊缩略图,可在config中配置

url1 = adaptiveImage(url);//根据屏幕宽度自适应压缩,自动选择渐进加载,webp格式IOS兼容等
url2 = adaptiveLandscapeImage(url);//自适应横屏图片,自动选择渐进加载,webp格式IOS兼容等
url3 = progressiveImage(url);//生成渐进加载,无损压缩不修改分辨率
```


### 自定义压缩

```js

import {buildCompressedUrl} from "miniprogram-cdn"

buildCompressedUrl({
    url: string;
    /**
     * 输出宽度
     */
    width: number;
    /**
     * 输出高度
     */
    height: number;
    /**
     * 图片质量默认100
     */
    quality: number;
    /**
     * 是否渐进加载
     */
    progressive: boolean;
    /**
     * 图片过大是否处理
     */
    handleiflarger: boolean;
    /**
     * 输出格式
     */
    ext: '.jpg' | '.webp' | '.png' | '.jpeg' | '.gif';
})

```