const QUEUE = require('@supercharge/queue-datastructure')

let FS = require("fs");

const QueueFilename = "./queue.json";

class QueueWrapper{
    constructor(Phone){
        this.phone = Phone;
        this.queue = this.getContactRequestQueue();
        this.log("constructor")
    }
    log(msg){
        console.log(`[${msg}] phone : ${this.phone}`);
        return "Done logging"
    }
    addContactRequestQueue(ContactRequest)
    {
        this.queue.enqueue(ContactRequest);
        this.saveQueue();
    }

    getContactRequestQueue()
    {
        let ContactRequestQueue = new QUEUE();
        console.log("Getting ContactRequestQueue from file");

        // Open existing file and load its contents into a local variable
        try{
        let dataBuffer = FS.readFileSync(QueueFilename)
            let localQueue = JSON.parse(dataBuffer);
            localQueue.queue.forEach(element => {
                ContactRequestQueue.enqueue(element);
            });
        }
        catch(err)
        {
            console.log(`error : ${err.msg}`)
        }
        return ContactRequestQueue;
    }

    dequeueContactRequest(){
        let frontItem = this.queue.dequeue();
        this.saveQueue();
        return frontItem;
    }

    saveQueue(){
        FS.writeFileSync(QueueFilename, JSON.stringify(this.queue), function(err)
        {
            if (err) {
                return console.error(err);
            }
            console.log("Saved queue to JSON file")
        });
    }
}
module.exports = QueueWrapper;