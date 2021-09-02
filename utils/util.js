
/**
 * 将数组元素里面的name属性转为字符串拼接 
 * @param {*} casts 数组 可以拼接演员和导演数组的name
 */
export function convertToCastString(casts) {
  const names = [];
  casts.forEach(item => {
    names.push(item.name);
  })
  return names.join(" / ");
}
/**
 * 整合影人的信息 图片和名字
 * @param {*} casts 
 */
export function convertToCastInfos(casts) {
  const castsArray = [];
  casts.forEach(item => {
    castsArray.push({
      img: item.avatars?.large,
      name: item.name
    })
  })
  return castsArray;
}