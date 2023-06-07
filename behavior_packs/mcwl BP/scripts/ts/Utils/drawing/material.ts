import * as Minecraft from "mojang-minecraft";
import { Vec3 } from "../data/vec3.js";
import { RADIAN } from "../constants/MathConstants.js";
import { MinecraftBlockTypes, world, BlockLocation, Dimension, BlockPermutation } from "mojang-minecraft";
import { printStream } from "../../Main.js";
import { blocksintCmd } from "../../Command/Commands/blocksintCommand.js";
export class Material {
    namespace: string;
    vertexShader: VertexShader;
    fragmentShader: FragmentShader;
    constructor(
        namespace: string,
        vertexShader: VertexShader,
        fragmentShader: FragmentShader
    ) {
        this.namespace = namespace;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }
    apply(vertexArgs: Map<string, any>, fragmentArgs: Map<string, any>): void {
        let blockLoc = this.vertexShader.execute(vertexArgs)
        fragmentArgs.set("vertices", blockLoc.vertices);
        let blockPerm = this.fragmentShader.execute(fragmentArgs);
        for (let i = 0; i < blockLoc.vertices.length; i++) {
            (fragmentArgs.get("dimension") as Dimension).getBlock(blockLoc.vertices[i]).setPermutation(blockPerm.fragments[i]);
        }
    }
    toString() {
        return this.namespace;
    }
}
export class VertexReturn {
    vertices: BlockLocation[]
    args: Map<string, any>
    constructor(vertices: BlockLocation[],
        args: Map<string, any>) {
        this.vertices = vertices
        this.args = args
    }
}
export class FragmentReturn {
    fragments: BlockPermutation[]
    args: Map<string, any>
    constructor(fragments: BlockPermutation[],
        args: Map<string, any>) {
        this.fragments = fragments
        this.args = args
    }
}
export class Shader {
    namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;
    }
    execute(args: Map<string, any>): any {
        return;
    }
}
export class VertexShader extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        return;
    }
}
export class FragmentShader extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): FragmentReturn {
        return;
    }
}
export class ScatterCellVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let density: number = args.get("density")
        let start: Vec3 = args.get("start")
        let end: Vec3 = args.get("end")
        let anchorToFloor: boolean = args.get("anchorToFloor")
        return
    }
}
export class GridCellVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let ret: BlockLocation[] = []
        let size: number = args.get("size")
        let width: number = args.get("width")
        let height: number = args.get("height")
        let start: Vec3 = args.get("start")
        let orientation: ("xz" | "xy" | "yz") = args.get("orientation")
        switch (orientation) {
            case "xy":
                for (let i = 0; i < width * size; i += size) {
                    for (let j = 0; i < height * size; i += size) {
                        let mvec = start.offset(i, j, 0)
                        ret.push(new Minecraft.BlockLocation(mvec.x, mvec.y, mvec.z))
                    }
                }
                break
            case "xz":
                for (let i = 0; i < width * size; i += size) {
                    for (let j = 0; i < height * size; i += size) {
                        let mvec = start.offset(i, 0, j)
                        ret.push(new Minecraft.BlockLocation(mvec.x, mvec.y, mvec.z))
                    }
                }
                break
            case "yz":
                for (let i = 0; i < width * size; i += size) {
                    for (let j = 0; i < height * size; i += size) {
                        let mvec = start.offset(0, i, j)
                        ret.push(new Minecraft.BlockLocation(mvec.x, mvec.y, mvec.z))
                    }
                }
                break
        }
        return new VertexReturn(ret, new Map<string, any>())
    }
}
export class OpaqueStructureFragment extends FragmentShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): FragmentReturn {
        let ret: BlockPermutation[] = []
        let vertex: BlockLocation[] = args.get("vertices")
        let start: Vec3 = args.get("start")
        let end: Vec3 = args.get("end")
        let width: number = args.get("width")
        let height: number = args.get("height")
        for (let i in vertex) {
            
        }
        return
    }
}
export class GridCellFragment extends FragmentShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): FragmentReturn {
        let ret: BlockPermutation[] = []
        let vertex: BlockLocation[] = args.get("vertices")
        let block: string[] = args.get("grid_data")

        return
    }
}
export class TreeCellVertex extends VertexShader {

}
export class PointVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("position");
        return new VertexReturn([new BlockLocation(pt1.x, pt1.y, pt1.z)], new Map<string, any>());
    }
}
export class CuboidVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("start");
        let pt2: Vec3 = args.get("end");
        let ret: BlockLocation[] = [];
        for (let x = pt1.x; x <= pt2.x; x++) {
            for (let y = pt1.y; y <= pt2.y; y++) {
                for (let z = pt1.z; z <= pt2.z; z++) {
                    ret.push(new BlockLocation(x, y, z));
                }
            }
        }
        return new VertexReturn(ret, new Map<string, any>())
    }
}
export class LineVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("pt1");
        let pt2: Vec3 = args.get("pt2");
        let x, y, z;
        let ret: BlockLocation[] = [];
        let pt3 = pt2.clone().subtract(pt1);
        if (
            Math.max(Math.abs(pt3.x), Math.abs(pt3.y), Math.abs(pt3.z)) ==
            Math.abs(pt3.x)
        ) {
            for (
                x = pt1.x;
                pt1.x < pt2.x ? x <= pt2.x : x >= pt2.x;
                pt1.x < pt2.x ? x++ : x--
            ) {
                y = Math.round(((x - pt1.x) / pt3.x) * pt3.y + pt1.y);
                z = Math.round(((x - pt1.x) / pt3.x) * pt3.z + pt1.z);
                ret.push(new BlockLocation(x, y, z));
            }
        } else if (
            Math.max(Math.abs(pt3.x), Math.abs(pt3.y), Math.abs(pt3.z)) ==
            Math.abs(pt3.y)
        ) {
            for (
                y = pt1.y;
                pt1.y < pt2.y ? y <= pt2.y : y >= pt2.y;
                pt1.y < pt2.y ? y++ : y--
            ) {
                x = Math.round(((y - pt1.y) / pt3.y) * pt3.x + pt1.x);
                z = Math.round(((y - pt1.y) / pt3.y) * pt3.z + pt1.z);
                ret.push(new BlockLocation(x, y, z));
            }
        } else {
            for (
                z = pt1.z;
                pt1.z < pt2.z ? z <= pt2.z : z >= pt2.z;
                pt1.z < pt2.z ? z++ : z--
            ) {
                y = Math.round(((z - pt1.z) / pt3.z) * pt3.y + pt1.y);
                x = Math.round(((z - pt1.z) / pt3.z) * pt3.x + pt1.x);
                ret.push(new BlockLocation(x, y, z));
            }
        }
        return new VertexReturn(ret, new Map<string, any>());
    }
}
export class FCircleVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("pt1");
        let bpt1: BlockLocation = new BlockLocation(pt1.x, pt1.y, pt1.z)
        let radius: number = args.get("radius");
        let ret: BlockLocation[] = [];
        const step = 360 / (Math.PI * radius * 64);
        for (let i = 0; i < Math.ceil(Math.PI * radius * 64); i++) {
            bpt1.blocksBetween(new BlockLocation(
                pt1.x + Math.round(radius * Math.sin(step * i * RADIAN)),
                pt1.y,
                pt1.z + Math.round(radius * Math.cos(step * i * RADIAN))
            )).forEach(b => {
                ret.push(b)
            })
        }
        return new VertexReturn(ret, new Map<string, any>());
    }

}
export class HCircleVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("pt1");
        let radius: number = args.get("radius");
        let ret: BlockLocation[] = [];
        const step = 360 / (Math.PI * radius * 64);
        for (let i = 0; i < Math.ceil(Math.PI * radius * 64); i++) {
            ret.push(
                new BlockLocation(
                    pt1.x + Math.round(radius * Math.sin(step * i * RADIAN)),
                    pt1.y,
                    pt1.z + Math.round(radius * Math.cos(step * i * RADIAN))
                )
            );
        }
        return new VertexReturn(ret, new Map<string, any>());
    }
}

export class HSphereVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): VertexReturn {
        let pt1: Vec3 = args.get("pt1");
        let radius: number = args.get("radius");
        let precision: number = args.get("precision");
        let ret: BlockLocation[] = [];
        const step = 360 / (Math.PI * radius * precision);
        for (let i = 0; i <= Math.ceil((Math.PI * radius * precision) / 4); i++) {
            for (let j = 0; j <= Math.ceil((Math.PI * radius * precision) / 4); j++) {
                let x = Math.round(
                    radius * Math.cos(step * i * RADIAN) * Math.sin(step * j * RADIAN)
                );
                let y = Math.round(
                    radius * Math.sin(step * i * RADIAN) * Math.sin(step * j * RADIAN)
                );
                let z = Math.round(radius * Math.cos(step * j * RADIAN));
                ret.push(new BlockLocation(pt1.x + x, pt1.y + y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y + y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y - y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y + y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y - y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y - y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y + y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y - y, pt1.z - z));
            }
        }
        return new VertexReturn(ret, new Map<string, any>());
    }
}

export class BaseFragment extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): FragmentReturn {
        let ret: BlockPermutation[] = [];
        let vertex: BlockLocation[] = args.get("vertices");
        let block: string = args.get("block");
        for (let i of vertex) {
            let blockData: Minecraft.BlockPermutation = (
                MinecraftBlockTypes[block as keyof typeof MinecraftBlockTypes] as any
            ).createDefaultBlockPermutation();
            ret.push(blockData);
        }
        return new FragmentReturn(ret, new Map<string, any>());
    }
}
export class UnweightedBlockDistFragment extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): FragmentReturn {
        let ret: Minecraft.BlockPermutation[] = [];
        let vertex: Minecraft.BlockLocation[] = args.get("vertices");
        let block: string[] = args.get("blocks");
        for (let i of vertex) {
            let blockData: Minecraft.BlockPermutation = (
                MinecraftBlockTypes[block[Math.floor(Math.random() * (block.length))] as keyof typeof MinecraftBlockTypes] as any
            ).createDefaultBlockPermutation();
            ret.push(blockData);
        }
        return new FragmentReturn(ret, new Map<string, any>());
    }
}

export let pointMaterial: Material = new Material("point", new PointVertex("point_vertex"), new BaseFragment("point_fragment"));
export let lineMaterial: Material = new Material("line", new LineVertex("line_vertex"), new BaseFragment("line_fragment"))
export let cuboidMaterial: Material = new Material("cuboid", new CuboidVertex("cuboid_vertex"), new BaseFragment("cuboid_fragment"));
export let testMaterial: Material = new Material("cuboid", new CuboidVertex("cuboid_vertex"), new UnweightedBlockDistFragment("cuboid_fragment"));