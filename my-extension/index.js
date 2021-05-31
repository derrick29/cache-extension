// #!/usr/bin/node
const { register, next } = require('./extensions-api');
const secretCaches = require('./secrets');

const EventType = {
    INVOKE: 'INVOKE',
    SHUTDOWN: 'SHUTDOWN',
};

function handleShutdown(event) {
    console.log('shutdown', { event });
    process.exit(0);
}

function handleInvoke(event) {
    console.log(event)
    console.log('invoke');
}

(async function main() {
    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));

    console.log('hello from extension');
    console.log('extension path: ' + __dirname)

    console.log('register');
    const extensionId = await register();
    try{
        await secretCaches.cacheSecrets();
        await secretCaches.startHttpServer();
    }catch(err){
        console.log("Err: " + err);
    }
    console.log('extensionId', extensionId);

    // execute extensions logic

    while (true) {
        console.log('next');
        const event = await next(extensionId);
        switch (event.eventType) {
            case EventType.SHUTDOWN:
                handleShutdown(event);
                break;
            case EventType.INVOKE:
                handleInvoke(event);
                break;
            default:
                throw new Error('unknown event: ' + event.eventType);
        }
    }
})();
