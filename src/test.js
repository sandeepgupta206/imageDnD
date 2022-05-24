import { result, zip } from "lodash";
import { IDBPDatabase, openDB } from 'idb';
import { ImageData, NewImageData, ImageDatav2, LabelName } from "../../store/labels/types";
import { FileUtil } from "../../utils/FileUtil";
import { ImageDataUtil } from "../../utils/ImageDataUtil";
import { string } from "@tensorflow/tfjs-core";
import { buffer, json } from "stream/consumers";
import { Console } from "console";
export type ImageMap = { [s: string]: HTMLImageElement; };
export type ImageDataMap = { [s: string]: ImageDatav2; };
export class IndexedDb {
    private database: string;
    private db: any;
    constructor(database: string, tableName: string) {
        console.log("IndexedDB constructor called for "+ database);
        this.database = database;
        //this.createObjectStore(tableName);
        console.log("Object Store is created");
    }
    public async createObjectStore(tableName: string) {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    if (db.objectStoreNames.contains(tableName)) {
                        console.log(" Table Name already exists:");
                    } else {
                        console.log(" Table Name is getting created:");
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                    }
                }
            }); return true;
        } catch (error) {
            return false;
        }
    }
    public async getValue(tableName: string, id: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }
    public async getAllValue(tableName: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        console.log('Get All Data', JSON.stringify(result));
        return result;
    }
    public async putValue(tableName: string, value: object) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }
    public async putBulkValue(tableName: string, values: object[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }
    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }
}
export class indDB{
    public database: string;
    public db: any;
    static db: any;
    constructor(database: string, tableName: string) {
        console.log("IndexedDB constructor called for "+ database);
        this.database = database;
        //this.createObjectStore(tableName);
        console.log("Object Store is created");
    }
    public async createObjectStore(tableName: string) {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    if (db.objectStoreNames.contains(tableName)) {
                        console.log(" Table Name already exists:");
                    } else {
                        console.log(" Table Name is getting created:");
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                    }
                }
            }); return true;
        } catch (error) {
            return false;
        }
    }
    public static async  deleteValue(tableName: string, id: number){
        console.log(this.db)
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }
}
export class ImageRepository {
    private static repository: ImageMap = {};
    private static newImageDataRepository: ImageDataMap = {};
    private static indexDB: IndexedDb;//new IndexedDb("ImageDatabase", "ImageTable");
    private static savedImageData: ImageData[] = new Array();
    private static nFile: File;
    private static isTableEmpty = true;
    public static isTableHasData(): boolean {
        return !ImageRepository.isTableEmpty;
    }
    public static setIndexDB(indexedDB: IndexedDb) {
        ImageRepository.indexDB = indexedDB;
    }
    public static storeImage(id: string, image: HTMLImageElement) {
        ImageRepository.repository[id] = image;
        console.log("id from storeImage ", id);
        ImageRepository.storeImage2(id, image);
    }
    public static storeImage3(id: string, image: HTMLImageElement, oimageData: ImageData) {
        //ImageRepository.repository[id] = image;
        console.log("id from storeImage3 ", id);
        ImageRepository.storeImage33(id, image, oimageData);
    }
    private static saveToDB(fileDataURL: string, oimageData: ImageData, id: string, image: HTMLImageElement) {
        const imageDatav2: ImageDatav2 = {
            id: id,
            fileData: fileDataURL,
            filename: oimageData.fileData.name,
            fileSrc: image.src,
            fileType: oimageData.fileData.type,
            lastModified: oimageData.fileData.lastModified,
            fileSize: oimageData.fileData.size,
            imgHeight: image.height,
            imgWidth: image.width,
            loadStatus: oimageData.loadStatus,
            labelRects: oimageData.labelRects,
            labelPoints: oimageData.labelPoints,
            labelLines: oimageData.labelLines,
            labelPolygons: oimageData.labelPolygons,
            labelNameIds: oimageData.labelNameIds,
            // SSD
            isVisitedByObjectDetector: oimageData.isVisitedByObjectDetector,
            // POSE NET
            isVisitedByPoseDetector: oimageData.isVisitedByPoseDetector,
            imgloading: image.loading,
            //imgHtmlTag: JSON.stringify(image),
        };
        
        console.log("@@@ Reading the file from the storeImage33 using FileUtil:: ", imageDatav2);
        console.log("!! File Name ", oimageData.fileData.name);
        console.log("!! File Type ", oimageData.fileData.type);
        console.log("!! last Modified ", oimageData.fileData.lastModified);
        console.log("!! size ", oimageData.fileData.size);
        console.log("!! JSON form of the original object: ", JSON.stringify(oimageData));
        
        ImageRepository.indexDB.putValue("ImageTable", imageDatav2);
        ImageRepository.newImageDataRepository[id] = imageDatav2; // 22/04/22 added post merge to resolve updating lable on image at first time crashing system issue
        ImageRepository.isTableEmpty = false;
    }
    public static storeImage33(id: string, image: HTMLImageElement, oimageData: ImageData) {
        console.log("Image object:storeImage3 ", oimageData);
        console.log("!!!@@@ HTML Tag when json stringify:: ", JSON.stringify(image));
        //############# conversion logic ########################
        let encodedFileData: string;
        FileUtil.readFileAsByte(oimageData.fileData).then((encodedData: string) =>
            ImageRepository.saveToDB(encodedData, oimageData, id, image)
            //encodedFileData = encodedData
        );
        //#######################################################
    }
    public static storeImage2(id: string, image: HTMLImageElement) {
        // ImageRepository.repository[id] = image;
        console.log("Image object:storeImage2 ", image);
        const imageData: NewImageData = {
            id: id,
            filename: image.src,
            loadStatus: false,
            imgHeight: image.height,
            imgWidth: image.width,
            loading: image.loading
        };
        ImageRepository.indexDB.putValue("ImageTable", imageData);
    }
    public static storeImages2(ids: string[], images: HTMLImageElement[]) {
        zip(ids, images).forEach((pair: [string, HTMLImageElement]) => {
            console.log(pair);
            ImageRepository.storeImage2(...pair);
        })
    }
    public static storeImages(ids: string[], images: HTMLImageElement[]) {
        zip(ids, images).forEach((pair: [string, HTMLImageElement]) => {
            ImageRepository.storeImage2(...pair);
        })
    }
    public static getById(uuid: string): HTMLImageElement {
        console.log("Image from the ImageRepository:: ", ImageRepository.repository[uuid]);
        console.log("All values from the repository map:: ", ImageRepository.repository);
        return ImageRepository.repository[uuid];
    }
    public static getById2(uuid: string): File {
        /*const runAsyncFunctions = async () => {
    
        let result = await ImageRepository.indexDB.getValue("ImageTable",uuid);
        
        /*const image = new Image();
        image.src = result.fileSrc;
        image.height = result.imgHeight;
        image.width = result.imgWidth;
        image.loading = result.imgloading;*/
        // const nFile = new File([result.fileData] , result.filename, {lastModified: result.lastModified, type: result.fileType});
        //  console.log("!!!@@ Getting result filetype:: ",result.fileType);
        //  console.log("!!!@@ Getting result file:: ",nFile);
        /*FileUtil.loadImage(nFile)
        .then((ele:HTMLImageElement)=> this.imgElement = ele)
        .catch((error) => this.handleLoadImageError());
        */
        //return image;
        // return nFile;
        //}
        //return runAsyncFunctions();*/
        //return this.imgElement;
        /*const runAsyncFunctions = async():Promise<File> => {
            let result = await ImageRepository.indexDB.getValue("ImageTable",uuid);
            return new File([result.fileData] , result.filename, {lastModified: result.lastModified, type: result.fileType});
        }
        return runAsyncFunctions();*/
        ImageRepository.indexDB.getValue("ImageTable", uuid)
            .then((result: ImageDatav2) => this.nFile = new File([result.fileData], result.filename, { lastModified: result.lastModified, type: result.fileType }));
        console.log("!!!@@ Getting result file:: ", this.nFile);
        return this.nFile;
    }
    public static getHTMLTageById2(uuid: string): Promise<HTMLImageElement> {
        const runAsyncFunctions = async (): Promise<HTMLImageElement> => {
            console.log("!!!@@ Getting result of loading image:: for id:: ", uuid);
            let result = await ImageRepository.indexDB.getValue("ImageTable", uuid);
            console.log("!!!@@ Getting result of loading image:: ", result.imgloading);
            // new Image needs to be created this time with the json from imgHTmlTag
            const image = new Image();
            image.src = 'data:image/jpeg;base64,' + btoa(result.fileData);//Buffer.from(result.fileData,'base64');
            //image.loading = result.imgloading;
            image.height = result.imgHeight;
            image.width = result.imgWidth;
            //image.setAttribute('crossOrigin', 'anonymous');
            return image;
        }
        return runAsyncFunctions();
    }
    public static convertImageDataToHTMLTag(imageData: ImageData): Promise<HTMLImageElement> {
        return FileUtil.loadImage(imageData.fileData);
    }
    /*public static getById2(uuid: string) {
        ImageRepository.indexDB.getValue("ImageTable",uuid);
    
    }*/
    private static convertTableDataToImageData(ele: ImageDatav2): ImageData {
        //'data:image/jpeg;base64,' + btoa
        const nimgData: ImageData = {
            id: ele.id,
            fileData: new File(['data:image/jpeg;base64,' + btoa(ele.fileData)], ele.filename, { lastModified: ele.lastModified, type: ele.fileType }),
            loadStatus: ele.loadStatus,
            labelRects: ele.labelRects,
            labelPoints: ele.labelPoints,
            labelLines: ele.labelLines,
            labelPolygons: ele.labelPolygons,
            labelNameIds: ele.labelNameIds,
            isVisitedByObjectDetector: ele.isVisitedByObjectDetector,
            isVisitedByPoseDetector: ele.isVisitedByPoseDetector
        };
        return nimgData;
    }
    public static getAllSavedImageData(): Promise<ImageData[]> {
        console.log("Getting all saved Images");
        const getAllSavedImageTags = async (): Promise<ImageData[]> => {
            //let result : HTMLImageElement[];
            let imageTags = await ImageRepository.indexDB.getAllValue("ImageTable");
            ImageRepository.isTableEmpty = imageTags.length > 0 ? false : true;
            imageTags.forEach((imageTag) => {
                ImageRepository.newImageDataRepository[imageTag.id] = imageTag;
                ImageRepository.savedImageData.push(ImageRepository.convertTableDataToImageData(imageTag));
                const image = new Image();
                image.src = 'data:image/jpeg;base64,' + btoa(imageTag.fileData);//Buffer.from(result.fileData,'base64');
                //image.loading = result.imgloading;
                image.height = imageTag.imgHeight;
                image.width = imageTag.imgWidth;
                ImageRepository.repository[imageTag.id] = image;
            }
            );
            console.log("All result together: ", result);
            console.log("~~~@@ ImageRepository savedImagedata getAllSaved length: ", ImageRepository.savedImageData);
            return ImageRepository.savedImageData;
        }
        return getAllSavedImageTags();
    }
    public static updateNewImageDataById(imageData: ImageData) {
        let previousNewImageData = ImageRepository.newImageDataRepository[imageData.id];
        if (previousNewImageData){
        const updateNewImageData: ImageDatav2 = {
            id: imageData.id,
            fileData: previousNewImageData.fileData,
            filename: previousNewImageData.filename,
            fileSrc: previousNewImageData.fileSrc,
            fileType: previousNewImageData.fileType,
            lastModified: previousNewImageData.lastModified,
            fileSize: previousNewImageData.fileSize,
            imgHeight: previousNewImageData.imgHeight,
            imgWidth: previousNewImageData.imgWidth,
            loadStatus: imageData.loadStatus,
            labelRects: imageData.labelRects,
            labelPoints: imageData.labelPoints,
            labelLines: imageData.labelLines,
            labelPolygons: imageData.labelPolygons,
            labelNameIds: imageData.labelNameIds,
            // SSD
            isVisitedByObjectDetector: imageData.isVisitedByObjectDetector,
            // POSE NET
            isVisitedByPoseDetector: imageData.isVisitedByPoseDetector,
            imgloading: previousNewImageData.imgloading,
            //imgHtmlTag: JSON.stringify(image),
        };
        ImageRepository.newImageDataRepository[imageData.id] = updateNewImageData;
        console.log("Updating the new ImageDatav2 in the table with id: ", imageData.id);
        ImageRepository.indexDB.putValue("ImageTable", updateNewImageData);
    } else {
        console.log("#### No image exists for id ", imageData.id);
    }
    }
    //}
    /*private creteHTMLFromImageData(fileData:any) {
    
    }*/
    /*
    public static loadAllImageDataToMap() {
        console.log("~~~@@ ImageRepository savedImagedata length: ",ImageRepository.savedImageData);
        if(ImageRepository.savedImageData.length > 1) {
            ImageRepository.savedImageData.forEach((imageData)=>{
            FileUtil.loadImage(imageData.fileData)
            .then((imagHTML: HTMLImageElement)=> ImageRepository.repository[imageData.id]=imagHTML)
            .catch((error) =>{});
            }
            )
        }
    }*/
}
export class LableRepository {
    private static isTableEmpty = true;
    private static indexDB: IndexedDb;
    private static savedLableNames: LabelName[] = new Array();
    public static isTableHasData(): boolean {
        return !LableRepository.isTableEmpty;
    }
    public static setIndexDB(indexedDB: IndexedDb) {
        LableRepository.indexDB = indexedDB;
    }
    public static storeLableNames(lableNames: LabelName[]) {
        if (lableNames.length > 0) {
            /* lableNames.forEach((lablename: LabelName)=>
             {
                 LableRepository.indexDB.putValue("LableNameTable", lablename); 
             }
             );*/
            LableRepository.isTableEmpty = false;
            LableRepository.indexDB.putBulkValue("LableNameTable", lableNames);
        }
    }
    public static restoreAllLableNames(): Promise<LabelName[]> {
        const runAsyncFunctions = async (): Promise<LabelName[]> => {
            LableRepository.savedLableNames = await LableRepository.indexDB.getAllValue("LableNameTable");
            return LableRepository.savedLableNames.length > 0 ? LableRepository.savedLableNames : new Array();
        }
        return runAsyncFunctions();
    }
    public static getAllLableNames(): LabelName[] {
        return LableRepository.savedLableNames;
    }
}