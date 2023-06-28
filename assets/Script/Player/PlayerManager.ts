/*
 * @Author: Chenxu
 * @Date: 2023-06-27 10:19:51
 * @LastEditTime: 2023-06-28 10:33:29
 * @Description: 
 */
import { Component, EventKeyboard, Input, KeyCode, RigidBody, Vec3, _decorator, input } from 'cc';
import { LANE_ENUM } from '../../Enum';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

  forceSpeed: number = 1000 // 施加的力
  lane: LANE_ENUM = LANE_ENUM.RIGHT
  isForward: Boolean = false

  private tempPos: Vec3 = new Vec3()
  private translateSpeed: number = 5 // 平移速度
  private tempX: number = -0.5 // 记录左右移动的x

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  update(deltaTime: number) {
    this.move(deltaTime)
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_W:
        this.isForward = true
        break;
      case KeyCode.KEY_D:
        this.lane = LANE_ENUM.RIGHT
        break;
      case KeyCode.KEY_A:
        this.lane = LANE_ENUM.LEFT
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_W:
        this.isForward = false
        break;
    }
  }

  move(deltaTime: number) {
    this.node.getPosition(this.tempPos)

    if (this.isForward) {
      // 向前移动
      const rigidBody = this.node.getComponent(RigidBody)
      rigidBody.applyForce(new Vec3(0, 0, this.forceSpeed * deltaTime))
    }

    // 左右平移
    if (this.lane === LANE_ENUM.RIGHT) {
      const { y, z } = this.tempPos
      if (this.tempX > -0.5) {
        this.tempX -= this.translateSpeed * deltaTime
        this.node.setPosition(new Vec3(this.tempX, y, z))
      }
    } else if (this.lane === LANE_ENUM.LEFT) {
      const { y, z } = this.tempPos
      if (this.tempX < 0.5) {
        this.tempX += this.translateSpeed * deltaTime
        this.node.setPosition(new Vec3(this.tempX, y, z))
      }
    }
  }

}
