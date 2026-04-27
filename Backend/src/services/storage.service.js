const { ImageKit, toFile }= require("@imagekit/nodejs")


const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})
async function uploadFile(file){
    const uploadableFile = await toFile(
        file.buffer,
        file.originalname || "music_"+Date.now(),
        { type: file.mimetype }
    );

    const result=await ImageKitClient.files.upload({
        file: uploadableFile,
        fileName:file.originalname || "music_"+Date.now(),
        folder:"myfirst/musicapp"

    })
    return result;
}
 module.exports={uploadFile}
