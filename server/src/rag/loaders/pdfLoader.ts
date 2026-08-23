import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv" 

dotenv.config();

export async function loadDocument(filePath:string){
     const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    });

    const loader = new PDFLoader(filePath,{splitPages:false});
    const doc = await loader.load();
    const fullText:string = doc[0]?.pageContent as string;
    const texts = await textSplitter.splitText(fullText);

    const documents = texts.map((chunk)=>{
        return{
            pageContent:chunk,
            metadata:doc[0]?.metadata ?? {} //imp in ts
        }
    })

    console.log("pdf is loaded : ",documents[0]?.metadata);
    return documents;
}