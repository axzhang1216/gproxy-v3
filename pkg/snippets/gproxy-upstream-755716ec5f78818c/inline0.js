
class GproxySocket {
  constructor(socket) {
    this.socket = socket;
    this.queue = [];
    this.pending = null;
    this.closed = false;
    this.sequence = Promise.resolve();
    if ("binaryType" in socket) socket.binaryType = "arraybuffer";

    socket.addEventListener("message", (event) => {
      this.sequence = this.sequence.then(async () => {
        if (typeof event.data === "string") {
          this.push(["text", event.data]);
        } else if (event.data instanceof ArrayBuffer) {
          this.push(["binary", new Uint8Array(event.data)]);
        } else if (ArrayBuffer.isView(event.data)) {
          this.push(["binary", new Uint8Array(
            event.data.buffer, event.data.byteOffset, event.data.byteLength
          )]);
        } else if (typeof event.data?.arrayBuffer === "function") {
          this.push(["binary", new Uint8Array(await event.data.arrayBuffer())]);
        } else {
          this.push(["error", null]);
        }
      });
    });
    socket.addEventListener("error", () => {
      this.sequence = this.sequence.then(() => this.push(["error", null]));
    });
    socket.addEventListener("close", (event) => {
      this.sequence = this.sequence.then(() => {
        this.closed = true;
        this.push(["close", event.code || null]);
      });
    });
  }

  push(frame) {
    if (this.pending !== null && this.pending.resolve !== null) {
      const resolve = this.pending.resolve;
      this.pending.resolve = null;
      resolve(frame);
    } else {
      this.queue.push(frame);
    }
  }

  recv() {
    if (this.pending !== null) return this.pending.promise;
    let resolve = null;
    let promise;
    if (this.queue.length > 0) {
      promise = Promise.resolve(this.queue.shift());
    } else if (this.closed) {
      promise = Promise.resolve(null);
    } else {
      promise = new Promise((callback) => { resolve = callback; });
    }
    this.pending = { promise, resolve };
    return promise;
  }

  ack() {
    this.pending = null;
  }

  send(kind, value) {
    if (kind === "text" || kind === "binary") {
      this.socket.send(value);
    } else if (value === null) {
      this.socket.close();
    } else {
      this.socket.close(value);
    }
  }
}

export async function gproxyOpenSocket(url, headerEntries) {
  const headers = new Headers();
  for (const pair of headerEntries) headers.append(pair[0], pair[1]);
  headers.set("Upgrade", "websocket");
  const response = await globalThis.fetch(url, { method: "GET", headers });
  if (!response.webSocket) {
    const error = new Error(`websocket upgrade failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  if (typeof response.webSocket.accept === "function") response.webSocket.accept();
  return new GproxySocket(response.webSocket);
}

export function gproxySocketSend(socket, kind, value) {
  socket.send(kind, value);
}

export function gproxySocketRecv(socket) {
  return socket.recv();
}

export function gproxySocketAck(socket) {
  socket.ack();
}
