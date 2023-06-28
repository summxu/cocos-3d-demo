/*
 * @Author: Chenxu
 * @Date: 2023-06-17 10:52:35
 * @LastEditTime: 2023-06-28 15:54:34
 * @Msg: Nothing
 */

import { resources, SpriteFrame } from "cc";

export const loadDir = (
  path: string,
  type: typeof SpriteFrame = SpriteFrame
) => {
  return new Promise<SpriteFrame[]>((resolve, reject) => {
    resources.loadDir(path, type, (err, spriteFrames) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(spriteFrames);
    });
  });
};
