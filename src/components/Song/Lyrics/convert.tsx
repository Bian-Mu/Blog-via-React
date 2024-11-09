// 歌词解析函数，转换格式为 { time: number, text: string } 数组
export function parseLyrics(lyricsStr: string): { time: number; text: string }[] {
    const lines = lyricsStr.split('[');  // 以 '[' 分割整个字符串
    const lyrics = [];

    for (let line of lines) {
        const bracketPos = line.indexOf(']');  // 找到 ']' 的位置
        if (bracketPos !== -1) {
            const timeStr = line.substring(0, bracketPos);  // 截取时间字符串
            const text = line.substring(bracketPos + 1).trim();  // 截取歌词文本
            if (timeStr && text) {
                const timeParts = timeStr.split(':');  // 分割分钟和秒
                if (timeParts.length === 2) {
                    const minutes = parseInt(timeParts[0], 10);
                    const seconds = parseFloat(timeParts[1]);
                    const totalTime = minutes * 60 + seconds;  // 计算总时间（秒）
                    lyrics.push({ time: totalTime, text: text });
                }
            }
        }
    }

    return lyrics;
}
