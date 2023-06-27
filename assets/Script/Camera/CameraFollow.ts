import { _decorator, Component, Vec3, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
  @property(Node)
  target: Node

  @property(Vec3)
  offset: Vec3 = new Vec3

  tempPos: Vec3 = new Vec3

  update(deltaTime: number) {
    this.target.getPosition(this.tempPos)
    this.node.setPosition(this.tempPos.add(this.offset))
  }
}


