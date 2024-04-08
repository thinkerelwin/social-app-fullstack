// used to display error message correctly when using ESM loader on node v20
import { setUncaughtExceptionCaptureCallback } from "node:process";
// eslint-disable-next-line no-undef
setUncaughtExceptionCaptureCallback(console.log);
