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
    /https?:\/\/static.xxx.com/, //支持正则表达式
];
// 图片处理CDN域名
config.ImageCDN = "https://imgcdn.microsoft.com";
// 流媒体加速CDN域名
config.StreamCDN = "https://streamcdn.microsoft.com";
```

### image 图片处理

```js
import { adaptiveImage, progressiveImage, thumbnail, shareImage } from "miniprogram-cdn";

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
const shareCover = shareImage(oldUrl); // 微信对话消息分享的压缩裁切图
const adativeURL = adaptiveImage(oldUrl); // 屏幕大小自适应压缩(有损)
const progressiveURL = progressiveImage(oldUrl); // 渐进加载大图(无损)
```

高级用法

```ts
//高级用法
compress(
    {
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
    },
    cdnSite:string,
    domainList:Array<string|Regex>
)
```

### stream 音视频加速

```js
//stream 音频适配
const streamUrl = streamCdn(oldUrl); //
```


## wxs 中使用

```ts
import { compress, isGif } from './index';
```

配合 `miniporgram-build`编译会去掉 config和`wx`相关引用


