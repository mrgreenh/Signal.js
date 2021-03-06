class SignalBuffer {
    constructor(size){
        this._maxSize = size;
        this.length = 0;
    }

    push(item){
        var record = {
            value: item
        };
        if(!this.hasOwnProperty("_firstItem"))
            this._firstItem = record;
        else
            this._lastItem.next = record;
        this._lastItem = record;

        this.length ++;

        if(this._maxSize && this.length > this._maxSize)
            return this.shift();
        else return this._firstItem;
    }

    shift(){
        var shiftedElement;
        if(this.hasOwnProperty("_firstItem"))
            shiftedElement = this._firstItem;
            this._firstItem = this._firstItem.next;
            this.length --;
        return shiftedElement;
    }

    getFirstItem(){
        return this._firstItem.value;
    }

    *iterate(){
        var counter = 0;
        var currentItem = this._firstItem;
        for(var i=0; i<this.length; i++){
            yield currentItem.value;
            currentItem = currentItem.next;
        }

        return;
    }   

}

export default SignalBuffer;