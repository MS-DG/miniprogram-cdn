const COMPRESS_PREFIX = '?basic=';

/**
 * 获取文件后缀
 * @param path 文件名
 * @returns lower string 后缀名
 */
function getExt(path: string): string {
    return path && path.substr(path.lastIndexOf(".") + 1).toLowerCase();
}

export interface CDNOptions {
    url: string;
    /**
     * 0 或 不定义	锁定宽高比且长边优先
    1	锁定宽高比且短边优先
    2	强制宽高
    4	锁定宽高比且短边优先，并在缩放后以指定颜色填充空白区域（若颜色未指定则自动采用白色填充
     */
    scaleType?: 0 | 1 | 2 | 4;
    /**
     * 值为 0 或 1 的整数，默认为 0 即不进行其他操作，为1则自动裁剪原图至指定尺寸
     */
    cut?: boolean;
    /**
     * 输出宽度
     */
    width?: number;
    /**
     * 输出高度
     */
    height?: number;
    /**
     * 图片质量默认100
     */
    quality?: number;
    /**
     * 是否渐进加载
     */
    progressive?: boolean;
    /**
     * 图片过大是否处理
     */
    handleiflarger?: boolean;
    /**
     * 输出格式
     */
    ext?: '.jpg' | '.webp' | '.png' | '.jpeg' | '.gif';
}

/**
 * 配置信息
 */
class Config {
    /**
     * 宽度
     */
    public Width = 768;

    /**
     * 屏幕高度
     */
    public Height = 1024;
    /**
     * 图片质量1~100
     */
    public Quality = 100;

    /**
     * 缩略图宽度
     */
    public ThumbnailWidth = 138;

    /**
     * 缩略图宽度1~100
     */
    public ThumbnailQuality = 1;

    /**
    * 是否为Android
    */
    public get IsAndroid(): boolean {
        return this.isAndroid;
    }

    private isAndroid = false;

    constructor() {
        //@ts-ignore
        wx.getSystemInfo({
            success: (res) => {
                this.isAndroid = res.platform !== "ios";
                this.Width = Math.round((res.windowWidth || res.screenWidth) * res.pixelRatio) || this.Width;
                if (this.Width > 4096) {
                    this.Width = 4096;
                }

                this.Height = Math.round((res.screenHeight || res.windowWidth) * res.pixelRatio) || this.Height;
                if (this.Width > 4096) {
                    this.Width = 4096;
                }
            }
        })
    }

    /**
     * URL预处理
     */
    public replaceUrl(url: string, cdnSite: string): string {
        return url && url.split(COMPRESS_PREFIX)[0]
            .replace("https://mpfcdn.live.com/", cdnSite)
            .replace("https://digicard-int.live.com/", cdnSite);
    }
}

const config = new Config();


/**
 * 生成压缩URL
 * @param option 
 */
function buildCompressedUrl(option: CDNOptions): string {
    const url = config.replaceUrl(option.url, "https://mpfcdnimage.live.com/");
    const ext = getExt(url);
    //gif图不处理
    if (ext === "gif") {
        return url;
    }

    let param: string = '';
    if (option.width) {
        param += `_${option.width}w`;
    }
    if (option.height) {
        param += `_${option.height}h`;
    }
    if (option.quality && option.quality < 100) {
        param += `_${option.quality}q`;
    }
    if (option.progressive) {
        param += `_1pr`;
    }
    if (option.scaleType) {
        param += `_${option.scaleType}e`;
    }
    if (option.cut) {
        param += `_1c`;
    }
    if (option.ext) {
        param += option.ext;
    }

    return param ? (url + COMPRESS_PREFIX + (option.handleiflarger ? '1l' : '0l') + param) : url;
}

export {
    config,
    buildCompressedUrl,
}
/**
 * 屏幕宽度自适应图像
 * @param url url of image
 */
export function adaptiveImage(url: string): string {
    return buildCompressedUrl({
        url: url,
        width: config.Width,
        quality: config.Quality,
        progressive: config.Width > 800,
        ext: config.IsAndroid ? '.webp' : '.jpg',
    })
}

/**
 * 宽屏自适应图像
 * @param url url of image
 */
export function adaptiveLandscapeImage(url: string): string {
    const width = config.Width > config.Height ? config.Width : config.Height;
    return buildCompressedUrl({
        url: url,
        width: width,
        quality: config.Quality,
        progressive: width > 800,
        ext: config.IsAndroid ? '.webp' : '.jpg',
    })
}

/**
 * 渐进式加载大图
 * @param url image URL
 */
export function progressiveImage(url: string): string {
    return buildCompressedUrl({
        url: url,
        progressive: true,
        ext: config.IsAndroid ? '.webp' : '.jpg',
    })
}

/**
 * 小尺寸缩略图
 * @param url 原url
 */
export function thumbnail(url: string): string {
    return buildCompressedUrl({
        url: url,
        width: config.ThumbnailWidth,
        quality: config.ThumbnailQuality,
        ext: '.jpg',
    })
}



/**
 * 缩略图
 * @param url 原url
 */
export function webCdn(url: string): string {
    return config.replaceUrl(url, "https://mpfcdnweb.live.com/");
}


/**
 * 流媒体
 * @param url 原url
 */
export function streamCdn(url: string): string {
    return config.replaceUrl(url, "https://mpfcdnvod.live.com/");
}
