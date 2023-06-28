export const speedToForce = (speed: number) => {
  // forwardSpeed: 1000 是60米/秒 = 21.6千米/每小时
  // 单位 km/h
  return speed * 46.3
}