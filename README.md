# miniprogram-cdn

auzre cn cdn compress for miniprogarm

CDN 图片压缩处理，小程序自适应,仅仅支持 Azure https://docs.azure.cn/zh-cn/cdn/cdn-image-processing

## 安装 install

1. `npm i miniprogram-cdn`
2. 开发工具 构建 npm

## quick start

### config 配置

```js
import { config } from "miniprogram-cdn";

// 设置config 只需配置一次
//待替换的域名列表
config.DomainList = [
    "http://blob.xx.com", //待替换的域名
    /https?:static.xxx.com/, //支持正则表达式
];
// 图片处理CDN域名
config.ImageCDN = "https://imgcdn.microsoft.com";
// 流媒体加速CDN域名
config.StreamCDN = "https://streamcdn.microsoft.com";
```

### image 图片处理

```js
import { adaptiveImage, progressiveImage, thumbnail, shareImage, compress } from "miniprogram-cdn";

// 设置config 只需配置一次
//待替换的域名列表
config.DomainList = [
    "http://blob.xx.com", //待替换的域名
    /https?:static.xxx.com/, //支持正则表达式
];
// 图片处理CDN域名
config.ImageCDN = "https://imgcdn.microsoft.com";
// 流媒体加速CDN域名
config.StreamCDN = "https://streamcdn.microsoft.com";

//图片处理
const thumbnailURL = thumbnail(oldUrl); // 低分辨率缩率图十几KB
const shareCover = shareImage(oldUrl); // 微信对化消息分享的压缩裁切图
const adativeURL = adaptiveImage(oldUrl); // 屏幕大小自适应压缩(有损)
const progressiveURL = progressiveImage(oldUrl); // 渐进加载大图(无损)
```

### stream 音视频加速
```js
//stream 音频适配
const streamUrl = streamCdn(oldUrl);//
```