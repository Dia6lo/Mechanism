﻿/// <reference path="PropertyAnimatorFactory.ts"/>
/// <reference path="../Vector2.ts"/>
class Vector2Animator<T extends RenderObject> extends PropertyAnimatorFactory<T, Vector2>{
    protected interpolate(amount: number, from: Vector2, to: Vector2, interpolation: Interpolation): Vector2 {
        switch (interpolation) {
        case Interpolation.Linear:
            return new Vector2(Math.lerp(amount, from.x, to.x), Math.lerp(amount, from.y, to.y));
        default:
            throw "Not supported";
        }
    }
}

class NumberAnimator<T extends RenderObject> extends PropertyAnimatorFactory<T, number>{
    protected interpolate(amount: number, from: number, to: number, interpolation: Interpolation): number {
        switch (interpolation) {
        case Interpolation.Linear:
            return Math.lerp(amount, from, to);
        default:
            throw "Not supported";
        }
    }
}