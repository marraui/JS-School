import { socketManager } from '../models/socket-manager';
import { timer } from 'rxjs';
import { dbConnection } from '../models/dbmanager';
export async function checkChanges() {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    const curDate = new Date();
    const timeTilTomorrow = date.getTime() + 1 - curDate.getTime();
    
    console.log(`Check changes -> Time til change: ${timeTilTomorrow}`);
    const source = timer(timeTilTomorrow, 24 * 60 * 60 * 1000);
    source.subscribe(async () => {
        console.log(`Check changed -> Checking for changes`);
        const curDate = new Date();
        let error;
        curDate.setHours(0, 0, 0, 0);
        const lentInfos = await dbConnection.getLentInfos(null, null, null, curDate.getTime() -1).catch((err) => {
            error = err;
        });
        if (error) throw error;

        lentInfos.forEach((lentInfo) => {
            console.log(`Check changes -> emitting change with book ${lentInfo.book.title}`);
            socketManager.emitMessage(lentInfo.book.id);
        });
        
    }, (err) => {
        console.log(`Check changes -> error checking for changes: ${err.message}`);
    });
}