/**
 * Base64 编码函数
 * @param str 要编码的字符串
 * @returns Base64 编码后的字符串
 */
export const base64Encode = (str: string): string => {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        let binary = '';
        for (let i = 0; i < data.byteLength; i++) {
            binary += String.fromCharCode(data[i]);
        }
        return btoa(binary);
    } catch (error) {
        console.error("Base64 encoding failed:", error);
        return '';
    }
}

/**
 * Base64 解码函数
 * @param base64 要解码的 Base64 字符串
 * @returns 解码后的字符串
 */
export const base64Decode = (base64: string): string => {
    try {
        const binary = window.atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    } catch (error) {
        console.error("Base64 decoding failed:", error);
        return '';
    }
}
