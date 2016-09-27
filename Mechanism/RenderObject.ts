﻿/// <reference path="Animations/AnimationCollection.ts"/>
/// <reference path="NotImplementedError.ts"/>
class RenderObject {
    children: RenderObject[] = [];
    parent?: RenderObject;
    animations = new AnimationCollection();
    tasks = new TaskList();
    private currentAnimation: Animation;

    addChild(container: RenderObject): void {
        this.children.push(container);
        container.parent = this;
    }

    removeChild(container: RenderObject): boolean {
        const index = this.children.indexOf(container);
        if (index === -1) return false;
        this.children.splice(index, 1);
        container.parent = undefined;
        return true;
    }

    render(renderer: Renderer) {
        for (let child of this.children) {
            renderer.render(child);
        }
    }

    beforeRender(renderer: Renderer) { }

    afterRender(renderer: Renderer) { }

    update(delta: number) {
        if (this.currentAnimation) {
            const goto = this.currentAnimation.advance(1, this);
            if (goto) {
                if (goto.animation)
                    this.runAnimation(goto.animation, goto.frame);
                else
                    this.currentAnimation.run(goto.frame);
            }
        }
        this.tasks.update(delta);
        for (let child of this.children) {
            child.update(delta);
        }
    }

    runAnimation(name: string, frame: number = 0) {
        this.currentAnimation = this.animations.get(name);
        this.currentAnimation.run(frame);
    }

    runChildAnimation(name: string) {
        throw new NotImplementedError();
    }
}