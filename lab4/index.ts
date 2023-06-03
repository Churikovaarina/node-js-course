import * as os from "node:os";
import * as fs from "node:fs";
import * as https from "node:https";
import * as path from "node:path";
import * as si from 'systeminformation';
import * as promptSync from 'prompt-sync';

const customPrompt = promptSync();

// 1 завдання
const runSequent = async <T, K>
    (arr: T[], callback: (item?: T, index?: number, array?: T[]) => K) =>
    arr.map((...args) => Promise.resolve(callback(...args)));

const main = async () => {
    const array: Array<string> = ["one", "two", "three"];
    const results = await runSequent(array, (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );
    console.log(results);
}

//main()

// 2 завдання
const arrayChangeDelete = <T>(arr: T[], predicate: (item: T) => boolean): T[] => arr
    .reduce((acc, curr, i) =>
        (predicate(curr) ? (acc[1].push(arr.splice(i--, 1)[0]), acc) : acc), [[],[]] as [T[], T[]])[1];

/*
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array);
console.log(deletedElements);

*/

// 3 завдання

// завдання 3

const getHtmlContent = () => {
    const fileName: string = customPrompt(`Type your file name: `);

    fs.readFile(fileName, `utf-8`, (err, data) => {
        const urls = JSON.parse(data) as string[];
        const outputDirName = path.parse(fileName).name + "_pages";

        if (!fs.existsSync(outputDirName))
            fs.mkdirSync(outputDirName);

        urls.forEach((url, index) => {
            const outputFileName = path.join(outputDirName, `page_${index}.html`);

            https
                .get(url, res => {
                    const fileStream = fs.createWriteStream(outputFileName);
                    res.pipe(fileStream);

                    console.log(res.statusCode);

                    fileStream.on("finish", () => {
                        console.log(`Page saved to ${outputFileName}`);
                    });
                })
                .on(`error`, (err) => {
                   console.log(err);
                });
        });

    });
};

// getHtmlContent();

//4 завдання

const frequency: number = 100;

setInterval(async () => {
    const cpuTemperature = (await si.cpuTemperature()).main;
    const mem = await si.mem();
    const graphics = await si.graphics();
    const battery = await si.battery();

    console.log(`
Operating system: ${os.platform}
Architecture: ${os.arch()}
Username: ${os.userInfo().username}
CPU model: ${os.cpus()[0].model}
CPU temperature: ${cpuTemperature} °C
Total Memory ${mem.total}
Free memory: ${mem.free}
Used memory: ${mem.used}
Battery charging: ${battery.isCharging ? "Yes" : "No"}
Battery percent: ${battery.percent}
Battery remaining time: ${battery.timeRemaining}
`);
    graphics.controllers.forEach(controller => console.log(`Graphic controller: ${controller.vendor}`))

}, frequency);

// 5 завдання

type Listener<T> = (args?: T) => void;

class MyEventEmitter<T> {
    private readonly _listeners: Map<string, Listener<T>[]> = new Map();

    registerHandler(name: string, listener: Listener<T>) {
        const listeners = this._listeners.get(name);
        if (!listeners)
            this._listeners.set(name, [listener]);
        else
            listeners.push(listener);
    }

    emitEvent(name: string, args?: T) {
        const listeners = this._listeners.get(name);
        if (listeners)
            listeners.forEach(listener => listener(args));
    }
}

/*
const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено
 */

