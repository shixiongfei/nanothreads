type DequeNode<T> = {
	value: T;
	prev?: DequeNode<T> | null;
	next?: DequeNode<T> | null;
};

export class Queue<T = any> {
	front?: DequeNode<T> | null;
	back?: DequeNode<T> | null;
	private _length = 0;
	public get length() {
		return this._length;
	}

	constructor(...initialValues: T[]) {
		initialValues.forEach((initialValue) => {
			this.push(initialValue);
		});
	}

	unshift(value: T) {
		if (!this.front) {
			this.front = this.back = { value };
			return;
		}

		this.front = this.front.next = { value, prev: this.front };
		this._length += 1;
	}

	shift() {
		if (typeof this.front === "undefined" || this.front === null) {
			return;
		}

		const value = this.peekFront();

		if (this.front === this.back) {
			this.front = null;
			this.back = null;
			return value;
		}

		(this.front = this.front!.prev!).next = null;
		this._length -= 1;

		return value;
	}

	private peekFront() {
		return this.front?.value;
	}

	push(value: T) {
		if (typeof this.front === "undefined" || this.front === null) {
			this.front = this.back = { value };
			return;
		}

		this.back = this.back!.prev = { value, next: this.back };
		this._length += 1;
	}

	pop() {
		if (typeof this.back === "undefined" || this.back === null) {
			return;
		}

		const value = this.peekBack();

		if (this.front === this.back) {
			this.front = null;
			this.back = null;
			return value;
		}

		(this.back = this.back.next!).prev = null;
		this._length -= 1;

		return value;
	}

	private peekBack() {
		return this.back?.value;
	}

	clear() {
		while (this.pop() !== null) {}
	}
}
