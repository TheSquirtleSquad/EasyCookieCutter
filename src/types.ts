
export interface camera_pos_t {
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number
}

export interface CookieState_t {
    imageSrc: string,
    imageHeight: number,
    imageWidth: number,
    saveFileName: string,
    thickness: number,
    depth: number,
    tolerance: number,
    cutterBevel: boolean,
    handleRound: boolean,
    size: number,
    camera_pos: camera_pos_t
}


export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
