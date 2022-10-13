// import { Worker as $NodeWorker, type WorkerOptions as $NodeWorkerOptions } from "node:worker_threads";

interface IWorkerOptions extends WorkerOptions {}

const Worker =
	typeof navigator !== "undefined"
		? window.Worker
		: class Worker extends global.require("worker_threads").Worker {
				constructor(src: string | URL, opts: IWorkerOptions & { eval?: boolean } = {}) {
					super(src, opts);
				}

				addEventListener<
					Event extends keyof WorkerEventMap = keyof WorkerEventMap,
					Callback extends (...args: any) => void = (event: WorkerEventMap[Event]) => void,
				>(event: Event, cb: Callback, opts?: AddEventListenerOptions) {
					if (!opts?.once) {
						this.once(event, cb);
					} else {
						this.on(event, cb);
					}
				}

				removeEventListener<
					Event extends keyof WorkerEventMap = keyof WorkerEventMap,
					Callback extends (...args: any) => void = (event: WorkerEventMap[Event]) => void,
				>(event: Event, cb: Callback, opts?: EventListenerOptions | undefined) {
					this.off(event, cb);
				}
		  };

export { Worker };
