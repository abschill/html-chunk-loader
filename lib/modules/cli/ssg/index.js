#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssg = void 0;
const tools_1 = require("./tools");
const __1 = require("../../../../");
const config_1 = require("../../core/config");
function ssg() {
    const static_config = (0, config_1.createSSGConfig)();
    (0, tools_1.ensureOutPath)(static_config.outPath);
    try {
        const ctx = (0, __1.createLoader)(static_config);
        ctx.ctx.chunks.filter(chunk => chunk.type === 'template').forEach(template => {
            const fileData = {
                toName: (0, tools_1.pathify)(template, static_config.outPath),
                toWrite: ctx.template(template.name)
            };
            (0, tools_1.__write)(fileData);
            return;
        });
    }
    catch (e) {
        console.warn(e);
    }
}
exports.ssg = ssg;
ssg();
//# sourceMappingURL=index.js.map