export const isInBroswer = typeof window !== "undefined" && typeof navigator !== "undefined";
export const isInProcess = typeof process !== "undefined";

const isIE = isInBroswer && navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
const isEdge = isInBroswer && navigator.userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
const isIE11 = isInBroswer && navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf("rv:11.0") > -1;

export const supportTick = !isInBroswer && isInProcess;
export const supportBroswerStyle = !isIE && !isEdge && !isIE11;