"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FaceDetectionWithLandmarks_1 = require("../classes/FaceDetectionWithLandmarks");
var dom_1 = require("../dom");
var ComposableTask_1 = require("./ComposableTask");
var ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
var nets_1 = require("./nets");
var DetectFaceLandmarksTaskBase = /** @class */ (function (_super) {
    tslib_1.__extends(DetectFaceLandmarksTaskBase, _super);
    function DetectFaceLandmarksTaskBase(detectFacesTask, input, useTinyLandmarkNet) {
        var _this = _super.call(this) || this;
        _this.detectFacesTask = detectFacesTask;
        _this.input = input;
        _this.useTinyLandmarkNet = useTinyLandmarkNet;
        return _this;
    }
    Object.defineProperty(DetectFaceLandmarksTaskBase.prototype, "landmarkNet", {
        get: function () {
            return this.useTinyLandmarkNet
                ? nets_1.nets.faceLandmark68TinyNet
                : nets_1.nets.faceLandmark68Net;
        },
        enumerable: true,
        configurable: true
    });
    return DetectFaceLandmarksTaskBase;
}(ComposableTask_1.ComposableTask));
exports.DetectFaceLandmarksTaskBase = DetectFaceLandmarksTaskBase;
var DetectAllFaceLandmarksTask = /** @class */ (function (_super) {
    tslib_1.__extends(DetectAllFaceLandmarksTask, _super);
    function DetectAllFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectAllFaceLandmarksTask.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var detections, faceCanvases, faceLandmarksByFace;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.detectFacesTask];
                    case 1:
                        detections = _a.sent();
                        return [4 /*yield*/, dom_1.extractFaces(this.input, detections)];
                    case 2:
                        faceCanvases = _a.sent();
                        return [4 /*yield*/, Promise.all(faceCanvases.map(function (canvas) { return _this.landmarkNet.detectLandmarks(canvas); }))];
                    case 3:
                        faceLandmarksByFace = _a.sent();
                        return [2 /*return*/, detections.map(function (detection, i) {
                                return new FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks(detection, faceLandmarksByFace[i]);
                            })];
                }
            });
        });
    };
    DetectAllFaceLandmarksTask.prototype.withFaceDescriptors = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return DetectAllFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));
exports.DetectAllFaceLandmarksTask = DetectAllFaceLandmarksTask;
var DetectSingleFaceLandmarksTask = /** @class */ (function (_super) {
    tslib_1.__extends(DetectSingleFaceLandmarksTask, _super);
    function DetectSingleFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectSingleFaceLandmarksTask.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var detection, faceCanvas, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.detectFacesTask];
                    case 1:
                        detection = _c.sent();
                        if (!detection) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dom_1.extractFaces(this.input, [detection])];
                    case 2:
                        faceCanvas = (_c.sent())[0];
                        _a = FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks.bind;
                        _b = [void 0, detection];
                        return [4 /*yield*/, this.landmarkNet.detectLandmarks(faceCanvas)];
                    case 3: return [2 /*return*/, new (_a.apply(FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    DetectSingleFaceLandmarksTask.prototype.withFaceDescriptor = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return DetectSingleFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));
exports.DetectSingleFaceLandmarksTask = DetectSingleFaceLandmarksTask;
//# sourceMappingURL=DetectFaceLandmarksTasks.js.map